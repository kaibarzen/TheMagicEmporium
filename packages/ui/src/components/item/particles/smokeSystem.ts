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

export const SMOKE_SHADES: Record<SmokeStyle, SmokeShade> = {
	// Ghostly violet-grey, faint enough to sit behind the text
	WHITE: { color: "200, 186, 240", peakAlpha: 0.32 },
	// Near-black with a cold blue cast; thicker, since darkening shows less than lightening
	BLACK: { color: "2, 1, 6", peakAlpha: 0.9 },
};

/** Opacity as a share of the peak: swells in, then thins out as the puff spreads */
export const puffDensity = (puff: Puff): number => {
	const t = Math.min(1, Math.max(0, puff.age / puff.lifespan));
	return Math.sin(Math.PI * t);
};

export const spawnPuff = (
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

const smokeSystem = (shade: SmokeShade): ParticleSystem<Puff> => {
	return {
		spawn: spawnPuff,
		step: stepPuff,
		draw: (ctx: CanvasRenderingContext2D, puff: Puff): void => {
			drawPuff(ctx, puff, shade);
		},
	};
};

/** One system per style, built once so the canvas loop is not restarted on every render */
export const SMOKE_SYSTEMS: Record<SmokeStyle, ParticleSystem<Puff>> = {
	WHITE: smokeSystem(SMOKE_SHADES.WHITE),
	BLACK: smokeSystem(SMOKE_SHADES.BLACK),
};
