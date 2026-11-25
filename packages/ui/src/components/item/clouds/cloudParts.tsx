import type { JSX, ReactNode } from "react";
import styles from "./CloudDecoration.module.css";

/**
 * Shared drawing helpers for the cloud decorations.
 *
 * Every decoration is drawn in a 488 × 96 view box whose bottom edge (y = 95)
 * sits on the golden line the item rests on. Only the left half is drawn;
 * {@link mirrored} reflects it onto the right so the design stays symmetrical.
 */

export const VIEW_WIDTH = 488;
export const VIEW_HEIGHT = 96;

export const GOLD = "#d4a64a";
export const GOLD_PALE = "#f3dca0";

const CLOUD_PATH =
	"M14 42 C3 42 1 31 8 26 C1 18 10 7 21 12 C23 1 40 -1 46 8 C52 -1 68 -1 72 10 C80 3 95 5 95 16 C107 13 117 22 112 32 C119 38 112 44 103 42 Z";

/** Turns a React `useId` value into something safe to use inside `url(#…)`. */
export const svgId = (reactId: string, suffix: string): string => {
	return `${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}-${suffix}`;
};

interface CloudShapeOptions {
	key: string;
	x: number;
	y: number;
	width: number;
	height: number;
	fill: string;
	stroke: string;
	curlStroke: string;
	/** Solid fill painted first, so a translucent `fill` does not show what is behind it */
	underlay?: string;
	opacity?: number;
}

/** One puffy cloud with curls, scaled into the given box. */
export const cloudShape = (options: CloudShapeOptions): JSX.Element => {
	return (
		<svg
			key={options.key}
			x={options.x}
			y={options.y}
			width={options.width}
			height={options.height}
			viewBox="0 0 120 46"
			overflow="visible"
			opacity={options.opacity}
			aria-hidden="true"
		>
			{options.underlay !== undefined && (
				<path d={CLOUD_PATH} fill={options.underlay} />
			)}
			<path
				d={CLOUD_PATH}
				fill={options.fill}
				stroke={options.stroke}
				strokeWidth={1.3}
				strokeLinejoin="round"
			/>
			<path
				d="M40 31 c0 -7 9 -9 12 -3 c2 4 -3 7 -6 4"
				fill="none"
				stroke={options.curlStroke}
				strokeWidth={1.1}
				strokeLinecap="round"
			/>
			<path
				d="M72 29 c0 -7 9 -9 12 -3 c2 4 -3 7 -6 4"
				fill="none"
				stroke={options.curlStroke}
				strokeWidth={1.1}
				strokeLinecap="round"
			/>
			<path
				d="M8 26 c-5 -2 -4 -9 2 -9 c3 0 4 3 2 5"
				fill="none"
				stroke={options.curlStroke}
				strokeWidth={1.1}
				strokeLinecap="round"
			/>
		</svg>
	);
};

/** Draws `side` on the left and its mirror image on the right. */
export const mirrored = (side: ReactNode, defs?: ReactNode): JSX.Element => {
	return (
		<svg
			className={styles.root}
			viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
			preserveAspectRatio="xMidYMid meet"
			aria-hidden="true"
		>
			{defs !== undefined && <defs>{defs}</defs>}
			<g data-side="left">{side}</g>
			<g data-side="right" transform={`translate(${VIEW_WIDTH} 0) scale(-1 1)`}>
				{side}
			</g>
		</svg>
	);
};

/** Wraps children in a group that drifts gently sideways. */
export const drift = (children: ReactNode, fast?: boolean): JSX.Element => {
	const className = fast ? `${styles.drift} ${styles.driftFast}` : styles.drift;
	return <g className={className}>{children}</g>;
};
