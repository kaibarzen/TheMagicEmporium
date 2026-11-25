import type { SmokeStyle } from "@tme/shared/src/types/itemAppearance";
import type { ParticleSystem } from "./useParticleCanvas";

/** One soft puff of smoke; many overlapping puffs, displaced by noise, read as curling smoke */
export interface Puff {
	x: number;
	y: number;
	/** Steady sideways drift (px/s) */
	vx: number;
	/** Rise speed (px/s), negative is up */
	vy: number;
	radius: number;
	/** Radius gained per second as the smoke spreads */
	growth: number;
	age: number;
	lifespan: number;
	phase: number;
}

/** How one style of smoke is coloured */
export interface SmokeShade {
	/** "r, g, b" */
	color: string;
	/** Opacity of a puff at its thickest */
	peakAlpha: number;
}

const WHITE_SMOKE = "200, 186, 240";
const BLACK_SMOKE = "2, 1, 6";

export const SMOKE_SHADES: Record<SmokeStyle, SmokeShade> = {
	// Ghostly violet-grey, faint enough to sit behind the text
	WHITE: { color: WHITE_SMOKE, peakAlpha: 0.32 },
	// Near-black with a cold blue cast; thicker, since darkening shows less than lightening
	BLACK: { color: BLACK_SMOKE, peakAlpha: 0.9 },
	// Thinner over the whole card, so the header art still shows through
	WHITE_FULL: { color: WHITE_SMOKE, peakAlpha: 0.2 },
	BLACK_FULL: { color: BLACK_SMOKE, peakAlpha: 0.55 },
};

/** Whether the smoke drifts over the whole card rather than rising from the bottom edge */
export const isFullSmoke = (style: SmokeStyle): boolean => {
	return style === "WHITE_FULL" || style === "BLACK_FULL";
};

/** Opacity as a share of the peak: swells in, then thins out as the puff spreads */
export const puffDensity = (puff: Puff): number => {
	const t = Math.min(1, Math.max(0, puff.age / puff.lifespan));
	return Math.sin(Math.PI * t);
};

/** A puff born just below the bottom edge that rises up the card */
export const spawnRisingPuff = (
	width: number,
	height: number,
	scattered: boolean,
): Puff => {
	const lifespan = 6 + Math.random() * 5;
	const puff: Puff = {
		x: Math.random() * width,
		y: height + 10 + Math.random() * 30,
		vx: (Math.random() - 0.5) * 12,
		vy: -(16 + Math.random() * 22),
		radius: 26 + Math.random() * 30,
		growth: 4 + Math.random() * 6,
		age: 0,
		lifespan,
		phase: Math.random() * Math.PI * 2,
	};
	if (scattered) {
		const age = Math.random() * lifespan;
		puff.age = age;
		puff.y += puff.vy * age;
		puff.radius += puff.growth * age;
	}
	return puff;
};

/**
 * A puff born anywhere on the card that lingers and drifts lazily upward.
 * It fades in from nothing, so it never pops into view.
 */
export const spawnDriftingPuff = (
	width: number,
	height: number,
	scattered: boolean,
): Puff => {
	const lifespan = 9 + Math.random() * 7;
	const puff: Puff = {
		x: Math.random() * width,
		y: Math.random() * height,
		vx: (Math.random() - 0.5) * 10,
		vy: -(3 + Math.random() * 7),
		radius: 40 + Math.random() * 40,
		growth: 2 + Math.random() * 4,
		age: 0,
		lifespan,
		phase: Math.random() * Math.PI * 2,
	};
	if (scattered) {
		const age = Math.random() * lifespan;
		puff.age = age;
		puff.radius += puff.growth * age;
	}
	return puff;
};

export const stepPuff = (puff: Puff, dt: number): boolean => {
	puff.age += dt;
	if (puff.age >= puff.lifespan) {
		return false;
	}
	const curl = Math.sin(puff.age * 0.8 + puff.phase) * 8;
	puff.x += (puff.vx + curl) * dt;
	puff.y += puff.vy * dt;
	puff.radius += puff.growth * dt;
	return true;
};

export const drawPuff = (
	ctx: CanvasRenderingContext2D,
	puff: Puff,
	shade: SmokeShade,
): void => {
	const alpha = puffDensity(puff) * shade.peakAlpha;
	if (alpha <= 0) {
		return;
	}
	const gradient = ctx.createRadialGradient(
		puff.x,
		puff.y,
		0,
		puff.x,
		puff.y,
		puff.radius,
	);
	gradient.addColorStop(0, `rgba(${shade.color}, ${alpha})`);
	gradient.addColorStop(0.6, `rgba(${shade.color}, ${alpha * 0.4})`);
	gradient.addColorStop(1, `rgba(${shade.color}, 0)`);
	ctx.fillStyle = gradient;
	ctx.beginPath();
	ctx.arc(puff.x, puff.y, puff.radius, 0, Math.PI * 2);
	ctx.fill();
};

const smokeSystem = (
	spawn: ParticleSystem<Puff>["spawn"],
	shade: SmokeShade,
): ParticleSystem<Puff> => {
	return {
		spawn,
		step: stepPuff,
		draw: (ctx: CanvasRenderingContext2D, puff: Puff): void => {
			drawPuff(ctx, puff, shade);
		},
	};
};

/** One system per style, built once so the canvas loop is not restarted on every render */
export const SMOKE_SYSTEMS: Record<SmokeStyle, ParticleSystem<Puff>> = {
	WHITE: smokeSystem(spawnRisingPuff, SMOKE_SHADES.WHITE),
	BLACK: smokeSystem(spawnRisingPuff, SMOKE_SHADES.BLACK),
	WHITE_FULL: smokeSystem(spawnDriftingPuff, SMOKE_SHADES.WHITE_FULL),
	BLACK_FULL: smokeSystem(spawnDriftingPuff, SMOKE_SHADES.BLACK_FULL),
};
