"use client";

import { useEffect, useRef } from "react";

const nodes = [
  { x: 0.12, y: 0.2, r: 2.2 },
  { x: 0.28, y: 0.38, r: 2.6 },
  { x: 0.48, y: 0.22, r: 2.1 },
  { x: 0.66, y: 0.44, r: 2.4 },
  { x: 0.82, y: 0.26, r: 2.2 },
  { x: 0.22, y: 0.72, r: 2.2 },
  { x: 0.46, y: 0.66, r: 2.7 },
  { x: 0.72, y: 0.78, r: 2.3 },
  { x: 0.9, y: 0.62, r: 2.5 },
];

const paths = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8],
  [1, 6, 3],
  [2, 6, 4],
];

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const getNode = (index: number) => {
      const node = nodes[index];
      return { x: node.x * width, y: node.y * height, r: node.r };
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#07111f";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;

      const spacing = 48;
      const drift = (frame * 0.2) % spacing;

      for (let x = -spacing; x < width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x + drift, 0);
        ctx.lineTo(x + drift, height);
        ctx.stroke();
      }

      for (let y = -spacing; y < height + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y + drift);
        ctx.lineTo(width, y + drift);
        ctx.stroke();
      }
    };

    const drawPaths = () => {
      paths.forEach((path, pathIndex) => {
        ctx.strokeStyle =
          pathIndex % 2 === 0 ? "rgba(33,199,217,0.28)" : "rgba(184,230,74,0.18)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        path.forEach((nodeIndex, index) => {
          const node = getNode(nodeIndex);
          if (index === 0) ctx.moveTo(node.x, node.y);
          else ctx.lineTo(node.x, node.y);
        });
        ctx.stroke();

        const segment = (frame * 0.006 + pathIndex * 0.22) % 1;
        const start = getNode(path[0]);
        const end = getNode(path[path.length - 1]);
        const x = start.x + (end.x - start.x) * segment;
        const y = start.y + (end.y - start.y) * segment;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 42);

        glow.addColorStop(0, "rgba(33,199,217,0.48)");
        glow.addColorStop(1, "rgba(33,199,217,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 42, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawNodes = () => {
      nodes.forEach((node, index) => {
        const x = node.x * width;
        const y = node.y * height;
        const pulse = Math.sin(frame * 0.035 + index) * 0.35 + 0.65;

        ctx.fillStyle = `rgba(33,199,217,${0.18 * pulse})`;
        ctx.beginPath();
        ctx.arc(x, y, 18 + pulse * 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = index % 3 === 0 ? "#b8e64a" : "#21c7d9";
        ctx.beginPath();
        ctx.arc(x, y, node.r + 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawPanels = () => {
      const panelWidth = Math.min(320, width * 0.22);
      const panelHeight = 84;
      const x = width * 0.62;
      const y = height * 0.16;

      for (let i = 0; i < 3; i += 1) {
        const yy = y + i * 104;
        ctx.fillStyle = "rgba(255,255,255,0.055)";
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x + i * 22, yy, panelWidth, panelHeight, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = i === 1 ? "rgba(184,230,74,0.65)" : "rgba(33,199,217,0.7)";
        ctx.fillRect(x + 18 + i * 22, yy + 22, panelWidth * (0.55 + i * 0.08), 8);
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.fillRect(x + 18 + i * 22, yy + 44, panelWidth * 0.78, 7);
      }
    };

    const animate = () => {
      frame += 1;
      drawGrid();
      drawPaths();
      drawNodes();
      drawPanels();
      animationFrame = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" aria-hidden="true" />;
}
