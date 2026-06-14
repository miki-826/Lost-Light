"use client";
import { LuxLantern } from "./LuxLantern";
import { Typewriter } from "./Typewriter";
import { ScreenBg } from "./ScreenBg";
import type { FinalResult } from "@/lib/types";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[11px] tracking-widest text-mist">{label}</span>
      <span className="font-serif text-2xl text-candle tabular-nums">{value}</span>
    </div>
  );
}

export function ResultScreen({
  result,
  yourAnswer,
  onRetry,
  onTitle,
}: {
  result: FinalResult;
  yourAnswer: string;
  onRetry: () => void;
  onTitle: () => void;
}) {
  const correct = result.isCorrect;

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-10 text-center animate-dawn">
      <ScreenBg
        image={correct ? "/images/result-success-bg.png" : "/images/result-fail-bg.png"}
        fallback={
          correct
            ? "radial-gradient(circle at 50% 30%, #1a1505 0%, #05060A 70%)"
            : "radial-gradient(circle at 50% 40%, #1A1026 0%, #05060A 72%)"
        }
        overlay={
          correct
            ? "radial-gradient(circle at 50% 28%, rgba(246,211,101,0.16), rgba(5,6,10,0.55) 60%, rgba(5,6,10,0.85) 95%)"
            : "radial-gradient(circle at 50% 40%, rgba(26,16,38,0.45), rgba(5,6,10,0.7) 65%, rgba(5,6,10,0.9) 95%)"
        }
      />
      <LuxLantern light={correct ? 100 : Math.max(20, result.lightRecovery)} size={130} />

      <p
        className="mt-6 font-serif text-sm tracking-[0.4em]"
        style={{ color: correct ? "#FFF4C2" : "#A8B0BD" }}
      >
        {correct ? "LIGHT RESTORED" : "LIGHT LOST"}
      </p>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-serif text-6xl text-cyan-quiet text-glow">
          {result.rank}
        </span>
        <span className="font-serif text-xl text-candle">{result.title}</span>
      </div>

      <div className="mt-8 w-full max-w-md rounded-lg border border-line bg-ink/60 px-6 py-6 backdrop-blur-sm">
        <div className="flex justify-between text-sm">
          <span className="text-mist">失われた光</span>
          <span className="font-serif text-lg text-morning text-glow">
            {result.trueAnswer}
          </span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-mist">あなたの答え</span>
          <span className="font-serif text-candle">{yourAnswer}</span>
        </div>

        <div className="my-5 h-px bg-line" />

        <div className="grid grid-cols-4 gap-2">
          <Stat label="総合" value={result.totalScore} />
          <Stat label="問いの深さ" value={result.questionPower} />
          <Stat label="推理の近さ" value={result.reasoningPower} />
          <Stat label="光の戻り" value={result.lightRecovery} />
        </div>

        <p className="mt-5 font-serif text-sm leading-loose text-mist text-left">
          {result.reason}
        </p>
      </div>

      <div className="mt-6 max-w-md min-h-[3.5rem]">
        <p className="font-serif text-candle leading-loose">
          <Typewriter text={result.aiComment} speed={55} />
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onRetry}
          className="rounded-md bg-teal-deep px-6 py-3 font-serif tracking-wider text-candle border border-cyan-quiet/40 hover:bg-cyan-pale hover:text-night transition-colors"
        >
          もう一度、夜を歩く
        </button>
        <button
          onClick={onTitle}
          className="rounded-md px-6 py-3 font-serif text-mist hover:text-candle transition-colors"
        >
          タイトルへ戻る
        </button>
      </div>
    </div>
  );
}
