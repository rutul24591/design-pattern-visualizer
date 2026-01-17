import Link from "next/link";
import { Pattern } from "@/types/pattern";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface PatternCardProps {
  pattern: Pattern;
}

export function PatternCard({ pattern }: PatternCardProps) {
  const categoryColors: Record<Pattern["category"], "primary" | "secondary" | "accent"> = {
    creational: "primary",
    structural: "secondary",
    behavioral: "accent",
  };

  return (
    <Link href={`/patterns/${pattern.id}`}>
      <Card className="h-full transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer group">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="group-hover:text-[var(--primary)] transition-colors">
              {pattern.name}
            </CardTitle>
            <Badge variant={categoryColors[pattern.category]}>
              {pattern.category}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {pattern.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-[var(--primary)] font-medium">
            Learn more
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
