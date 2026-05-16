"use client";

import { useRef } from "react";

import { useElectricGrid } from "./use-electric-grid";

export function ElectricGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useElectricGrid(canvasRef);

  return (
    <div className="bg-stage" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="bg-vignette" />
      <div className="bg-noise" />
    </div>
  );
}
