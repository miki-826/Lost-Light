import type { Rank } from "@/lib/types";

export function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

export function calcTotalScore(
  questionPower: number,
  reasoningPower: number,
  lightRecovery: number
): number {
  return Math.round(
    questionPower * 0.3 + reasoningPower * 0.5 + lightRecovery * 0.2
  );
}

export function rankFor(total: number): { rank: Rank; title: string } {
  if (total >= 90) return { rank: "S", title: "光を導く者" };
  if (total >= 75) return { rank: "A", title: "記憶を照らす者" };
  if (total >= 60) return { rank: "B", title: "闇に問いかける者" };
  if (total >= 40) return { rank: "C", title: "迷える観測者" };
  return { rank: "D", title: "光を見失った者" };
}
