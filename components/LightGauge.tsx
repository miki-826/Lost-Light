type Props = {
  value: number;
};

export function LightGauge({ value }: Props) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs tracking-widest text-mist">光の戻り</span>
        <span className="font-serif text-lg text-cyan-quiet text-glow tabular-nums">
          {v}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-ink overflow-hidden border border-line">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${v}%`,
            background:
              "linear-gradient(90deg, #0E7490 0%, #67E8F9 60%, #F6D365 100%)",
            boxShadow: "0 0 12px rgba(103,232,249,0.6)",
          }}
        />
      </div>
    </div>
  );
}
