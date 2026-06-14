"use client";
import { useEffect, useRef } from "react";
import type { Message } from "@/lib/types";

export function MemoryLog({ history }: { history: Message[] }) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [history]);

  return (
    <div className="memory-scroll flex flex-col gap-4 overflow-y-auto pr-1">
      {history.length === 0 && (
        <p className="text-mist text-sm leading-relaxed font-serif opacity-70">
          まだ、記憶の断片はありません。<br />
          LUX に問いかけてみてください。
        </p>
      )}
      {history.map((m, i) =>
        m.role === "user" ? (
          <div key={i} className="self-end max-w-[85%] animate-rise">
            <p className="text-[11px] tracking-widest text-mist mb-1 text-right">
              あなたの問い
            </p>
            <p className="text-candle leading-relaxed border-r-2 border-cyan-quiet/50 pr-3 text-right">
              {m.content}
            </p>
          </div>
        ) : (
          <div key={i} className="self-start max-w-[90%] animate-rise">
            <p className="text-[11px] tracking-widest text-cyan-quiet/80 mb-1">
              LUX の記憶
            </p>
            <div className="rounded-md bg-ink/70 border border-line px-4 py-3 backdrop-blur-sm">
              <p className="font-serif text-candle leading-loose">{m.content}</p>
            </div>
          </div>
        )
      )}
      <div ref={endRef} />
    </div>
  );
}
