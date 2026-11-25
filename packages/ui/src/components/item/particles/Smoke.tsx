import type { SmokeStyle } from "@tme/shared/src/types/itemAppearance";
import { type CSSProperties, useId, useRef } from "react";
import styles from "./particles.module.css";
import { isFullSmoke, SMOKE_SYSTEMS } from "./smokeSystem";
import { useParticleCanvas } from "./useParticleCanvas";

export interface SmokeProps {
	amount: number;
	style: SmokeStyle;
}

/**
 * Smoke that curls up from the bottom edge of its container, or for the _FULL
 * styles drifts over all of it. The puffs are soft circles; a slowly churning
 * noise displacement twists them into wisps.
 */
export const Smoke = (props: SmokeProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	// useId contains characters that break url(#…) references
	const filterId = `smoke-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
	useParticleCanvas(canvasRef, SMOKE_SYSTEMS[props.style], props.amount);

	return (
		<div
			className={isFullSmoke(props.style) ? styles.smokeFull : styles.smoke}
			data-smoke={props.style}
			aria-hidden="true"
		>
			<svg
				className={styles.filterDefs}
				width="0"
				height="0"
				aria-hidden="true"
			>
				<filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.011 0.018"
						numOctaves={2}
						seed={7}
					>
						<animate
							attributeName="baseFrequency"
							dur="20s"
							values="0.011 0.018;0.015 0.024;0.011 0.018"
							repeatCount="indefinite"
						/>
					</feTurbulence>
					<feDisplacementMap
						in="SourceGraphic"
						scale={46}
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
			</svg>
			<canvas
				ref={canvasRef}
				className={styles.smokeCanvas}
				style={{ "--smoke-filter": `url(#${filterId})` } as CSSProperties}
			/>
		</div>
	);
};
