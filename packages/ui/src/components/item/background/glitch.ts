import { seededRandom } from "./seededRandom";

/**
 * Bands of art that jolt sideways in the glitch background. Seeded, so one
 * item always glitches in the same places.
 */

export const SLICE_COUNT = 6;

export interface Slice {
	/** Distance of the band from the top and bottom of the card (%) */
	top: number;
	bottom: number;
	/** How far the band jumps when it glitches (px, either direction) */
	shift: number;
	/** Length of the band's glitch loop and where in it the band starts (s) */
	duration: number;
	delay: number;
}

export const glitchSlices = (seed: string): Slice[] => {
	const random = seededRandom(seed);
	return Array.from({ length: SLICE_COUNT }, (): Slice => {
		const height = 1.5 + random() * 6;
		const top = random() * (100 - height);
		return {
			top,
			bottom: 100 - top - height,
			shift: (random() < 0.5 ? -1 : 1) * (6 + random() * 18),
			duration: 2.5 + random() * 4,
			delay: -random() * 6,
		};
	});
};
