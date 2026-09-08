"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The signature element.
 *
 * A single continuous line running the length of the page, drawn with real
 * slack between anchor points rather than as a straight hairline rule — a
 * rope under tension, not a divider. It draws itself in on scroll.
 *
 * Everything else on the page stays quiet so this is the one thing you
 * remember. Respects prefers-reduced-motion (renders fully drawn, no animation).
 */
export function RopeLine({ segments = 6 }: { segments?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height + window.innerHeight;
        const seen = window.innerHeight - rect.top;
        setProgress(Math.min(1, Math.max(0, seen / total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // A catenary-ish path: alternating slack to left and right of centre.
  const height = segments * 200;
  const path = Array.from({ length: segments }, (_, i) => {
    const y0 = i * 200;
    const y1 = y0 + 200;
    const slack = i % 2 === 0 ? 26 : -26;
    return `Q ${20 + slack} ${y0 + 100} 20 ${y1}`;
  }).join(" ");

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-6 top-0 hidden h-full w-10 md:block"
      viewBox={`0 0 40 ${height}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d={`M 20 0 ${path}`}
        stroke="var(--color-rope)"
        strokeWidth="1"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - progress}
        opacity={0.5}
      />
    </svg>
  );
}
