"use client";
import { useState } from "react";
import { LuxImage } from "./LuxImage";
import { ScreenBg } from "./ScreenBg";

export function FinalAnswerScreen({
  lightGauge,
  isLoading,
  onSubmit,
}: {
  lightGauge: number;
  isLoading: boolean;
  onSubmit: (answer: string) => void;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const a = input.trim();
    if (!a) {
      setError("最後の推理を入力してください");
      return;
    }
    setError(null);
    onSubmit(a);
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center animate-dawn">
      <ScreenBg
        image="/images/game-bg.png"
        fallback="radial-gradient(circle at 50% 40%, #0D1320 0%, #05060A 75%)"
        dim={0.68}
      />
      <LuxImage light={lightGauge} size={140} />
      <h2 className="mt-8 font-serif text-2xl tracking-wider text-candle text-glow">
        最後の推理
      </h2>
      <p className="mt-3 font-serif text-mist leading-relaxed max-w-sm">
        この世界から失われた「光」とは、いったい何だったのでしょう。
      </p>

      <div className="mt-8 w-full max-w-sm">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 200))}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          placeholder="失われた光 …"
          disabled={isLoading}
          className="w-full rounded-md border border-line bg-night/70 px-4 py-3 text-center font-serif text-lg text-candle placeholder:text-mist/50 focus:border-cyan-quiet focus:outline-none disabled:opacity-50"
        />
        {error && <p className="mt-2 text-sm text-violet-dusk">{error}</p>}
        <button
          onClick={submit}
          disabled={isLoading}
          className="mt-5 w-full rounded-md bg-teal-deep px-6 py-3 font-serif text-lg tracking-wider text-candle border border-cyan-quiet/40 hover:bg-cyan-pale hover:text-night transition-colors disabled:opacity-50"
          style={{ boxShadow: "0 0 24px rgba(103,232,249,0.25)" }}
        >
          {isLoading ? "灯りを確かめています…" : "光を取り戻す"}
        </button>
      </div>
    </div>
  );
}
