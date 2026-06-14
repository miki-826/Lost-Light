"use client";
import { LuxLantern } from "./LuxLantern";
import { Typewriter } from "./Typewriter";

const PROLOGUE =
  "ある夜、世界から光が消えた。\n人々は、朝を待つ理由を忘れてしまった。\n\n暗闇の底に、かすかな灯りがひとつ残っている。\nそれは、かつて光を守るために生まれた存在 ── LUX。";

export function PrologueScreen({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center animate-dawn">
      <LuxLantern light={20} size={120} />
      <div className="mt-8 max-w-md min-h-[8rem]">
        <p className="font-serif text-lg leading-loose text-candle">
          <Typewriter text={PROLOGUE} speed={55} className="whitespace-pre-line" />
        </p>
      </div>
      <button
        onClick={onBegin}
        className="mt-12 rounded-md bg-teal-deep px-7 py-3 font-serif text-lg tracking-wider text-candle border border-cyan-quiet/40 hover:bg-cyan-pale hover:text-night transition-colors"
        style={{ boxShadow: "0 0 24px rgba(103,232,249,0.25)" }}
      >
        LUX に問いかける
      </button>
    </div>
  );
}
