import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="container px-4 py-16 mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)] bg-clip-text text-transparent">
              Design Patterns
            </span>
            <br />
            Made Interactive
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-[var(--foreground)]/70 md:text-xl">
            Explore, learn, and experiment with Gang of Four design patterns
            through live code examples and interactive visualizations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/patterns">
            <Button variant="primary" size="lg" className="gap-2">
              Explore Patterns
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 w-full max-w-4xl">
          <div className="flex flex-col items-center space-y-2 p-6 rounded-lg border border-[var(--foreground)]/10 bg-[var(--foreground)]/5">
            <h3 className="text-xl font-semibold">15+ Patterns</h3>
            <p className="text-sm text-[var(--foreground)]/70 text-center">
              Complete coverage of creational, structural, and behavioral patterns
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-6 rounded-lg border border-[var(--foreground)]/10 bg-[var(--foreground)]/5">
            <h3 className="text-xl font-semibold">Live Code Editor</h3>
            <p className="text-sm text-[var(--foreground)]/70 text-center">
              Edit and run TypeScript code directly in your browser
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-6 rounded-lg border border-[var(--foreground)]/10 bg-[var(--foreground)]/5">
            <h3 className="text-xl font-semibold">Visual Examples</h3>
            <p className="text-sm text-[var(--foreground)]/70 text-center">
              Understand patterns through clear explanations and practical examples
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
