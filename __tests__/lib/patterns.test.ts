import { describe, it, expect } from 'vitest';
import {
  allPatterns,
  getPatternById,
  getPatternsByCategory,
  creationalPatterns,
  structuralPatterns,
  behavioralPatterns
} from '@/lib/patterns';

describe('Pattern utilities', () => {
  describe('allPatterns', () => {
    it('should contain all patterns', () => {
      expect(allPatterns.length).toBeGreaterThan(0);
    });

    it('should have patterns with required fields', () => {
      allPatterns.forEach(pattern => {
        expect(pattern).toHaveProperty('id');
        expect(pattern).toHaveProperty('name');
        expect(pattern).toHaveProperty('category');
        expect(pattern).toHaveProperty('description');
        expect(pattern).toHaveProperty('code');
      });
    });

    it('should have unique pattern IDs', () => {
      const ids = allPatterns.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });

  describe('getPatternById', () => {
    it('should return pattern for valid ID', () => {
      const pattern = getPatternById('singleton');
      expect(pattern).toBeDefined();
      expect(pattern?.id).toBe('singleton');
      expect(pattern?.name).toBe('Singleton');
    });

    it('should return undefined for invalid ID', () => {
      const pattern = getPatternById('non-existent');
      expect(pattern).toBeUndefined();
    });

    it('should find all known patterns', () => {
      const knownIds = ['singleton', 'factory-method', 'observer', 'decorator', 'adapter'];
      knownIds.forEach(id => {
        const pattern = getPatternById(id);
        expect(pattern).toBeDefined();
        expect(pattern?.id).toBe(id);
      });
    });
  });

  describe('getPatternsByCategory', () => {
    it('should return creational patterns', () => {
      const patterns = getPatternsByCategory('creational');
      expect(patterns.length).toBeGreaterThan(0);
      patterns.forEach(pattern => {
        expect(pattern.category).toBe('creational');
      });
    });

    it('should return structural patterns', () => {
      const patterns = getPatternsByCategory('structural');
      expect(patterns.length).toBeGreaterThan(0);
      patterns.forEach(pattern => {
        expect(pattern.category).toBe('structural');
      });
    });

    it('should return behavioral patterns', () => {
      const patterns = getPatternsByCategory('behavioral');
      expect(patterns.length).toBeGreaterThan(0);
      patterns.forEach(pattern => {
        expect(pattern.category).toBe('behavioral');
      });
    });

    it('should return empty array for invalid category', () => {
      const patterns = getPatternsByCategory('invalid' as any);
      expect(patterns).toEqual([]);
    });
  });

  describe('Pattern categories', () => {
    it('should have creational patterns', () => {
      expect(creationalPatterns.length).toBeGreaterThan(0);
      expect(creationalPatterns[0].category).toBe('creational');
    });

    it('should have structural patterns', () => {
      expect(structuralPatterns.length).toBeGreaterThan(0);
      expect(structuralPatterns[0].category).toBe('structural');
    });

    it('should have behavioral patterns', () => {
      expect(behavioralPatterns.length).toBeGreaterThan(0);
      expect(behavioralPatterns[0].category).toBe('behavioral');
    });

    it('should sum to total patterns', () => {
      const total = creationalPatterns.length + structuralPatterns.length + behavioralPatterns.length;
      expect(total).toBe(allPatterns.length);
    });
  });

  describe('Pattern data integrity', () => {
    it('should have valid related patterns', () => {
      allPatterns.forEach(pattern => {
        pattern.relatedPatterns.forEach(relatedId => {
          const relatedPattern = getPatternById(relatedId);
          expect(relatedPattern).toBeDefined();
        });
      });
    });

    it('should have non-empty code examples', () => {
      allPatterns.forEach(pattern => {
        expect(pattern.code.length).toBeGreaterThan(0);
        expect(pattern.example.code.length).toBeGreaterThan(0);
      });
    });

    it('should have valid use cases', () => {
      allPatterns.forEach(pattern => {
        expect(pattern.useCases.length).toBeGreaterThan(0);
      });
    });
  });
});
