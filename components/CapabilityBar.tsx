"use client";

import { useEffect, useRef, useState } from "react";

interface CapabilityBarProps {
  name: string;
  val: string;
  width: number;
}

export default function CapabilityBar({ name, val, width }: CapabilityBarProps) {
  const [filledWidth, setFilledWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFilledWidth(width);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div className="cap-item reveal in" ref={ref}>
      <div className="cap-top">
        <span className="name">{name}</span>
        <span className="val mono">{val}</span>
      </div>
      <div className="cap-bar">
        <div
          className="cap-fill"
          style={{
            width: `${filledWidth}%`,
            transition: "width 1.2s cubic-bezier(.22,.9,.3,1)",
          }}
        ></div>
      </div>
    </div>
  );
}
