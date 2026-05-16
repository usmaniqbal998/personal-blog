export interface Pulse {
  horizontal: boolean;
  line: number;
  pos: number;
  speed: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  phase: number;
}

export interface AnimationState {
  pulses: Pulse[];
  particles: Particle[];
  t: number;
}

export const GRID_SPACING = 64;
export const MAJOR_GRID_EVERY = 4;
export const PARTICLE_COUNT = 60;
export const PULSE_INTERVAL = 16; // frames between spawns
export const PULSE_TRAIL_LENGTH = 120;
export const PULSE_GLOW_RADIUS = 10;
export const MAX_DPR = 2;
