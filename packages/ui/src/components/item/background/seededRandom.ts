/**
 * Small seeded random generator (mulberry32): the same seed always produces
 * the same sequence, so seeded patterns stay stable for an item.
 * Returns numbers in [0, 1).
 */
export const seededRandom = (seed: string): (() => number) => {
	let state = 0;
	for (let index = 0; index < seed.length; index++) {
		state = Math.imul(state ^ seed.charCodeAt(index), 2654435761);
	}
	return (): number => {
		state = (state + 0x6d2b79f5) | 0;
		let t = Math.imul(state ^ (state >>> 15), 1 | state);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};
