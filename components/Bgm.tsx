"use client";
import { useEffect, useRef, useState } from "react";

export function Bgm({ src = "/audio/bgm.mp3" }: { src?: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => {
      const a = ref.current;
      if (!a) return;
      a.volume = 0.35;
      a.play()
        .then(() => {
          setOn(true);
          setReady(true);
        })
        .catch(() => {});
      window.removeEventListener("pointerdown", start);
    };
    window.addEventListener("pointerdown", start);
    return () => window.removeEventListener("pointerdown", start);
  }, []);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      a.volume = 0.35;
      a.play().then(() => setReady(true)).catch(() => {});
      setOn(true);
    }
  };

  return (
    <>
      <audio ref={ref} src={src} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label="音をきりかえる"
        className="fixed bottom-4 right-4 z-50 h-10 w-10 rounded-full border border-line bg-ink/80 text-cyan-quiet/80 backdrop-blur hover:text-cyan-quiet transition-colors"
      >
        {on && ready ? "♪" : "·"}
      </button>
    </>
  );
}
