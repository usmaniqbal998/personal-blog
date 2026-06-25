"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";

import { useElectricGrid } from "./use-electric-grid";

export function ElectricGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useElectricGrid(canvasRef, !isHome);

  return (
    <div className="bg-stage" aria-hidden="true">
      {isHome && <canvas ref={canvasRef} />}
      <div className="bg-vignette" />
      <div className="bg-noise" />
    </div>
  );
}
