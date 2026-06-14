"use client";
import { useState } from "react";
import { LuxLantern } from "./LuxLantern";
import { LightGauge } from "./LightGauge";
import { MemoryLog } from "./MemoryLog";
import type { Message } from "@/lib/types";

export function GameScreen({
  history,
  lightGauge,
  questionCount,
  questionLimit,
  isLoading,
  isMockMode,
  onAsk,
}: {
  history: Message[];
  lightGauge: number;
  questionCount: number;
  questionLimit: number;
  isLoading: boolean;
  isMockMode: boolean;
  onAsk: (question: string) => void;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const remaining = questionLimit - questionCount;

  const submit = () => {
    const q = input.trim();
    if (!q) {
      setError("問いを入力してください");
      return;
    }
    setError(null);
    setInput("");
    onAsk(q);
  };

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-4xl flex-col px-4 py-5">
      <header className="mb-4">
        <div className="flex items-baseline justify-between">
          <h1 className="font-serif text-xl tracking-widest text-candle">
            Lost Light
          </h1>
          <span className="text-xs tracking-widest text-mist">
            残された問い{" "}
            <span className="font-serif text-base text-candle">{remaining}</span>
          </span>
        </div>
        <div className="mt-3">
          <LightGauge value={lightGauge} />
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <section className="flex flex-col items-center justify-center rounded-lg border border-line bg-ink/40 py-8">
          <LuxLantern light={lightGauge} size={170} />
          <p className="mt-4 text-xs tracking-[0.3em] text-cyan-quiet/70">LUX</p>
        </section>

        <section className="flex flex-col rounded-lg border border-line bg-ink/40 p-4 min-h-[16rem] md:max-h-[60vh]">
          <p className="mb-3 text-xs tracking-widest text-mist">記憶の断片</p>
          <MemoryLog history={history} />
        </section>
      </div>

      <footer className="mt-4">
        {error && (
          <p className="mb-2 text-sm text-violet-dusk">{error}</p>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, 200))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
            }}
            placeholder="あなたの問い …"
            rows={2}
            disabled={isLoading}
            className="flex-1 resize-none rounded-md border border-line bg-night/70 px-4 py-3 font-serif text-candle placeholder:text-mist/50 focus:border-cyan-quiet focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={submit}
            disabled={isLoading}
            className="rounded-md bg-teal-deep px-6 py-3 font-serif tracking-wider text-candle border border-cyan-quiet/40 hover:bg-cyan-pale hover:text-night transition-colors disabled:opacity-50 disabled:hover:bg-teal-deep disabled:hover:text-candle sm:self-stretch"
          >
            {isLoading ? "記憶を探しています…" : "問いかける"}
          </button>
        </div>
        {isMockMode && (
          <p className="mt-2 text-right text-[10px] tracking-wider text-mist/40">
            デモ用の記録で進行中
          </p>
        )}
      </footer>
    </div>
  );
}
