type Props = {
  image: string;
  fallback: string;
  overlay?: string;
  dim?: number;
};

export function ScreenBg({
  image,
  fallback,
  overlay,
  dim = 0.55,
}: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ background: fallback }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center animate-dawn"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            overlay ??
            `radial-gradient(circle at 50% 35%, rgba(5,6,10,${dim * 0.5}), rgba(5,6,10,${Math.min(0.92, dim + 0.3)}) 95%)`,
        }}
      />
    </div>
  );
}
