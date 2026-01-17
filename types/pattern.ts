export type PatternCategory = "creational" | "structural" | "behavioral";

export interface PatternExample {
  title: string;
  description: string;
  code: string;
}

export interface Pattern {
  id: string;
  name: string;
  category: PatternCategory;
  description: string;
  intent: string;
  motivation: string;
  structure: string;
  participants: string[];
  collaboration: string;
  consequences: {
    pros: string[];
    cons: string[];
  };
  implementation: {
    considerations: string[];
    tips: string[];
  };
  useCases: string[];
  relatedPatterns: string[];
  example: PatternExample;
  code: string;
}
