import { animate, type JSAnimation } from "animejs";
import { type RefObject, useEffect } from "react";
import { REDUCED_MOTION_QUERY, SWEEP_DURATION } from "./tilt";

const clamp = (value: number): number => {
	return Math.min(1, Math.max(-1, value));
};

/**
 * Tilts `surfaceRef` toward the pointer while hovered and sweeps `glintRef`
 * across the card once each time the pointer enters.
 *
 * Writes `--tilt-x` / `--tilt-y` (each -1..1, 0 at the centre) and a
 * `data-tilting` attribute on the surface; the CSS turns those into the
 * rotation, so pointer moves never re-render React. Does nothing when
 * disabled or when the viewer prefers reduced motion.
 */
export const useCardTilt = (
	enabled: boolean,
	surfaceRef: RefObject<HTMLDivElement | null>,
	glintRef: RefObject<HTMLDivElement | null>,
): void => {
	useEffect(() => {
		const surface = surfaceRef.current;
		if (!enabled || !surface) {
			return;
		}
		if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
			return;
		}

		let frame = 0;
		let sweep: JSAnimation | null = null;

		const tiltTo = (x: number, y: number): void => {
			surface.style.setProperty("--tilt-x", x.toFixed(3));
			surface.style.setProperty("--tilt-y", y.toFixed(3));
		};

		const onEnter = (): void => {
			surface.dataset.tilting = "";
			const glint = glintRef.current;
			if (!glint) {
				return;
			}
			sweep?.pause();
			sweep = animate(glint, {
				translateX: ["-130%", "130%"],
				duration: SWEEP_DURATION,
				ease: "inOutSine",
			});
		};

		const onMove = (event: PointerEvent): void => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const rect = surface.getBoundingClientRect();
				tiltTo(
					clamp(((event.clientX - rect.left) / rect.width) * 2 - 1),
					clamp(((event.clientY - rect.top) / rect.height) * 2 - 1),
				);
			});
		};

		const onLeave = (): void => {
			cancelAnimationFrame(frame);
			delete surface.dataset.tilting;
			tiltTo(0, 0);
		};

		surface.addEventListener("pointerenter", onEnter);
		surface.addEventListener("pointermove", onMove);
		surface.addEventListener("pointerleave", onLeave);

		return (): void => {
			surface.removeEventListener("pointerenter", onEnter);
			surface.removeEventListener("pointermove", onMove);
			surface.removeEventListener("pointerleave", onLeave);
			sweep?.pause();
			onLeave();
		};
	}, [enabled, surfaceRef, glintRef]);
};
