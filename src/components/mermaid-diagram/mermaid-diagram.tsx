"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface MermaidDiagramProps {
  children: React.ReactNode;
}

export function MermaidDiagram({ children }: MermaidDiagramProps) {
  const [zoomed, setZoomed] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setZoomed(true), []);
  const close = useCallback(() => setZoomed(false), []);

  useEffect(() => {
    if (!zoomed) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [zoomed, close]);

  return (
    <>
      {/* Inline preview */}
      <div
        className="mermaid-canvas group relative"
        role="button"
        tabIndex={0}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") open();
        }}
      >
        <div className="mermaid-canvas-inner">{children}</div>
        <div className="mermaid-zoom-hint">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <span>Click to zoom</span>
        </div>
      </div>

      {/* Zoom overlay */}
      {zoomed && (
        <div
          ref={backdropRef}
          className="mermaid-overlay"
          onClick={(e) => {
            if (e.target === backdropRef.current) close();
          }}
        >
          <div className="mermaid-overlay-content">
            <button
              className="mermaid-close-btn"
              onClick={close}
              aria-label="Close zoom"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="mermaid-overlay-scroll">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
