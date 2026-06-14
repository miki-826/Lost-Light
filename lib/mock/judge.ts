import { MOCK_ANSWER } from "./answers";

function normalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\s、。．，]/g, "");
}

export function scoreQuestion(question: string): number {
  const q = normalize(question);

  const strong = ["希望", "未来", "明日", "信じ", "前に進", "夢"];
  const medium = ["感情", "心", "記憶", "人", "理由", "朝"];
  const weak = ["光", "暗闇", "世界", "lux"];

  let score = 30;
  if (strong.some((w) => q.includes(w))) score += 45;
  if (medium.some((w) => q.includes(w))) score += 25;
  if (weak.some((w) => q.includes(w))) score += 10;

  return Math.min(score, 100);
}

export function calcLightDelta(score: number): number {
  if (score >= 81) return 20;
  if (score >= 61) return 14;
  if (score >= 31) return 8;
  return 3;
}

export function judgeFinalAnswer(input: string): {
  isCorrect: boolean;
  similarityScore: number;
} {
  const normalized = normalize(input);

  const exact = [MOCK_ANSWER.answer];
  const near = MOCK_ANSWER.near_answers;
  const keywords = ["未来", "明日", "信じる", "期待", "夢"];

  if (exact.some((w) => normalized.includes(normalize(w)))) {
    return { isCorrect: true, similarityScore: 100 };
  }
  if (near.some((w) => normalized.includes(normalize(w)))) {
    return { isCorrect: true, similarityScore: 85 };
  }
  if (keywords.some((w) => normalized.includes(normalize(w)))) {
    return { isCorrect: true, similarityScore: 72 };
  }
  return { isCorrect: false, similarityScore: 35 };
}
