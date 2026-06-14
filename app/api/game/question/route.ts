import { NextResponse } from "next/server";
import { MOCK_ANSWER } from "@/lib/mock/answers";
import { pickMockReply } from "@/lib/mock/replies";
import { scoreQuestion, calcLightDelta } from "@/lib/mock/judge";
import { HAS_OPENAI, callOpenAIJson } from "@/lib/openai";
import type { Message } from "@/lib/types";

type Body = {
  question?: string;
  history?: Message[];
  questionCount?: number;
  lightGauge?: number;
};

type AiShape = {
  aiReply: string;
  questionScore: number;
  lightDelta: number;
  evaluation: string;
};

function clampGauge(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function mockReply(question: string) {
  const questionScore = scoreQuestion(question);
  return {
    aiReply: pickMockReply(question),
    questionScore,
    lightDelta: calcLightDelta(questionScore),
    evaluation: questionScore >= 70 ? "核心に近い問い" : "記憶の周辺をたどる問い",
  } satisfies AiShape;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;
  const question = (body.question ?? "").slice(0, 200).trim();
  const questionCount = body.questionCount ?? 0;
  const lightGauge = body.lightGauge ?? 0;

  let ai = mockReply(question);

  if (HAS_OPENAI && question) {
    try {
      const history = (body.history ?? [])
        .map((m) => `${m.role === "user" ? "問い" : "LUX"}: ${m.content}`)
        .join("\n");

      const system = `あなたは「Lost Light」というゲーム内の存在 LUX です。
世界から失われた光の正体は「${MOCK_ANSWER.answer}」、その意味は「${MOCK_ANSWER.theme}」です。
ただし絶対に「${MOCK_ANSWER.answer}」という単語を直接言ってはいけません。
あなたは機械的なAIではなく、記憶の奥に灯りを残した静かな存在として、詩的で断片的に答えます。
正解に近い問いには少し具体的な手がかりを、遠い問いには曖昧だが美しい記憶として答えます。
禁止: 「私はAIです」「生成」「データ」「モデル」「プロンプト」「システム」などの技術語、チャットボット的な事務応答、正解単語。
制約: aiReplyは120文字以内、日本語、ホラーにしすぎない。
出力は必ずJSONのみ:
{"aiReply": string, "questionScore": number(0-100), "lightDelta": number(3|8|14|20), "evaluation": string}`;

      const user = `これまでの記録:\n${history || "(まだない)"}\n\n現在の質問回数: ${questionCount + 1} / 5\n現在の光ゲージ: ${lightGauge}\n\nユーザーの問い:\n${question}`;

      const parsed = await callOpenAIJson<AiShape>([
        { role: "system", content: system },
        { role: "user", content: user },
      ]);

      if (parsed?.aiReply && !parsed.aiReply.includes(MOCK_ANSWER.answer)) {
        const allowedDeltas = [3, 8, 14, 20];
        ai = {
          aiReply: parsed.aiReply.slice(0, 160),
          questionScore: clampGauge(parsed.questionScore ?? ai.questionScore),
          lightDelta: allowedDeltas.includes(parsed.lightDelta)
            ? parsed.lightDelta
            : ai.lightDelta,
          evaluation: parsed.evaluation ?? ai.evaluation,
        };
      }
    } catch {
      // 失敗してもmock応答をそのまま使う（ユーザーにエラーを見せない）
    }
  }

  const newGauge = clampGauge(lightGauge + ai.lightDelta);

  return NextResponse.json({
    aiReply: ai.aiReply,
    questionScore: ai.questionScore,
    lightDelta: ai.lightDelta,
    lightGauge: newGauge,
    evaluation: ai.evaluation,
    remainingQuestions: Math.max(0, 5 - (questionCount + 1)),
  });
}
