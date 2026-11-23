"use client";

import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  label: string;
  target: number;
  suffix?: string;
  dimLabel?: string;
  delayClass?: string;
}

export default function StatCard({
  label,
  target,
  suffix = "",
  dimLabel,
  delayClass = "",
}: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const duration = 1600;
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * target));
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCount(target);
              }
            };
            requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className={`stat-card reveal in ${delayClass}`} ref={ref}>
      {dimLabel && <span className="dim-label mono">{dimLabel}</span>}
      <div className="stat-value">
        <span className="count">
          {count}
          {suffix && <span className="suffix">{suffix}</span>}
        </span>
      </div>
      <p className="stat-label">{label}</p>
    </div>
  );
}
