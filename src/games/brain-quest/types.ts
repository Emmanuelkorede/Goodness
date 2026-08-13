export type QuestionCategory = "general-knowledge" | "science" | "mathematics";

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  category: QuestionCategory;
}