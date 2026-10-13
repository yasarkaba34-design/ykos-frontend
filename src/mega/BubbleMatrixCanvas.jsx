// src/mega/BubbleMatrixCanvas.jsx

import React, { useEffect, useRef, useState } from "react";
import { useBubblePipeline } from "@/core/useBubblePipeline";
import "@/styles/bubblematrix.css";

export const BubbleMatrixCanvas = () => {
  const pipeline = useBubblePipeline();
  const canvasRef = useRef(null);

  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);

  // --- Zoom + Pan state ---
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame;

    const tick = () => {
      const bubbles = pipeline.get();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Zoom + Pan transform ---
      ctx.save();
      ctx.translate(offset.x, offset.y);
      ctx.scale(zoom, zoom);

      bubbles.forEach((b) => {
        const radius = 20 + b.weight * 0.5;

        ctx.beginPath();
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "12px sans-serif";
        ctx.fillText(b.label, b.x - 10, b.y - radius - 10);
      });

      ctx.restore();

      frame = requestAnimationFrame(tick);
    };

    tick();

    return () => cancelAnimationFrame(frame);
  }, [pipeline, zoom, offset]);

  // --- Hover algılama ---
  const handleMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const mx = (e.clientX - rect.left - offset.x) / zoom;
    const my = (e.clientY - rect.top - offset.y) / zoom;

    const bubbles = pipeline.get();

    for (const b of bubbles) {
      const radius = 20 + b.weight * 0.5;
      const dx = mx - b.x;
      const dy = my - b.y;

      if (dx * dx + dy * dy <= radius * radius) {
        setHoverInfo(b);
        return;
      }
    }

    setHoverInfo(null);
  };

  // --- Tıklama → RTE rezonans kartı ---
  const handleClick = () => {
    if (hoverInfo) {
      const selected = pipeline.select(hoverInfo);
      setSelectedInfo(selected);
    }
  };

  // --- Zoom (mouse wheel) ---
  const handleWheel = (e) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.min(Math.max(z + delta, 0.3), 3));
  };

  // --- Pan (mouse drag) ---
  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMovePan = (e) => {
    if (!isDragging.current) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    dragStart.current = { x: e.clientX, y: e.clientY };

    setOffset((o) => ({
      x: o.x + dx,
      y: o.y + dy
    }));
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="bubble-canvas"
        onMouseMove={(e) => {
          handleMove(e);
          handleMouseMovePan(e);
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleClick}
      />

      {hoverInfo && (
        <div
          className="bubble-tooltip"
          style={{
            left: hoverInfo.x * zoom + offset.x + 40,
            top: hoverInfo.y * zoom + offset.y + 40
          }}
        >
          <div><strong>{hoverInfo.label}</strong></div>
          <div>Ağırlık: {hoverInfo.weight.toFixed(2)}</div>
        </div>
      )}

      {selectedInfo && (
        <div className="bubble-resonance-card">
          <div className="brc-title">Rezonans Kartı</div>
          <div><strong>Etiket:</strong> {selectedInfo.label}</div>
          <div><strong>Ağırlık:</strong> {selectedInfo.weight.toFixed(2)}</div>
          <div><strong>Zaman:</strong> {new Date(selectedInfo.timestamp).toLocaleTimeString()}</div>
        </div>
      )}
    </>
  );
};
