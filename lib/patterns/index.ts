import { Pattern } from "@/types/pattern";
import { creationalPatterns } from "./creational";
import { structuralPatterns } from "./structural";
import { behavioralPatterns } from "./behavioral";

export const allPatterns: Pattern[] = [
  ...creationalPatterns,
  ...structuralPatterns,
  ...behavioralPatterns,
];

export function getPatternById(id: string): Pattern | undefined {
  return allPatterns.find((pattern) => pattern.id === id);
}

export function getPatternsByCategory(category: Pattern["category"]): Pattern[] {
  return allPatterns.filter((pattern) => pattern.category === category);
}

export { creationalPatterns, structuralPatterns, behavioralPatterns };
