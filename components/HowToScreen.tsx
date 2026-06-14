"use client";

const HOWTO = `この世界から「光」が消えました。

あなたが話せる相手は、
記憶の奥にかすかな灯りを残した存在、LUX だけです。

問いかけられるのは5回まで。

LUX の答えは、正解そのものではありません。
風景、記憶、感情の断片として返ってきます。

その言葉を手がかりに、
失われた光の正体を推理してください。

良い問いを重ねるほど、
世界には少しずつ光が戻ります。`;

export function HowToScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 animate-dawn">
      <div className="w-full max-w-lg rounded-lg border border-line bg-ink/60 px-7 py-9 backdrop-blur-sm">
        <h2 className="font-serif text-2xl text-cyan-quiet text-glow mb-6 tracking-wider">
          遊び方
        </h2>
        <p className="font-serif text-candle leading-loose whitespace-pre-line">
          {HOWTO}
        </p>
      </div>
      <button
        onClick={onBack}
        className="mt-8 rounded-md px-6 py-3 font-serif text-mist hover:text-candle transition-colors"
      >
        記録を閉じる
      </button>
    </div>
  );
}
