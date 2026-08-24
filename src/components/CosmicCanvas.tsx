import React, { useEffect, useRef } from 'react';

export const CosmicCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      createElements();
    };

    window.addEventListener('resize', handleResize);

    interface Star {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      speed: number;
      isGold: boolean;
    }

    let stars: Star[] = [];
    const planets = [
      { xPct: 0.85, yPct: 0.18, r: 32, type: 'sun', pulse: 0 },
      { xPct: 0.12, yPct: 0.32, r: 20, type: 'purple-planet', ring: true },
      { xPct: 0.88, yPct: 0.75, r: 14, type: 'moon', glow: 0 },
      { xPct: 0.15, yPct: 0.82, r: 16, type: 'blackhole', spin: 0 }
    ];

    function createElements() {
      stars = [];
      const count = window.innerWidth < 768 ? 60 : 120;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.4,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          a: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.005,
          isGold: Math.random() > 0.8
        });
      }
    }

    createElements();

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw starry sky
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.a += s.speed;
        const opacity = (Math.sin(s.a) + 1.2) / 2.2;
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.isGold
          ? `rgba(246, 196, 83, ${opacity * 0.8})`
          : `rgba(220, 230, 255, ${opacity * 0.7})`;
        ctx.fill();
      }

      // Draw subtle celestial bodies
      planets.forEach((p) => {
        const px = w * p.xPct;
        const py = h * p.yPct;

        if (p.type === 'sun') {
          p.pulse += 0.015;
          const pSize = p.r + Math.sin(p.pulse) * 2;
          const grad = ctx.createRadialGradient(px, py, 0, px, py, pSize * 2.5);
          grad.addColorStop(0, 'rgba(255, 210, 80, 0.4)');
          grad.addColorStop(0.5, 'rgba(255, 140, 30, 0.15)');
          grad.addColorStop(1, 'rgba(255, 80, 0, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, pSize * 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#fff4cc';
          ctx.beginPath();
          ctx.arc(px, py, pSize * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'purple-planet') {
          const grad = ctx.createRadialGradient(px - 5, py - 5, 2, px, py, p.r);
          grad.addColorStop(0, 'rgba(196, 163, 255, 0.8)');
          grad.addColorStop(1, 'rgba(107, 63, 181, 0.6)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, p.r, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(196, 163, 255, 0.25)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(px, py, p.r * 1.7, p.r * 0.4, -0.3, 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.type === 'moon') {
          p.glow += 0.01;
          const grad = ctx.createRadialGradient(px, py, 0, px, py, p.r * 2);
          grad.addColorStop(0, 'rgba(230, 240, 255, 0.3)');
          grad.addColorStop(1, 'rgba(150, 180, 255, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, p.r * 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(235, 240, 255, 0.85)';
          ctx.beginPath();
          ctx.arc(px, py, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'blackhole') {
          p.spin += 0.015;
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(p.spin);
          ctx.strokeStyle = 'rgba(240, 98, 146, 0.25)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 1.6, p.r * 0.5, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          ctx.fillStyle = '#020307';
          ctx.beginPath();
          ctx.arc(px, py, p.r * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cosmic-canvas"
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #0d1430 0%, #050810 65%, #000205 100%)'
      }}
    />
  );
};
