"use client";

import { useRef, useState, useCallback, useEffect, useId } from "react";

interface MermaidDiagramProps {
  code: string;
}

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const [svgHtml, setSvgHtml] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, "-");

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

  useEffect(() => {
    const trimmed = code.trim();
    if (!trimmed) return;

    let cancelled = false;
    import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          darkMode: true,
          background: "#05060a",
          primaryColor: "#1e1e2e",
          primaryTextColor: "#e8eaf1",
          primaryBorderColor: "#f472b6",
          secondaryColor: "#0a0c14",
          secondaryTextColor: "#8b91a8",
          tertiaryColor: "#0a0c14",
          lineColor: "#8b91a8",
          textColor: "#e8eaf1",
          mainBkg: "#0a0c14",
          nodeBorder: "#f472b6",
          clusterBkg: "#0a0c14",
          titleColor: "#e8eaf1",
          edgeLabelBackground: "#05060a",
        },
      });
      mermaid
        .render(`mermaid${uniqueId}`, trimmed)
        .then(({ svg }) => {
          if (!cancelled) setSvgHtml(svg);
        })
        .catch(() => {});
    });

    return () => {
      cancelled = true;
    };
  }, [code, uniqueId]);

  const fallback = (
    <pre className="font-mono text-mono text-fg-dim p-s-4">
      <code>{code}</code>
    </pre>
  );

  return (
    <>
      {/* Inline preview */}
      <div
        className="mermaid-canvas group relative cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") open();
        }}
      >
        <div className="mermaid-canvas-inner">
          {svgHtml ? (
            <div
              style={zoomed ? { visibility: "hidden" } : undefined}
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          ) : (
            fallback
          )}
        </div>
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

      {/* Zoom overlay — render SVG only here when zoomed to avoid duplicate IDs */}
      {zoomed && svgHtml && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 backdrop-blur-sm p-6"
          onClick={(e) => {
            if (e.target === backdropRef.current) close();
          }}
        >
          <div className="relative w-full h-full max-w-[1400px] max-h-[90vh] overflow-auto rounded-lg border border-line bg-bg p-8 flex items-center justify-center [&_svg]:w-full [&_svg]:h-auto">
            <button
              className="absolute top-3 right-3 text-fg-dim hover:text-fg transition-colors z-10"
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
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          </div>
        </div>
      )}
    </>
  );
}
