export type GamePhase =
  | "title"
  | "howto"
  | "prologue"
  | "loading"
  | "playing"
  | "finalAnswer"
  | "result";

export type Role = "user" | "assistant" | "system";

export type Message = {
  role: Role;
  content: string;
};

export type GameAnswer = {
  id: string;
  title: string;
  answer: string;
  theme: string;
  story: string;
  truth: string;
  explanation: string;
  hidden_facts: string[];
  keywords: string[];
  near_answers: string[];
};

export type StartResult = {
  sessionId: string;
  aiName: "LUX";
  openingMessage: string;
  questionLimit: number;
  lightGauge: number;
};

export type QuestionResult = {
  aiReply: string;
  questionScore: number;
  lightDelta: number;
  lightGauge: number;
  evaluation: string;
  remainingQuestions: number;
};

export type Rank = "S" | "A" | "B" | "C" | "D";

export type FinalResult = {
  isCorrect: boolean;
  similarityScore: number;
  trueAnswer: string;
  rank: Rank;
  title: string;
  resultMessage: string;
  aiComment: string;
  reason: string;
  questionPower: number;
  reasoningPower: number;
  lightRecovery: number;
  totalScore: number;
};

export type SavedSession = {
  sessionId: string;
  phase: GamePhase;
  aiName: "LUX";
  answerId: string;
  questionLimit: number;
  questionCount: number;
  lightGauge: number;
  history: Message[];
  questionScores: number[];
  createdAt: string;
};
