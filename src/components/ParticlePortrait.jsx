import { useRef, useEffect, useState } from "react";

const readTheme = () =>
  typeof document !== "undefined" &&
  document.documentElement.getAttribute("data-theme") === "f1"
    ? "f1"
    : "default";

const readAccent = () => {
  if (typeof window === "undefined") return "#00ff41";
  const c = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
  return c || "#00ff41";
};

// Hex "#rrggbb" → "r, g, b" for rgba() interpolation
const hexToRgb = (hex) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return "0, 255, 65";
  return `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}`;
};

const ParticlePortrait = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const particlesRef = useRef([]);
  const imageLoadedRef = useRef(false);
  const startTimeRef = useRef(null);
  const [size, setSize] = useState(500);
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width <= 480) setSize(Math.min(240, width - 40));
      else if (width <= 768) setSize(Math.min(300, width - 60));
      else setSize(440);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const W = size;
    const H = size;
    // Hi-DPI: render at device pixels, scale CSS
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const isF1 = theme === "f1";
    const accentRgb = hexToRgb(readAccent());
    let animationId;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = import.meta.env.BASE_URL + "profile.png";

    img.onload = () => {
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      offscreen.width = W;
      offscreen.height = H;

      const scale = 0.82;
      const imgAspect = img.width / img.height;
      let drawHeight = H * scale;
      let drawWidth = drawHeight * imgAspect;
      if (drawWidth > W * scale) {
        drawWidth = W * scale;
        drawHeight = drawWidth / imgAspect;
      }
      const offsetX = (W - drawWidth) / 2;
      const offsetY = (H - drawHeight) / 2;
      offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const pixels = offCtx.getImageData(0, 0, W, H).data;

      const particles = [];
      // Denser grid than before
      const step = size <= 240 ? 4 : size <= 300 ? 4 : 5;
      // Terminal uses a richer character palette for visual texture
      const glyphs = ["0", "1", "0", "1", "·", ":", "+", "/"];

      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const i = (y * W + x) * 4;
          const a = pixels[i + 3];
          if (a <= 120) continue;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const brightness = (r + g + b) / (3 * 255);
          if (brightness < 0.08) continue;

          const scatterR = 120 + Math.random() * 220;
          const scatterA = Math.random() * Math.PI * 2;
          const sx = x + Math.cos(scatterA) * scatterR;
          const sy = y + Math.sin(scatterA) * scatterR;

          // ~20% of particles use accent color for a pop; rest near-white
          const useAccent = Math.random() < 0.22;

          if (isF1) {
            const len = 3 + Math.floor(brightness * (size <= 300 ? 7 : 12));
            particles.push({
              x: sx, y: sy,
              targetX: x, targetY: y,
              vx: 0, vy: 0,
              length: len,
              baseAlpha: 0.55 + brightness * 0.45,
              currentAlpha: 0,
              delay: Math.random() * 0.35,
              phase: Math.random() * Math.PI * 2,
              kind: "line",
              accent: useAccent,
            });
          } else {
            particles.push({
              x: sx, y: sy,
              targetX: x, targetY: y,
              vx: 0, vy: 0,
              glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
              baseAlpha: 0.45 + brightness * 0.55,
              currentAlpha: 0,
              delay: Math.random() * 0.35,
              phase: Math.random() * Math.PI * 2,
              kind: "glyph",
              accent: useAccent,
            });
          }
        }
      }

      particlesRef.current = particles;
      imageLoadedRef.current = true;
      startTimeRef.current = performance.now();
    };

    let lastMobileFrame = 0;

    const draw = () => {
      if (window.innerWidth <= 768) {
        const now = performance.now();
        if (now - lastMobileFrame < 33) {
          animationId = requestAnimationFrame(draw);
          return;
        }
        lastMobileFrame = now;
      }

      ctx.clearRect(0, 0, W, H);

      if (!imageLoadedRef.current) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      if (!isF1) {
        const fontSize = size <= 300 ? 8 : 10;
        ctx.font = `${fontSize}px "Share Tech Mono", "SF Mono", Consolas, monospace`;
        ctx.textBaseline = "top";
      } else {
        ctx.lineWidth = size <= 300 ? 1.75 : 2.25;
        ctx.lineCap = "round";
      }

      particles.forEach((p) => {
        const pt = elapsed - p.delay;
        if (pt < 0) return;

        const fadeP = Math.min(pt / 1.4, 1);
        const easedFade = 1 - Math.pow(1 - fadeP, 2);
        // Subtle shimmer: per-particle sine wave breathing
        const shimmer = 0.85 + 0.15 * Math.sin(elapsed * 1.6 + p.phase);
        p.currentAlpha = p.baseAlpha * easedFade * shimmer;

        const moveP = Math.min(pt / 2.4, 1);
        const easedMove = 1 - Math.pow(1 - moveP, 3);

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 70;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 2.2;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const pull = 0.012 + easedMove * 0.075;
        p.vx += dx * pull;
        p.vy += dy * pull;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        const a = p.currentAlpha;
        const color = p.accent
          ? `rgba(${accentRgb}, ${a})`
          : `rgba(220, 235, 220, ${a})`;

        if (p.kind === "line") {
          ctx.strokeStyle = color;
          if (p.accent) {
            ctx.shadowColor = `rgba(${accentRgb}, 0.45)`;
            ctx.shadowBlur = 6;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.length, p.y);
          ctx.stroke();
        } else {
          ctx.fillStyle = color;
          if (p.accent) {
            ctx.shadowColor = `rgba(${accentRgb}, 0.6)`;
            ctx.shadowBlur = 5;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fillText(p.glyph, p.x, p.y);
        }
      });
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleLeave = () => { mouseRef.current.active = false; };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleLeave);

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      imageLoadedRef.current = false;
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [size, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="simulation-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "crosshair",
      }}
    />
  );
};

export default ParticlePortrait;
