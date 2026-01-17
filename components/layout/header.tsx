import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Code2 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--foreground)]/10 bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg group">
          <Code2 className="h-6 w-6 text-[var(--primary)] transition-transform group-hover:scale-110" />
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            Design Pattern Visualizer
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/patterns"
            className="text-sm font-medium text-[var(--foreground)]/70 transition-colors hover:text-[var(--primary)]"
          >
            Patterns
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
