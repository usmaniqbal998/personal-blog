import type { AnimationState, Particle, Pulse } from "./types";
import {
  GRID_SPACING,
  MAJOR_GRID_EVERY,
  PARTICLE_COUNT,
  PULSE_GLOW_RADIUS,
  PULSE_TRAIL_LENGTH,
} from "./types";

/** Read a CSS custom property from :root as a trimmed string. */
export function getAccentRgb(property: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim();
  return value || (property === "--c1-rgb" ? "34,211,238" : "168,85,247");
}

/** Build the initial set of floating particles. */
export function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.2 + 0.3,
    vx: (Math.random() - 0.5) * 0.04,
    vy: (Math.random() - 0.5) * 0.04,
    a: Math.random() * 0.5 + 0.2,
    phase: Math.random() * Math.PI * 2,
  }));
}

/** Spawn a new pulse on a random grid line. */
export function createPulse(width: number, height: number): Pulse {
  const c1 = getAccentRgb("--c1-rgb");
  const c2 = getAccentRgb("--c2-rgb");
  const horizontal = Math.random() > 0.5;
  const color = Math.random() > 0.5 ? c1 : c2;

  if (horizontal) {
    const row = Math.floor(Math.random() * Math.floor(height / GRID_SPACING));
    return {
      horizontal: true,
      line: row * GRID_SPACING,
      pos: -100,
      speed: 1.2 + Math.random() * 1.8,
      color,
      life: 0,
      maxLife: width + 200,
    };
  }

  const col = Math.floor(Math.random() * Math.floor(width / GRID_SPACING));
  return {
    horizontal: false,
    line: col * GRID_SPACING,
    pos: -100,
    speed: 1.2 + Math.random() * 1.8,
    color,
    life: 0,
    maxLife: height + 200,
  };
}

// ---------------------------------------------------------------------------
// Drawing helpers — each receives a 2D context and the viewport size
// ---------------------------------------------------------------------------

export function drawStaticGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
) {
  // Minor grid
  ctx.strokeStyle = "rgba(120,130,160,0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= w; x += GRID_SPACING) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
  }
  for (let y = 0; y <= h; y += GRID_SPACING) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
  }
  ctx.stroke();

  // Major grid
  const majorSpacing = GRID_SPACING * MAJOR_GRID_EVERY;
  ctx.strokeStyle = "rgba(160,170,200,0.05)";
  ctx.beginPath();
  for (let x = 0; x <= w; x += majorSpacing) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
  }
  for (let y = 0; y <= h; y += majorSpacing) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
  }
  ctx.stroke();
}

export function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  w: number,
  h: number,
) {
  ctx.save();
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.phase += 0.02;

    // Wrap around viewport
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    const twinkle = (Math.sin(p.phase) + 1) / 2;
    ctx.fillStyle = `rgba(200,210,240,${p.a * (0.4 + twinkle * 0.6)})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawPulse(ctx: CanvasRenderingContext2D, pulse: Pulse) {
  const headX = pulse.horizontal ? pulse.pos : pulse.line;
  const headY = pulse.horizontal ? pulse.line : pulse.pos;
  const tailX = pulse.horizontal ? pulse.pos - PULSE_TRAIL_LENGTH : pulse.line;
  const tailY = pulse.horizontal ? pulse.line : pulse.pos - PULSE_TRAIL_LENGTH;

  // Trail gradient
  const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
  grad.addColorStop(0, `rgba(${pulse.color},0)`);
  grad.addColorStop(0.7, `rgba(${pulse.color},0.4)`);
  grad.addColorStop(1, `rgba(${pulse.color},0.95)`);

  ctx.strokeStyle = grad;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(headX, headY);
  ctx.stroke();

  // Glow head
  const glow = ctx.createRadialGradient(
    headX,
    headY,
    0,
    headX,
    headY,
    PULSE_GLOW_RADIUS,
  );
  glow.addColorStop(0, `rgba(${pulse.color},0.8)`);
  glow.addColorStop(1, `rgba(${pulse.color},0)`);
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(headX, headY, PULSE_GLOW_RADIUS, 0, Math.PI * 2);
  ctx.fill();
}

/** Advance and draw all pulses, returning only those still alive. */
export function advanceAndDrawPulses(
  ctx: CanvasRenderingContext2D,
  state: AnimationState,
) {
  state.pulses = state.pulses.filter((p) => p.life < p.maxLife);

  for (const p of state.pulses) {
    const step = p.speed * 4;
    p.life += step;
    p.pos += step;
    drawPulse(ctx, p);
  }
}
