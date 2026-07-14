// src/components/common/ParticleField.tsx
import React, { useEffect, useRef } from "react";
import { COLORS } from "../../constants/theme";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  tw: number;
}

export interface ParticleFieldProps {
  mouse: React.RefObject<{ x: number; y: number }>;
  tint: string;
}

/** Ambient drifting particle field that repels gently around the cursor and
 * tints itself to match the current Trust color band. */
export function ParticleField({ mouse, tint }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = new Array(50).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -0.12 - Math.random() * 0.25,
      vx: (Math.random() - 0.5) * 0.12,
      r: 0.6 + Math.random() * 1.5,
      a: 0.12 + Math.random() * 0.4,
      tw: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const mx = (mouse.current?.x ?? 0.5) * canvas!.width;
      const my = (mouse.current?.y ?? 0.5) * canvas!.height;

      particlesRef.current.forEach((p) => {
        p.tw += 0.02;
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          p.x += (dx / dist) * 0.5;
          p.y += (dy / dist) * 0.5;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = canvas!.height + 10;
          p.x = Math.random() * canvas!.width;
        }
        if (p.x < -10) p.x = canvas!.width + 10;
        if (p.x > canvas!.width + 10) p.x = -10;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = tint || COLORS.cyan;
        ctx!.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx!.fill();
      });
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mouse, tint]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
