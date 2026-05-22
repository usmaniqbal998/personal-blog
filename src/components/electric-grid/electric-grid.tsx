"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";

import { useElectricGrid } from "./use-electric-grid";

export function ElectricGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const isPostPage = pathname.startsWith("/posts/");

  useElectricGrid(canvasRef, isPostPage);

  return (
    <div className="bg-stage" aria-hidden="true">
      {!isPostPage && <canvas ref={canvasRef} />}
      <div className="bg-vignette" />
      <div className="bg-noise" />
    </div>
  );
}
