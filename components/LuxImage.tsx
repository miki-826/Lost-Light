"use client";
import { useState } from "react";
import { LuxLantern } from "./LuxLantern";

type Props = {
  light: number;
  size?: number;
};

export function LuxImage({ light, size = 200 }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) return <LuxLantern light={light} size={size} />;

  const t = Math.max(0, Math.min(100, light)) / 100;
  const glow = 0.2 + t * 0.8;
  const brightness = 0.65 + t * 0.6;
  const saturate = 0.8 + t * 0.6;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute rounded-full animate-flicker"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          background: `radial-gradient(circle, rgba(103,232,249,${0.32 * glow}) 0%, rgba(246,211,101,${0.16 * glow}) 38%, rgba(5,6,10,0) 70%)`,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/lux-lantern.png"
        alt="LUX"
        onError={() => setFailed(true)}
        className="relative animate-flicker select-none"
        draggable={false}
        style={{
          width: size,
          height: size,
          mixBlendMode: "screen",
          WebkitMaskImage:
            "radial-gradient(ellipse 46% 56% at 50% 50%, #000 55%, rgba(0,0,0,0) 100%)",
          maskImage:
            "radial-gradient(ellipse 46% 56% at 50% 50%, #000 55%, rgba(0,0,0,0) 100%)",
          filter: `brightness(${brightness}) saturate(${saturate}) drop-shadow(0 0 ${8 + t * 26}px rgba(103,232,249,${glow}))`,
        }}
      />
    </div>
  );
}
