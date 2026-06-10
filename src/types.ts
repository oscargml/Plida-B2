/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExerciseItem {
  id: string | number;
  question: string;
  options?: string[];
  correctAnswer: string; // E.g., "A", "B", "C", "D"
  userAnswer?: string;
  explanation?: string;
}

export interface LeggereSection {
  id: string;
  title: string;
  subtitle: string;
  instructions: string;
  text?: string;
  textPart2?: string; // For two-text comparisons
  items: ExerciseItem[];
  type: 'multiple-choice' | 'matrix' | 'gap-fill' | 'paragraph-match';
}

export interface AscoltareSection {
  id: string;
  title: string;
  subtitle: string;
  instructions: string;
  audioDuration: string;
  transcript: string;
  items: ExerciseItem[];
  type: 'listening-match' | 'multiple-choice' | 'gap-match';
}

export interface ScriverePrompt {
  id: string;
  title: string;
  instructions: string;
  minWords: number;
  maxWords: number;
  charts?: any[]; // To render beautiful recharts visualizers for Part 1 survey data
  sourcePromptText: string;
}

export interface ParlarePrompt {
  id: string;
  title: string;
  subtitle: string;
  instructions: string;
  context: string;
  scenarios: string[];
  bullets: string[];
  imageUrl?: string;
}

export interface GrammarDrill {
  id: string;
  category: string;
  sentence: string; // The text with gaps like 'Se io ____ (avere) tempo, sarei venuto.'
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ScoreState {
  ascoltare: { [key: string]: number }; // score per section
  leggere: { [key: string]: number }; // score per section
  scrivere: { [key: string]: any }; // evaluated feedback per prompt
  parlare: { [key: string]: any }; // evaluated speech feedback per speaking task
  drills: { correct: number; total: number };
}

export interface AIPeedback {
  score: number; // 0-30 points
  overallEvaluation: string;
  criteriaScores: {
    ortografiaMorfosintassi: number; // 0-7
    lessico: number; // 0-7
    coerenzaCoesione: number; // 0-7
    efficaciaComunicativa: number; // 0-9
  };
  sentenceCorrections: {
    original: string;
    correction: string;
    explanation: string;
  }[];
  polishedVersion: string;
}

export interface AISpeakingFeedback {
  score: number; // 0-30 points
  overallEvaluation: string;
  correctnessPercentage: number;
  linguisticCritique: string;
  lexicalSuggestions: string[];
  grammaticalFixes: {
    original: string;
    correction: string;
    explanation: string;
  }[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  context: string;
  notes?: string;
  dateAdded: string;
}
