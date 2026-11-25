import type { EmberStyle } from "@tme/shared/src/types/itemAppearance";
import { useRef } from "react";
import { EMBER_SYSTEMS } from "./emberSystem";
import styles from "./particles.module.css";
import { useParticleCanvas } from "./useParticleCanvas";

export interface EmbersProps {
	amount: number;
	style: EmberStyle;
}

/** Sparks that rise from the bottom edge of their container, flicker and burn out */
export const Embers = (props: EmbersProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	useParticleCanvas(canvasRef, EMBER_SYSTEMS[props.style], props.amount);

	return (
		<div className={styles.embers} data-embers={props.style} aria-hidden="true">
			<canvas ref={canvasRef} className={styles.canvas} />
		</div>
	);
};
