import { notFound } from "next/navigation";
import Link from "next/link";
import { allPatterns, getPatternById } from "@/lib/patterns";
import { PatternExplanation } from "@/components/pattern/pattern-explanation";
import { CodePlayground } from "@/components/pattern/code-playground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PatternPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allPatterns.map((pattern) => ({
    slug: pattern.id,
  }));
}

export async function generateMetadata({ params }: PatternPageProps) {
  const { slug } = await params;
  const pattern = getPatternById(slug);

  if (!pattern) {
    return {
      title: "Pattern Not Found",
    };
  }

  return {
    title: `${pattern.name} Pattern | Design Pattern Visualizer`,
    description: pattern.description,
  };
}

export default async function PatternPage({ params }: PatternPageProps) {
  const { slug } = await params;
  const pattern = getPatternById(slug);

  if (!pattern) {
    notFound();
  }

  const categoryColors: Record<typeof pattern.category, "primary" | "secondary" | "accent"> = {
    creational: "primary",
    structural: "secondary",
    behavioral: "accent",
  };

  return (
    <div className="container px-4 py-12 mx-auto max-w-7xl">
      <Link href="/patterns">
        <Button variant="ghost" className="mb-6 -ml-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Patterns
        </Button>
      </Link>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight">
              {pattern.name}
            </h1>
            <Badge variant={categoryColors[pattern.category]} className="text-sm">
              {pattern.category}
            </Badge>
          </div>
          <p className="text-xl text-[var(--foreground)]/70">
            {pattern.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <PatternExplanation pattern={pattern} />
          </div>

          <div className="lg:sticky lg:top-20 h-fit">
            <CodePlayground pattern={pattern} />

            {pattern.relatedPatterns.length > 0 && (
              <div className="mt-8 p-6 border border-[var(--foreground)]/10 rounded-lg bg-[var(--foreground)]/5">
                <h3 className="font-semibold mb-3">Related Patterns</h3>
                <div className="flex flex-wrap gap-2">
                  {pattern.relatedPatterns.map((relatedId) => {
                    const relatedPattern = getPatternById(relatedId);
                    return relatedPattern ? (
                      <Link key={relatedId} href={`/patterns/${relatedId}`}>
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-[var(--primary)] hover:text-white transition-colors"
                        >
                          {relatedPattern.name}
                        </Badge>
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
