import { allPatterns, getPatternsByCategory } from "@/lib/patterns";
import { PatternCard } from "@/components/pattern/pattern-card";
import { Badge } from "@/components/ui/badge";

export default function PatternsPage() {
  const creationalPatterns = getPatternsByCategory("creational");
  const structuralPatterns = getPatternsByCategory("structural");
  const behavioralPatterns = getPatternsByCategory("behavioral");

  return (
    <div className="container px-4 py-12 mx-auto max-w-7xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Design Patterns</h1>
        <p className="text-lg text-[var(--foreground)]/70 max-w-3xl">
          Explore the Gang of Four design patterns. Each pattern includes detailed
          explanations, interactive code examples, and real-world use cases.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="primary">{creationalPatterns.length} Creational</Badge>
          <Badge variant="secondary">{structuralPatterns.length} Structural</Badge>
          <Badge variant="accent">{behavioralPatterns.length} Behavioral</Badge>
          <Badge variant="outline">{allPatterns.length} Total</Badge>
        </div>
      </div>

      {creationalPatterns.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-[var(--primary)]">Creational Patterns</span>
          </h2>
          <p className="text-[var(--foreground)]/70 mb-6">
            Creational patterns provide various object creation mechanisms, which
            increase flexibility and reuse of existing code.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creationalPatterns.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        </section>
      )}

      {structuralPatterns.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-[var(--secondary)]">Structural Patterns</span>
          </h2>
          <p className="text-[var(--foreground)]/70 mb-6">
            Structural patterns explain how to assemble objects and classes into
            larger structures while keeping these structures flexible and efficient.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {structuralPatterns.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        </section>
      )}

      {behavioralPatterns.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-[var(--accent)]">Behavioral Patterns</span>
          </h2>
          <p className="text-[var(--foreground)]/70 mb-6">
            Behavioral patterns are concerned with algorithms and the assignment of
            responsibilities between objects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {behavioralPatterns.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
