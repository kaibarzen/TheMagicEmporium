import { type RefObject, useEffect } from "react";
import { REDUCED_MOTION_QUERY } from "../tilt/tilt";

/** How one kind of particle is born, moves and is drawn */
export interface ParticleSystem<P> {
	/**
	 * A new particle for a canvas of the given size. `scattered` particles
	 * start anywhere along their path, so the canvas is full from the first frame.
	 */
	spawn: (width: number, height: number, scattered: boolean) => P;
	/** Advances the particle by `dt` seconds; false once it has died */
	step: (particle: P, dt: number) => boolean;
	draw: (ctx: CanvasRenderingContext2D, particle: P) => void;
}

/** Longest step (s) a single frame may take, so a background tab does not teleport particles */
const MAX_STEP = 0.05;

/**
 * Runs `amount` particles of `system` on the canvas, replacing each one as it
 * dies. The canvas follows its own CSS size at the device pixel ratio. When the
 * viewer prefers reduced motion it draws one still frame instead.
 */
export const useParticleCanvas = <P>(
	canvasRef: RefObject<HTMLCanvasElement | null>,
	system: ParticleSystem<P>,
	amount: number,
): void => {
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d") ?? null;
		if (!canvas || !ctx) {
			return;
		}

		let width = 0;
		let height = 0;
		let particles: P[] = [];

		const draw = (): void => {
			ctx.clearRect(0, 0, width, height);
			for (const particle of particles) {
				system.draw(ctx, particle);
			}
		};

		const resize = (): void => {
			const rect = canvas.getBoundingClientRect();
			const dpr = window.devicePixelRatio || 1;
			const resized = rect.width !== width || rect.height !== height;
			width = rect.width;
			height = rect.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			if (resized) {
				particles = Array.from({ length: amount }, () =>
					system.spawn(width, height, true),
				);
			}
			draw();
		};

		resize();
		const observer = new ResizeObserver(resize);
		observer.observe(canvas);

		if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
			return (): void => {
				observer.disconnect();
			};
		}

		let last = performance.now();
		let frame = 0;
		const tick = (now: number): void => {
			const dt = Math.min(MAX_STEP, (now - last) / 1000);
			last = now;
			for (let i = 0; i < particles.length; i++) {
				if (!system.step(particles[i], dt)) {
					particles[i] = system.spawn(width, height, false);
				}
			}
			draw();
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);

		return (): void => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	}, [canvasRef, system, amount]);
};
