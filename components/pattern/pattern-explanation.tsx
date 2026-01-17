import { Pattern } from "@/types/pattern";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb, Users } from "lucide-react";

interface PatternExplanationProps {
  pattern: Pattern;
}

export function PatternExplanation({ pattern }: PatternExplanationProps) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold mb-3">Intent</h2>
        <p className="text-[var(--foreground)]/80 leading-relaxed">
          {pattern.intent}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Motivation</h2>
        <p className="text-[var(--foreground)]/80 leading-relaxed">
          {pattern.motivation}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Structure</h2>
        <p className="text-[var(--foreground)]/80 leading-relaxed">
          {pattern.structure}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <Users className="h-6 w-6 text-[var(--primary)]" />
          Participants
        </h2>
        <ul className="space-y-2">
          {pattern.participants.map((participant, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-[var(--foreground)]/80"
            >
              <span className="text-[var(--primary)] mt-1">•</span>
              <span>{participant}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Pros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pattern.consequences.pros.map((pro, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-[var(--foreground)]/80"
                >
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <XCircle className="h-5 w-5 text-red-500" />
              Cons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pattern.consequences.cons.map((con, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-[var(--foreground)]/80"
                >
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-[var(--secondary)]" />
          Use Cases
        </h2>
        <div className="flex flex-wrap gap-2">
          {pattern.useCases.map((useCase, index) => (
            <Badge key={index} variant="outline">
              {useCase}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Implementation Tips</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)]/70 mb-2">
              Considerations
            </h3>
            <ul className="space-y-1">
              {pattern.implementation.considerations.map(
                (consideration, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-[var(--foreground)]/80"
                  >
                    <span className="text-[var(--primary)] mt-1">•</span>
                    <span>{consideration}</span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)]/70 mb-2">
              Tips
            </h3>
            <ul className="space-y-1">
              {pattern.implementation.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-[var(--foreground)]/80"
                >
                  <span className="text-[var(--secondary)] mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
