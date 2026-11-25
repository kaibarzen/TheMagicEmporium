/**
 * Geometry for the shattered glass background: the card is cut into irregular
 * shards that fit together exactly (a Voronoi tiling), small and dense around
 * an impact point and larger further out. Each shard refracts the art behind
 * it a little differently.
 *
 * Everything is laid out in a 100 × 200 box (roughly the card's proportions)
 * and handed out as percentages, so it stretches to whatever size the card is.
 * The layout is seeded, so one item always shatters the same way.
 */

import { seededRandom } from "./seededRandom";

const WIDTH = 100;
const HEIGHT = 200;
/** Large shards spread evenly over the card */
const GRID_COLUMNS = 3;
const GRID_ROWS = 5;
/** Small shards packed around the impact */
const IMPACT_SHARDS = 10;
const IMPACT_RADIUS = 26;
/** The least blur any shard gets (px); also the blur of the layer behind the shards */
export const MIN_BLUR = 2;
/** Blur levels a shard can take (px); repeats make the lighter levels more common */
const BLUR_LEVELS = [MIN_BLUR, MIN_BLUR, 3, 4, 4, 6, 8, 12];

export const SHARD_COUNT = GRID_COLUMNS * GRID_ROWS + IMPACT_SHARDS;

interface Point {
	x: number;
	y: number;
}

export interface Shard {
	/** `polygon(…)` for clip-path, in percentages of the card */
	clipPath: string;
	/** How the art behind this shard is bent out of line with its neighbours */
	refraction: {
		/** Shift of the art (px) */
		x: number;
		y: number;
		/** Always above 1, so the shifted art still covers the shard */
		scale: number;
		rotate: number;
	};
	blur: number;
	brightness: number;
	/** Faint light across the face of the shard */
	sheen: {
		angle: number;
		opacity: number;
	};
	/** Rainbow foil over the shard: one colour at a time, cycling through the spectrum */
	holo: {
		/** Direction the colour wash falls across the shard */
		angle: number;
		/** Where in the colour cycle the shard starts (deg of hue) */
		hue: number;
		opacity: number;
	};
}

export interface Shatter {
	shards: Shard[];
}

/**
 * Keeps the part of `polygon` that is closer to `own` than to `other`
 * (one Sutherland–Hodgman step against their perpendicular bisector).
 */
const clipCloserTo = (polygon: Point[], own: Point, other: Point): Point[] => {
	const middle = { x: (own.x + other.x) / 2, y: (own.y + other.y) / 2 };
	const away = { x: other.x - own.x, y: other.y - own.y };
	const side = (point: Point): number => {
		return (point.x - middle.x) * away.x + (point.y - middle.y) * away.y;
	};

	const kept: Point[] = [];
	for (let index = 0; index < polygon.length; index++) {
		const current = polygon[index];
		const next = polygon[(index + 1) % polygon.length];
		const currentSide = side(current);
		const nextSide = side(next);
		if (currentSide <= 0) {
			kept.push(current);
		}
		if (currentSide * nextSide < 0) {
			const t = currentSide / (currentSide - nextSide);
			kept.push({
				x: current.x + (next.x - current.x) * t,
				y: current.y + (next.y - current.y) * t,
			});
		}
	}
	return kept;
};

/** The shard around `own`: every point of the card closer to it than to any other seed */
const voronoiCell = (own: Point, seeds: Point[]): Point[] => {
	let cell: Point[] = [
		{ x: 0, y: 0 },
		{ x: WIDTH, y: 0 },
		{ x: WIDTH, y: HEIGHT },
		{ x: 0, y: HEIGHT },
	];
	for (const other of seeds) {
		if (other !== own) {
			cell = clipCloserTo(cell, own, other);
		}
	}
	return cell;
};

const percent = (point: Point): string => {
	return `${point.x.toFixed(2)}% ${((point.y / HEIGHT) * 100).toFixed(2)}%`;
};

const scatterSeeds = (random: () => number): Point[] => {
	const seeds: Point[] = [];

	const cellWidth = WIDTH / GRID_COLUMNS;
	const cellHeight = HEIGHT / GRID_ROWS;
	for (let row = 0; row < GRID_ROWS; row++) {
		for (let column = 0; column < GRID_COLUMNS; column++) {
			seeds.push({
				x: (column + 0.15 + random() * 0.7) * cellWidth,
				y: (row + 0.15 + random() * 0.7) * cellHeight,
			});
		}
	}

	// Strike somewhere in the middle of the card, a little above centre
	const impact = { x: 30 + random() * 40, y: 50 + random() * 50 };
	for (let index = 0; index < IMPACT_SHARDS; index++) {
		const angle = random() * Math.PI * 2;
		// Square root keeps the small shards from bunching up at the very centre
		const distance = Math.sqrt(random()) * IMPACT_RADIUS;
		seeds.push({
			x: impact.x + Math.cos(angle) * distance,
			y: impact.y + Math.sin(angle) * distance,
		});
	}

	return seeds;
};

export const shatter = (seed: string): Shatter => {
	const random = seededRandom(seed);
	const seeds = scatterSeeds(random);
	const cells = seeds.map((own) => voronoiCell(own, seeds));

	const shards = cells.map((cell): Shard => {
		return {
			clipPath: `polygon(${cell.map(percent).join(", ")})`,
			refraction: {
				x: (random() - 0.5) * 12,
				y: (random() - 0.5) * 12,
				scale: 1.04 + random() * 0.08,
				rotate: (random() - 0.5) * 4,
			},
			blur: BLUR_LEVELS[Math.floor(random() * BLUR_LEVELS.length)],
			brightness: 0.8 + random() * 0.4,
			sheen: {
				angle: Math.round(random() * 360),
				opacity: 0.04 + random() * 0.1,
			},
			holo: {
				angle: Math.round(random() * 360),
				hue: Math.round(random() * 360),
				opacity: 0.2 + random() * 0.14,
			},
		};
	});

	return { shards };
};
