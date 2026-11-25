import type { EmberStyle } from "@tme/shared/src/types/itemAppearance";
import { EMBER_PALETTES, type EmberPalette } from "./emberPalettes";
import type { ParticleSystem } from "./useParticleCanvas";

export interface Ember {
	x: number;
	y: number;
	/** Steady sideways drift (px/s) */
	vx: number;
	/** Rise speed (px/s), negative is up */
	vy: number;
	/** Seconds since the ember was born */
	age: number;
	/** Seconds until it burns out */
	lifespan: number;
	/** Core radius (px) */
	size: number;
	/** Random offset so embers do not sway and flicker in step */
	phase: number;
	/** Sideways sway (px/s) */
	sway: number;
	/** Hue (0..360) for palettes that colour each ember differently */
	hue: number;
}

/** Seconds an ember takes to flare up after it is born */
const FLARE = 0.4;

/** How much heat is left in the ember, 1 when born and 0 when it burns out */
export const emberHeat = (ember: Ember): number => {
	return Math.max(0, 1 - ember.age / ember.lifespan);
};

/** Opacity: flares up at birth, flickers, and fades as it cools */
export const emberAlpha = (ember: Ember): number => {
	const flare = Math.min(1, ember.age / FLARE);
	const flicker = 0.7 + 0.3 * Math.sin(ember.age * 14 + ember.phase);
	return flare * flicker * Math.min(1, emberHeat(ember) * 1.6);
};

export const spawnEmber = (
	width: number,
	height: number,
	scattered: boolean,
): Ember => {
	const lifespan = 3 + Math.random() * 4;
	const ember: Ember = {
		x: Math.random() * width,
		y: height + Math.random() * 12,
		vx: (Math.random() - 0.5) * 10,
		vy: -(25 + Math.random() * 45),
		age: 0,
		lifespan,
		size: 1 + Math.random() * 1.8,
		phase: Math.random() * Math.PI * 2,
		sway: 6 + Math.random() * 14,
		hue: Math.random() * 360,
	};
	if (scattered) {
		ember.age = Math.random() * lifespan;
		ember.y += ember.vy * ember.age;
	}
	return ember;
};

export const stepEmber = (ember: Ember, dt: number): boolean => {
	ember.age += dt;
	if (ember.age >= ember.lifespan) {
		return false;
	}
	const sway = Math.sin(ember.age * 2.2 + ember.phase) * ember.sway;
	ember.x += (ember.vx + sway) * dt;
	ember.y += ember.vy * dt;
	return true;
};

/** Draws an ember in the given palette: a soft glow, then its core */
export const drawEmber = (
	ctx: CanvasRenderingContext2D,
	ember: Ember,
	palette: EmberPalette,
): void => {
	const alpha = emberAlpha(ember);
	if (alpha <= 0) {
		return;
	}
	const shade = { heat: emberHeat(ember), hue: ember.hue, age: ember.age };
	const size = ember.size * palette.coreScale;
	const glow = size * palette.haloSpread;

	ctx.globalCompositeOperation = "lighter";
	const halo = ctx.createRadialGradient(
		ember.x,
		ember.y,
		0,
		ember.x,
		ember.y,
		glow,
	);
	halo.addColorStop(0, palette.halo(shade, alpha * palette.haloStrength));
	halo.addColorStop(1, palette.halo(shade, 0));
	ctx.fillStyle = halo;
	ctx.beginPath();
	ctx.arc(ember.x, ember.y, glow, 0, Math.PI * 2);
	ctx.fill();

	ctx.globalCompositeOperation = palette.coreBlend;
	ctx.fillStyle = palette.core(shade, alpha);
	ctx.beginPath();
	ctx.arc(ember.x, ember.y, size, 0, Math.PI * 2);
	ctx.fill();
};

const emberSystem = (palette: EmberPalette): ParticleSystem<Ember> => {
	return {
		spawn: spawnEmber,
		step: stepEmber,
		draw: (ctx: CanvasRenderingContext2D, ember: Ember): void => {
			drawEmber(ctx, ember, palette);
		},
	};
};

/** One system per style, built once so the canvas loop is not restarted on every render */
export const EMBER_SYSTEMS: Record<EmberStyle, ParticleSystem<Ember>> = {
	BRIGHT: emberSystem(EMBER_PALETTES.BRIGHT),
	FIRE: emberSystem(EMBER_PALETTES.FIRE),
	GOLDEN: emberSystem(EMBER_PALETTES.GOLDEN),
	BLACK: emberSystem(EMBER_PALETTES.BLACK),
	WISPS: emberSystem(EMBER_PALETTES.WISPS),
};
