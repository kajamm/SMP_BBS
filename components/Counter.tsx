"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({
  target,
  suffix = "",
  duration = 2000,
  useSeparator = true,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  useSeparator?: boolean;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            setTimeout(() => {
              let start = 0;
              const increment = target / (duration / 16);
              const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                  start = target;
                  clearInterval(timer);
                }
                setValue(Math.floor(start));
              }, 16);
            }, 500);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span className="counter" ref={ref}>
      {useSeparator ? value.toLocaleString("id-ID") : value}
      {suffix}
    </span>
  );
}
