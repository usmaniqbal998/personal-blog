import { useCallback, useEffect, useRef } from "react";

import type { AnimationState } from "./types";
import { MAX_DPR, PULSE_INTERVAL } from "./types";
import {
  advanceAndDrawPulses,
  createParticles,
  createPulse,
  drawParticles,
  drawStaticGrid,
} from "./utils";

/**
 * Drives the electric-grid canvas animation.
 *
 * `useEffect` is the correct hook for this — canvas rendering is a DOM side
 * effect that must run after mount and clean up on unmount. The heavy lifting
 * (draw functions, state mutations) is extracted into `utils.ts` so the hook
 * only orchestrates the lifecycle: resize → init → loop → teardown.
 */
export function useElectricGrid(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  disabled = false,
) {
  const stateRef = useRef<AnimationState>({
    pulses: [],
    particles: [],
    t: 0,
  });

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    },
    [],
  );

  useEffect(() => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let raf: number;
    let pulseTimer = 0;

    // --- Resize handler ---
    const handleResize = () => setupCanvas(canvas, ctx, dpr);
    handleResize();
    window.addEventListener("resize", handleResize);

    // --- Init state ---
    const state = stateRef.current;
    state.particles = createParticles(window.innerWidth, window.innerHeight);
    state.pulses = [];
    state.t = 0;

    // --- Animation loop ---
    function frame() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      state.t += 1;

      ctx!.clearRect(0, 0, w, h);

      drawStaticGrid(ctx!, w, h);
      drawParticles(ctx!, state.particles, w, h);

      pulseTimer++;
      if (pulseTimer > PULSE_INTERVAL) {
        state.pulses.push(createPulse(w, h));
        pulseTimer = 0;
      }

      advanceAndDrawPulses(ctx!, state);

      raf = requestAnimationFrame(frame);
    }

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, setupCanvas, disabled]);
}
