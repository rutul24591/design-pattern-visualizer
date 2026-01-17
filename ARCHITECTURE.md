# Design Pattern Visualizer - Architecture Document

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Next.js 15 App Router                    │
│                      (Server + Client Components)                │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
              ┌─────▼──────┐          ┌──────▼──────┐
              │   Server   │          │   Client    │
              │ Components │          │ Components  │
              │  (Static)  │          │ (Interactive)│
              └─────┬──────┘          └──────┬──────┘
                    │                         │
        ┌───────────┼─────────────┐          │
        │           │             │          │
   ┌────▼────┐ ┌───▼────┐  ┌────▼────┐ ┌───▼─────────┐
   │ Pattern │ │ Layout │  │  Shiki  │ │ CodeMirror  │
   │  Data   │ │Components│ │Highlight│ │   Editor    │
   └─────────┘ └────────┘  └─────────┘ └──────┬──────┘
                                               │
                                        ┌──────▼──────┐
                                        │ Web Worker  │
                                        │  Sandbox    │
                                        └──────┬──────┘
                                               │
                                        ┌──────▼──────┐
                                        │ TypeScript  │
                                        │ Transpiler  │
                                        └─────────────┘
```

## Layer Architecture

### 1. Presentation Layer (React Components)

#### Server Components (Static)
**Purpose:** Pre-render static content for optimal performance

```typescript
// Server Components - No interactivity, rendered on server
app/
├── layout.tsx              // Root layout (Server)
├── page.tsx                // Home page with pattern list (Server)
└── patterns/[slug]/
    └── page.tsx            // Pattern detail page (Server)

components/
├── layout/
│   ├── header.tsx          // Site header (Server)
│   ├── footer.tsx          // Footer (Server)
│   └── sidebar.tsx         // Navigation sidebar (Server)
└── pattern/
    ├── pattern-card.tsx    // Pattern preview card (Server)
    ├── pattern-header.tsx  // Pattern title/metadata (Server)
    └── pattern-explanation.tsx // Description, pros/cons (Server)
```

**Benefits:**
- Zero JavaScript sent to client for static content
- Instant page loads
- SEO-friendly
- Reduced bundle size

#### Client Components (Interactive)
**Purpose:** Handle user interactions and dynamic state

```typescript
// Client Components - Interactive, rendered on client
'use client'

components/
├── ui/
│   └── theme-toggle.tsx    // Theme switcher (Client)
└── pattern/
    └── code-playground.tsx // Interactive playground (Client)
        ├── code-editor.tsx      // CodeMirror wrapper (Client)
        └── code-output.tsx      // Execution results (Client)
```

**When to use Client Components:**
- User interactions (clicks, typing)
- State management (useState, useReducer)
- Effects (useEffect)
- Browser-only APIs
- Event listeners

### 2. Data Layer

#### Pattern Data Structure

```typescript
// Centralized pattern data management
lib/patterns/
├── index.ts               // Re-exports all patterns
├── types.ts               // TypeScript interfaces
├── creational.ts          // Singleton, Factory, Builder, etc.
├── structural.ts          // Adapter, Decorator, Proxy, etc.
└── behavioral.ts          // Observer, Strategy, Command, etc.
```

**Pattern Type Definition:**
```typescript
interface Pattern {
  // Metadata
  id: string                    // URL slug
  name: string                  // Display name
  category: 'creational' | 'structural' | 'behavioral'

  // Content
  description: string           // Brief overview
  intent: string               // Design pattern intent
  whenToUse: string[]          // Use cases
  prosAndCons: {
    pros: string[]
    cons: string[]
  }
  realWorldExamples: string[]  // Real-world usage

  // Code
  code: {
    implementation: string     // Core implementation
    usage: string             // Usage example
    playgroundCode: string    // Interactive demo code
  }

  // Relationships
  relatedPatterns: string[]    // Related pattern IDs
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  popularity: number           // 1-5 for sorting
}
```

**Data Flow:**
```
Pattern Data Files (TS) → getPatternBySlug() → Server Component → HTML
                                              ↓
                                    Client Component (props)
```

### 3. Code Execution Architecture

#### Sandbox Execution Flow

```
┌──────────────┐
│  User Types  │
│  TypeScript  │
│   in Editor  │
└──────┬───────┘
       │
       │ onChange
       ▼
┌──────────────────┐
│  CodeEditor      │
│  Component       │
│  (CodeMirror 6)  │
└──────┬───────────┘
       │
       │ Click "Run"
       ▼
┌──────────────────────┐
│  Code Playground     │
│  - setState(code)    │
│  - executeCode()     │
└──────┬───────────────┘
       │
       │ postMessage
       ▼
┌────────────────────────┐
│  Web Worker Thread     │
│  (Isolated Sandbox)    │
│  ┌──────────────────┐  │
│  │ 1. Transpile TS  │  │
│  │    to JS         │  │
│  │ (ts.transpile)   │  │
│  └────────┬─────────┘  │
│           │            │
│  ┌────────▼─────────┐  │
│  │ 2. Execute JS    │  │
│  │    in Blob       │  │
│  │ - Capture logs   │  │
│  │ - Catch errors   │  │
│  └────────┬─────────┘  │
│           │            │
│  ┌────────▼─────────┐  │
│  │ 3. Return result │  │
│  │    via message   │  │
│  └────────┬─────────┘  │
└───────────┼────────────┘
            │
            │ onMessage
            ▼
┌─────────────────────┐
│  CodeOutput         │
│  Component          │
│  - Display logs     │
│  - Display errors   │
│  - Show exec time   │
└─────────────────────┘
```

#### Security Model

```typescript
// lib/code-execution/worker.ts
// Web Worker (runs in separate thread)

1. No DOM Access        ❌ document, window
2. No Network Access    ❌ fetch, XMLHttpRequest
3. Timeout Protection   ⏱️  5-second max execution
4. Memory Isolation     🔒 Separate heap
5. postMessage Only     📮 Structured cloning

// Communication Protocol
Main Thread  ────postMessage({code})────>  Web Worker
              <───postMessage({result})───
```

**Security Boundaries:**
- **Main Thread:** User interface, DOM manipulation
- **Web Worker:** Code execution, transpilation, sandbox
- **No eval() in main thread:** All execution isolated

### 4. Theme Architecture

#### Theme Provider Setup

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"           // Use class strategy
          defaultTheme="system"       // Respect OS preference
          enableSystem                // Enable system theme detection
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

#### Theme Flow

```
1. User clicks theme toggle
   ↓
2. ThemeProvider updates
   ↓
3. <html> class changes: "dark" or "light"
   ↓
4. Tailwind CSS applies theme styles
   ↓
5. localStorage saves preference
   ↓
6. CodeMirror theme updates
```

**Theme Synchronization:**
```typescript
// All components respond to theme changes
<html class="dark">  ← Single source of truth
  ├── Tailwind (dark:bg-gray-900)
  ├── CodeMirror (oneDarkTheme)
  └── Shiki (theme: 'dark-plus')
```

### 5. Component Architecture

#### Component Hierarchy

```
App (Server Component)
├── ThemeProvider (Client wrapper)
│   └── children (mixed Server/Client)
│
├── Header (Server)
│   ├── Logo (Server)
│   ├── Navigation (Server)
│   └── ThemeToggle (Client) ← Only interactive part
│
├── Sidebar (Server)
│   └── PatternList (Server)
│
└── Main Content
    ├── HomePage (Server)
    │   └── PatternCard[] (Server)
    │
    └── PatternPage (Server)
        ├── PatternHeader (Server)
        ├── PatternExplanation (Server)
        │   ├── Description (Server)
        │   ├── ProsCons (Server)
        │   └── UseCases (Server)
        │
        └── CodePlayground (Client) ← Interactive playground
            ├── Tabs (Client)
            │   ├── Implementation Tab
            │   │   └── CodeBlock (Server) ← Static Shiki
            │   ├── Usage Tab
            │   │   └── CodeBlock (Server) ← Static Shiki
            │   └── Interactive Tab (Client)
            │       ├── CodeEditor (Client)
            │       │   └── CodeMirror 6
            │       └── CodeOutput (Client)
            └── Toolbar (Client)
                ├── Run Button
                ├── Reset Button
                └── Copy Button
```

**Key Principles:**
- **Server by default:** Only make components Client when needed
- **Minimize Client boundaries:** Push Client components down the tree
- **Props drilling:** Pass data from Server → Client via props
- **No useState in Server Components:** State only in Client

### 6. File System Architecture

```
design-pattern-visualizer/
│
├── app/                           # Next.js App Router (Routes)
│   ├── layout.tsx                 # Root layout (Server)
│   ├── page.tsx                   # Home page (Server)
│   ├── globals.css                # Global styles
│   └── patterns/[slug]/
│       └── page.tsx               # Dynamic pattern page (Server)
│
├── components/                    # React Components
│   ├── ui/                        # Generic UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   └── theme-toggle.tsx       # (Client)
│   │
│   ├── layout/                    # Layout components
│   │   ├── header.tsx             # (Server)
│   │   ├── footer.tsx             # (Server)
│   │   └── sidebar.tsx            # (Server)
│   │
│   ├── pattern/                   # Pattern-specific
│   │   ├── pattern-card.tsx       # (Server)
│   │   ├── pattern-header.tsx     # (Server)
│   │   ├── pattern-explanation.tsx # (Server)
│   │   └── code-playground.tsx    # (Client)
│   │
│   └── code/                      # Code-related
│       ├── code-editor.tsx        # (Client)
│       ├── code-block.tsx         # (Server)
│       ├── code-output.tsx        # (Client)
│       └── code-executor.ts       # Worker logic
│
├── lib/                           # Business Logic
│   ├── patterns/                  # Pattern data
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── creational.ts
│   │   ├── structural.ts
│   │   └── behavioral.ts
│   │
│   ├── code-execution/            # Sandbox logic
│   │   ├── worker.ts              # Web Worker
│   │   ├── transpiler.ts          # TS → JS
│   │   └── sandbox.ts             # Execution wrapper
│   │
│   └── utils/                     # Utilities
│       ├── cn.ts                  # Class name merger
│       └── constants.ts
│
├── types/                         # TypeScript types
│   ├── pattern.ts
│   └── code-execution.ts
│
├── providers/                     # Context providers
│   ├── theme-provider.tsx         # (Client)
│   └── pattern-provider.tsx       # (optional)
│
├── public/                        # Static assets
│   ├── icons/
│   └── diagrams/
│
├── tailwind.config.ts             # Tailwind config
├── tsconfig.json                  # TypeScript config
├── next.config.ts                 # Next.js config
└── package.json                   # Dependencies
```

### 7. Data Flow Patterns

#### Server Component Data Flow (Static)

```
Pattern Data (TS files)
    ↓
lib/patterns/creational.ts
    ↓
export const patterns: Pattern[] = [...]
    ↓
getPatternBySlug(slug: string)  ← Utility function
    ↓
app/patterns/[slug]/page.tsx    ← Server Component
    ↓
<PatternExplanation pattern={pattern} />  ← Props
    ↓
Rendered HTML sent to browser
```

#### Client Component Data Flow (Interactive)

```
User types in editor
    ↓
CodeEditor onChange event
    ↓
setState(newCode)                ← Local state
    ↓
User clicks "Run"
    ↓
executeCode(code)                ← Function
    ↓
postMessage to Web Worker        ← IPC
    ↓
Worker transpiles & executes
    ↓
postMessage result back          ← IPC
    ↓
setState(result)                 ← Update UI
    ↓
CodeOutput displays result
```

### 8. Routing Architecture

```
/                                # Home page
├── Pattern list (grid)
├── Search & filter
└── Category tabs

/patterns/[slug]                 # Pattern detail page
├── Pattern header
├── Explanation section
└── Code playground
    ├── Implementation tab (static)
    ├── Usage tab (static)
    └── Interactive demo tab (live editor)

Future routes:
/patterns?category=creational    # Filtered view
/patterns?search=singleton       # Search results
```

**Dynamic Route Generation:**
```typescript
// app/patterns/[slug]/page.tsx
export async function generateStaticParams() {
  const patterns = getAllPatterns()
  return patterns.map(pattern => ({
    slug: pattern.id
  }))
}
```

**Benefits:**
- Static generation at build time (SSG)
- Pre-rendered HTML for each pattern
- Fast page loads
- SEO-friendly

### 9. Performance Architecture

#### Optimization Strategy

```
Build Time:
  ├── Static Site Generation (SSG)
  │   └── Pre-render all pattern pages
  ├── Image Optimization
  │   └── next/image for all images
  └── Font Optimization
      └── next/font for Inter & JetBrains Mono

Runtime:
  ├── Code Splitting
  │   ├── Dynamic import for CodeMirror
  │   └── Lazy load heavy components
  ├── Server Components
  │   └── Zero JS for static content
  ├── Web Worker
  │   └── Offload execution from main thread
  └── Caching
      ├── Browser cache (static assets)
      └── localStorage (theme, editor content)
```

#### Bundle Size Strategy

```
Main Bundle (< 200KB)
  ├── React runtime
  ├── Next.js framework
  ├── Tailwind CSS (purged)
  └── Core UI components

Lazy Loaded (loaded on demand)
  ├── CodeMirror (~150KB)
  ├── TypeScript compiler (~10MB)  ← Loaded only when needed
  └── Shiki (~50KB)
```

### 10. State Management Architecture

#### State Distribution

```
Server State (Static, pre-rendered)
  └── Pattern data
      ├── Pattern metadata
      ├── Descriptions
      ├── Code examples
      └── Relationships

Client State (Interactive, runtime)
  ├── Theme preference (Context)
  ├── Editor content (Component state)
  ├── Execution results (Component state)
  ├── Active tab (Component state)
  └── Search/filter (URL state)
```

**State Management Decision:**
- **No Redux/Zustand needed:** Application state is simple
- **React Context for theme:** Shared across all components
- **Local state for editor:** No need to lift state
- **URL for navigation:** Browser handles history

### 11. Testing Architecture

```
Unit Tests (Vitest)
  ├── lib/patterns/          ← Pattern data utilities
  ├── lib/code-execution/    ← Transpiler, sandbox logic
  └── lib/utils/             ← Helper functions

Integration Tests (React Testing Library)
  ├── Theme toggle           ← Context integration
  ├── Pattern navigation     ← Routing integration
  └── Code playground        ← Editor + Output integration

End-to-End Tests (Playwright)
  ├── User journey: Browse → View → Edit → Run
  ├── Theme switching across pages
  ├── Mobile responsive behavior
  └── Cross-browser compatibility
```

### 12. Deployment Architecture

```
Development
  ├── Local: next dev
  └── Hot Module Replacement (HMR)

Staging
  ├── Vercel preview deployments
  └── Every PR gets preview URL

Production
  ├── Vercel production deployment
  ├── Edge CDN (global)
  ├── Automatic HTTPS
  └── Image optimization
```

**CI/CD Pipeline:**
```
Git Push
  ↓
GitHub Actions
  ├── Lint check (ESLint)
  ├── Type check (TypeScript)
  ├── Unit tests (Vitest)
  ├── Build check (next build)
  ├── E2E tests (Playwright)
  └── Lighthouse CI
  ↓
Vercel Deploy
  ├── Build Next.js app
  ├── Optimize assets
  ├── Deploy to Edge Network
  └── Generate deployment URL
```

## Key Architectural Decisions

### 1. Why Next.js 15 App Router?
- **Server Components:** Zero JS for static content
- **Automatic code splitting:** Better performance
- **Built-in routing:** No need for React Router
- **SEO-friendly:** Server-rendered HTML
- **Image/Font optimization:** Built-in

### 2. Why CodeMirror over Monaco?
- **43% smaller bundle:** Better for web apps
- **Mobile-first design:** Touch-friendly
- **Modular:** Load only what you need
- **Modern API:** Clean React integration

### 3. Why Web Worker for execution?
- **Security:** Isolated from main thread
- **Performance:** Non-blocking execution
- **Control:** Custom timeout/memory limits
- **No server needed:** Runs entirely in browser

### 4. Why Shiki for syntax highlighting?
- **VS Code quality:** Same engine as VS Code
- **SSR support:** Works with Server Components
- **100+ themes:** Excellent theme selection
- **Modern:** Active development, Prism v2 stalled

### 5. Why Tailwind CSS?
- **Utility-first:** Rapid development
- **Dark mode:** Built-in class strategy
- **Tree-shaking:** Small production bundle
- **Customization:** Easy to avoid generic look

## Scalability Considerations

### Horizontal Scaling (More Patterns)
- ✅ Pattern data in separate files by category
- ✅ Each pattern is independent
- ✅ Easy to add new patterns without touching existing code
- ✅ Type-safe with TypeScript interfaces

### Vertical Scaling (More Features)
- ✅ Component-based architecture allows feature additions
- ✅ Server/Client split enables performance optimization
- ✅ Web Worker can be extended for advanced execution
- ✅ Plugin architecture possible for CodeMirror extensions

### Future Enhancements
- Multi-language support (i18n)
- User accounts & saved code snippets
- Pattern visualizations with diagrams
- AI-powered pattern recommendations
- Code generation from patterns
- Real-time collaboration

## Conclusion

This architecture provides:
- ✅ **Performance:** Server Components + code splitting
- ✅ **Security:** Web Worker sandbox isolation
- ✅ **Scalability:** Easy to add patterns and features
- ✅ **Maintainability:** Clear separation of concerns
- ✅ **User Experience:** Fast loads, smooth interactions
- ✅ **Developer Experience:** Type-safe, modern tooling

The architecture follows Next.js 15 best practices and modern React patterns, ensuring a solid foundation for building a production-ready design pattern visualizer.