"use client";
import { LuxLantern } from "./LuxLantern";

export function TitleScreen({
  onStart,
  onHowTo,
}: {
  onStart: () => void;
  onHowTo: () => void;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center animate-dawn">
      <div className="mb-2 animate-rise">
        <LuxLantern light={28} size={150} />
      </div>
      <h1 className="font-serif text-5xl sm:text-6xl tracking-[0.2em] text-candle text-glow">
        Lost Light
      </h1>
      <p className="mt-6 font-serif text-mist text-base sm:text-lg leading-relaxed max-w-md">
        5つの問いで、失われた光を取り戻せ。
      </p>

      <div className="mt-12 flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onStart}
          className="rounded-md bg-teal-deep px-6 py-3 font-serif text-lg tracking-wider text-candle border border-cyan-quiet/40 hover:bg-cyan-pale hover:text-night transition-colors"
          style={{ boxShadow: "0 0 24px rgba(103,232,249,0.25)" }}
        >
          夜を歩きはじめる
        </button>
        <button
          onClick={onHowTo}
          className="rounded-md px-6 py-3 font-serif text-mist hover:text-candle transition-colors"
        >
          遊び方を読む
        </button>
      </div>
    </div>
  );
}
