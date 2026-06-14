"use client";
import { useEffect, useState } from "react";

export function Typewriter({
  text,
  speed = 45,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        if (v < text.length) return v + 1;
        clearInterval(id);
        return v;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className}>
      {text.slice(0, n)}
      {n < text.length && (
        <span className="animate-pulse text-cyan-quiet">▌</span>
      )}
    </span>
  );
}
