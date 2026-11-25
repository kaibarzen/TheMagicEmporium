import { describe, expect, it } from "bun:test";
import { MIN_BLUR, SHARD_COUNT, shatter } from "./shatter";

/** Area of a clip-path polygon given in percentages */
const area = (clipPath: string): number => {
	const points = clipPath
		.replace(/^polygon\(|\)$/g, "")
		.split(", ")
		.map((pair) => pair.split(" ").map((value) => Number.parseFloat(value)));
	let sum = 0;
	for (let index = 0; index < points.length; index++) {
		const [x1, y1] = points[index];
		const [x2, y2] = points[(index + 1) % points.length];
		sum += x1 * y2 - x2 * y1;
	}
	return Math.abs(sum) / 2;
};

describe("shatter", () => {
	it("shatters the same seed the same way every time", () => {
		// ARRANGE & ACT
		const first = shatter("Robes of the Ember Court");
		const second = shatter("Robes of the Ember Court");

		// ASSERT
		expect(second).toEqual(first);
	});

	it("shatters different seeds differently", () => {
		// ARRANGE & ACT
		const robes = shatter("Robes of the Ember Court");
		const blade = shatter("Legendary Veilpiercer");

		// ASSERT
		expect(blade.shards[0].clipPath).not.toBe(robes.shards[0].clipPath);
	});

	it("cuts the whole card into shards that fit together without gaps", () => {
		// ARRANGE & ACT
		const glass = shatter("Robes of the Ember Court");

		// ASSERT
		expect(glass.shards.length).toBe(SHARD_COUNT);
		const covered = glass.shards.reduce(
			(total, shard) => total + area(shard.clipPath),
			0,
		);
		expect(covered).toBeCloseTo(100 * 100, 0);
	});

	it("refracts the art behind each shard without uncovering its edges", () => {
		// ARRANGE & ACT
		const glass = shatter("Robes of the Ember Court");

		// ASSERT
		for (const shard of glass.shards) {
			expect(shard.refraction.scale).toBeGreaterThan(1);
			expect(Math.abs(shard.refraction.x)).toBeLessThanOrEqual(6);
			expect(Math.abs(shard.refraction.y)).toBeLessThanOrEqual(6);
		}
	});

	it("gives the shards different amounts of blur", () => {
		// ARRANGE & ACT
		const glass = shatter("Robes of the Ember Court");

		// ASSERT
		const blurs = new Set(glass.shards.map((shard) => shard.blur));
		expect(blurs.size).toBeGreaterThan(2);
	});

	it("never leaves a shard sharper than the minimum blur", () => {
		// ARRANGE & ACT
		const glass = shatter("Robes of the Ember Court");

		// ASSERT
		for (const shard of glass.shards) {
			expect(shard.blur).toBeGreaterThanOrEqual(MIN_BLUR);
		}
	});

	it("starts each shard at its own point in the rainbow", () => {
		// ARRANGE & ACT
		const glass = shatter("Robes of the Ember Court");

		// ASSERT
		const hues = new Set(glass.shards.map((shard) => shard.holo.hue));
		expect(hues.size).toBeGreaterThan(glass.shards.length / 2);
		for (const shard of glass.shards) {
			expect(shard.holo.hue).toBeGreaterThanOrEqual(0);
			expect(shard.holo.hue).toBeLessThanOrEqual(360);
		}
	});
});
