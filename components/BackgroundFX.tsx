"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
};

export default function BackgroundFX() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) return; // early exit — no animation at all

    let raf = 0;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0.5, y: 0.5 };

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fewer particles for better perf
      const count = Math.round((w * h) / 90000);
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 1.2,
        vx: (-0.12 + Math.random() * 0.24) * 0.4,
        vy: (-0.10 + Math.random() * 0.20) * 0.4,
        a: 0.08 + Math.random() * 0.16,
      }));
    }

    function setCSSVars() {
      root.style.setProperty("--mx", String(mouse.x));
      root.style.setProperty("--my", String(mouse.y));
    }

    // Throttle mouse events with RAF flag
    let mousePending = false;
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
      if (!mousePending) {
        mousePending = true;
        requestAnimationFrame(() => {
          setCSSVars();
          mousePending = false;
        });
      }
    }

    function onTouchMove(e: TouchEvent) {
      const t = e.touches?.[0];
      if (!t) return;
      mouse.x = t.clientX / window.innerWidth;
      mouse.y = t.clientY / window.innerHeight;
      setCSSVars();
    }

    // Throttle resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    function tick() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const driftX = (mouse.x - 0.5) * 0.08;
      const driftY = (mouse.y - 0.5) * 0.06;

      ctx.fillStyle = "rgba(0,0,0,0.30)";
      for (const p of particles) {
        p.x += p.vx + driftX;
        p.y += p.vy + driftY;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    }

    resize();
    setCSSVars();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 aurora" />
      <div className="absolute inset-0 grain opacity-[0.10]" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.25]" />
    </div>
  );
}
