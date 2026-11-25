import type { JSX } from "react";
import { METAL } from "../../metal/metal";
import { drift, GROW_ON_LINE, mirrored } from "../cloudParts";

interface DiamondOptions {
	key: string;
	cx: number;
	cy: number;
	/** Distance from the centre to each point */
	r: number;
	fill: string;
	opacity?: number;
}

const diamond = (options: DiamondOptions): JSX.Element => {
	const points = [
		`${options.cx},${options.cy - options.r}`,
		`${options.cx + options.r},${options.cy}`,
		`${options.cx},${options.cy + options.r}`,
		`${options.cx - options.r},${options.cy}`,
	].join(" ");
	return (
		<polygon
			key={options.key}
			points={points}
			style={{ fill: options.fill }}
			opacity={options.opacity}
		/>
	);
};

/**
 * A trail of diamonds that shrinks toward the item: one large faceted diamond
 * at the outer end, smaller ones stepping along the line, and a few loose
 * diamonds floating above.
 */
export const DiamondTrail = (): JSX.Element => {
	const side = (
		<g transform={GROW_ON_LINE}>
			<path
				d="M48 88 H122"
				fill="none"
				style={{ stroke: METAL.dim }}
				strokeWidth={1}
				strokeLinecap="round"
			/>
			<polygon
				points="30,56 48,74 30,92 12,74"
				fill="none"
				style={{ stroke: METAL.base }}
				strokeWidth={1.4}
				strokeLinejoin="round"
			/>
			<polygon
				points="30,63 41,74 30,85 19,74"
				fill="none"
				style={{ stroke: METAL.dim }}
				strokeWidth={1}
				strokeLinejoin="round"
			/>
			{diamond({ key: "core", cx: 30, cy: 74, r: 4.5, fill: METAL.pale })}
			{diamond({ key: "step-1", cx: 62, cy: 80, r: 7, fill: METAL.base })}
			{diamond({
				key: "step-1-core",
				cx: 62,
				cy: 80,
				r: 2.5,
				fill: METAL.pale,
			})}
			{diamond({
				key: "step-2",
				cx: 86,
				cy: 84,
				r: 4.5,
				fill: METAL.base,
				opacity: 0.85,
			})}
			{diamond({
				key: "step-3",
				cx: 106,
				cy: 87,
				r: 3,
				fill: METAL.base,
				opacity: 0.7,
			})}
			{diamond({
				key: "step-4",
				cx: 122,
				cy: 88,
				r: 2,
				fill: METAL.base,
				opacity: 0.55,
			})}
			{drift([
				diamond({
					key: "float-1",
					cx: 56,
					cy: 58,
					r: 3,
					fill: METAL.hi,
					opacity: 0.7,
				}),
				diamond({
					key: "float-2",
					cx: 80,
					cy: 66,
					r: 2,
					fill: METAL.hi,
					opacity: 0.5,
				}),
				diamond({
					key: "float-3",
					cx: 12,
					cy: 48,
					r: 2.5,
					fill: METAL.hi,
					opacity: 0.45,
				}),
			])}
		</g>
	);

	return mirrored(side);
};
