# Design Pattern Visualizer

An interactive web application for exploring and learning Gang of Four design patterns through live code examples and detailed explanations.

Deployment URL: https://design-pattern-visualizer.pages.dev

![Design Pattern Visualizer](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## Features

- **14 Design Patterns** - Complete coverage of essential Gang of Four patterns

  - 5 Creational Patterns
  - 5 Structural Patterns
  - 4 Behavioral Patterns

- **Interactive Code Editor** - Edit and run TypeScript code directly in your browser

  - Powered by CodeMirror 6
  - Syntax highlighting
  - Real-time code execution
  - Console output capture

- **Comprehensive Documentation** - Each pattern includes:

  - Intent and motivation
  - Structure and participants
  - Pros and cons
  - Implementation tips
  - Real-world use cases
  - Interactive code examples

- **Modern Design** - Clean, professional interface
  - Dark/Light theme toggle
  - Responsive layout
  - Smooth animations
  - Accessible (WCAG 2.1 AA)

## Tech Stack

### Core

- **Next.js 15** - React framework with App Router and Server Components
- **React 19** - UI library
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework

### Code Editor

- **CodeMirror 6** - Modern code editor
- **@codemirror/lang-javascript** - JavaScript/TypeScript language support

### Theme Management

- **next-themes** - Zero-flash dark mode with localStorage persistence

### UI Components

- **Lucide React** - Beautiful icon library
- **clsx** + **tailwind-merge** - Utility class management

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/design-pattern-visualizer.git
cd design-pattern-visualizer
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Testing

### Unit & Component Tests

Run tests with Vitest:

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### End-to-End Tests

Run E2E tests with Playwright:

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### Test Coverage

The project includes:

- **Unit tests** for utility functions
- **Component tests** for UI components
- **Integration tests** for pattern data
- **E2E tests** for user flows

## Pattern Library

### Creational Patterns

- **Singleton** - Ensures a class has only one instance
- **Factory Method** - Defines an interface for creating objects
- **Builder** - Separates object construction from representation
- **Abstract Factory** - Creates families of related objects
- **Prototype** - Creates objects by cloning prototypes

### Structural Patterns

- **Decorator** - Attaches additional responsibilities dynamically
- **Adapter** - Converts one interface to another
- **Composite** - Composes objects into tree structures
- **Facade** - Provides a unified interface to a subsystem
- **Proxy** - Provides a surrogate for another object

### Behavioral Patterns

- **Observer** - Defines one-to-many dependencies between objects
- **Strategy** - Defines a family of interchangeable algorithms
- **Command** - Encapsulates requests as objects
- **State** - Alters behavior when internal state changes

## Project Structure

```
design-pattern-visualizer/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   ├── patterns/          # Pattern pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── pattern/          # Pattern-specific components
│   └── code/             # Code editor components
├── lib/                  # Utility libraries
│   ├── patterns/        # Pattern data and definitions
│   └── utils.ts         # Utility functions
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## Design System

### Color Palette

**Light Mode:**

- Background: Warm gray (#FAFAF9)
- Foreground: Deep charcoal (#18181B)
- Primary: Teal (#0D9488)
- Secondary: Amber (#F59E0B)
- Accent: Purple (#7C3AED)

**Dark Mode:**

- Background: Rich dark (#0F0F12)
- Foreground: Soft white (#F5F5F6)
- Primary: Bright teal (#14B8A6)
- Secondary: Gold (#FCD34D)
- Accent: Vivid purple (#A78BFA)

### Typography

- **Font Family**: Inter (headings and body)
- **Code Font**: JetBrains Mono
- Clear hierarchy with meaningful size scales

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design patterns from "Design Patterns: Elements of Reusable Object-Oriented Software" by the Gang of Four
- Built with modern web technologies and best practices
- Inspired by the need for interactive learning resources

## Security

This application has been security audited. Key security features:

- ✅ **Content Security Policy (CSP)** headers
- ✅ **Code execution sandbox** with timeout
- ✅ **Input sanitization** for console output
- ✅ **Rate limiting** for code execution
- ✅ **Security headers** (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ **No user data collection** or tracking

See [SECURITY.md](SECURITY.md) for the full security review.

## Deployment

The application is configured for deployment to **Cloudflare Pages**.

### Quick Deploy to Cloudflare

1. Push your code to GitHub
2. Connect repository to Cloudflare Pages
3. Configure build settings:
   - Build command: `npm run build`
   - Build directory: `out`
4. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Static Export

The app is configured for static export:

```bash
npm run build  # Creates 'out' directory with static files
```

## Future Enhancements

- [ ] Add more patterns (Template Method, Iterator, Mediator, etc.)
- [ ] Add pattern comparison feature
- [ ] Add pattern search and filtering
- [ ] Add code sharing functionality
- [ ] Add more interactive visualizations
- [ ] Add WebAssembly sandbox for safer code execution
- [ ] Add performance monitoring
- [ ] Add SEO optimizations

## Support

If you find this project helpful, please consider giving it a star on GitHub!
