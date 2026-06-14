import { NextResponse } from "next/server";
import { MOCK_ANSWER } from "@/lib/mock/answers";
import { MOCK_RESULT_COMMENTS } from "@/lib/mock/replies";
import { judgeFinalAnswer } from "@/lib/mock/judge";
import { average, calcTotalScore, rankFor } from "@/lib/scoring";
import { HAS_OPENAI, callOpenAIJson } from "@/lib/openai";
import type { FinalResult, Message } from "@/lib/types";

type Body = {
  finalAnswer?: string;
  history?: Message[];
  questionScores?: number[];
  lightGauge?: number;
};

type AiJudge = {
  isCorrect: boolean;
  similarityScore: number;
  resultMessage: string;
  aiComment: string;
  reason: string;
};

function buildResult(params: {
  isCorrect: boolean;
  similarityScore: number;
  questionPower: number;
  lightRecovery: number;
  resultMessage?: string;
  aiComment?: string;
  reason?: string;
}): FinalResult {
  const reasoningPower = params.similarityScore;
  const totalScore = calcTotalScore(
    params.questionPower,
    reasoningPower,
    params.lightRecovery
  );
  const { rank, title } = rankFor(totalScore);

  const comment = params.isCorrect
    ? MOCK_RESULT_COMMENTS.correct
    : params.similarityScore >= 70
      ? MOCK_RESULT_COMMENTS.near
      : MOCK_RESULT_COMMENTS.wrong;

  return {
    isCorrect: params.isCorrect,
    similarityScore: params.similarityScore,
    trueAnswer: MOCK_ANSWER.answer,
    rank,
    title,
    resultMessage:
      params.resultMessage ??
      (params.isCorrect
        ? "灯りが、世界に戻りはじめた。"
        : "光は、まだ闇の底に沈んでいる。"),
    aiComment: params.aiComment ?? comment,
    reason: params.reason ?? MOCK_ANSWER.explanation,
    questionPower: params.questionPower,
    reasoningPower,
    lightRecovery: params.lightRecovery,
    totalScore,
  };
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;
  const finalAnswer = (body.finalAnswer ?? "").slice(0, 200).trim();
  const questionScores = body.questionScores ?? [];
  const lightGauge = body.lightGauge ?? 0;

  const questionPower = average(questionScores);
  const lightRecovery = Math.max(0, Math.min(100, lightGauge));

  const mockJudge = judgeFinalAnswer(finalAnswer);
  let result = buildResult({
    isCorrect: mockJudge.isCorrect,
    similarityScore: mockJudge.similarityScore,
    questionPower,
    lightRecovery,
  });

  if (HAS_OPENAI && finalAnswer) {
    try {
      const history = (body.history ?? [])
        .map((m) => `${m.role === "user" ? "問い" : "LUX"}: ${m.content}`)
        .join("\n");

      const system = `あなたは「Lost Light」の最終判定者です。
正解は「${MOCK_ANSWER.answer}」、意味は「${MOCK_ANSWER.theme}」です。
完全一致でなくても意味が近ければ正解とし、比喩的に近い回答も評価します。理不尽な不正解にしないでください。
結果コメントは物語的にし、「判定AI」「解析」「モデル」などの技術語は使わないでください。
出力は必ずJSONのみ:
{"isCorrect": boolean, "similarityScore": number(0-100), "resultMessage": string, "aiComment": string, "reason": string}`;

      const user = `ユーザーの最後の推理:\n${finalAnswer}\n\nこれまでの記録:\n${history || "(なし)"}\n\n質問スコア: ${JSON.stringify(questionScores)}\n光ゲージ: ${lightGauge}`;

      const parsed = await callOpenAIJson<AiJudge>([
        { role: "system", content: system },
        { role: "user", content: user },
      ]);

      if (parsed && typeof parsed.isCorrect === "boolean") {
        result = buildResult({
          isCorrect: parsed.isCorrect,
          similarityScore: Math.max(
            0,
            Math.min(100, Math.round(parsed.similarityScore ?? mockJudge.similarityScore))
          ),
          questionPower,
          lightRecovery,
          resultMessage: parsed.resultMessage,
          aiComment: parsed.aiComment,
          reason: parsed.reason,
        });
      }
    } catch {
      // 失敗時はmock判定をそのまま使う
    }
  }

  return NextResponse.json(result);
}
