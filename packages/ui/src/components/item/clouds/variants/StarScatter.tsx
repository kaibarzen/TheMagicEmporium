import type { JSX } from "react";
import { METAL } from "../../metal/metal";
import styles from "../CloudDecoration.module.css";
import { GROW_ON_LINE, mirrored } from "../cloudParts";

interface StarOptions {
	key: string;
	cx: number;
	cy: number;
	/** Distance from the centre to each point */
	r: number;
	fill: string;
	/** Offset into the twinkle cycle (s), so the stars do not pulse in step */
	delay: number;
}

/** A four-pointed sparkle whose sides curve in toward the centre */
const star = (options: StarOptions): JSX.Element => {
	const cx = options.cx;
	const cy = options.cy;
	const r = options.r;
	const d = [
		`M${cx} ${cy - r}`,
		`Q${cx} ${cy} ${cx + r} ${cy}`,
		`Q${cx} ${cy} ${cx} ${cy + r}`,
		`Q${cx} ${cy} ${cx - r} ${cy}`,
		`Q${cx} ${cy} ${cx} ${cy - r}`,
		"Z",
	].join(" ");
	return (
		<path
			key={options.key}
			d={d}
			className={styles.twinkle}
			style={{ fill: options.fill, animationDelay: `${options.delay}s` }}
		/>
	);
};

/**
 * Four-pointed stars scattered above the line, joined by faint constellation
 * lines, twinkling out of step with each other.
 */
export const StarScatter = (): JSX.Element => {
	const side = (
		<g transform={GROW_ON_LINE}>
			<path
				d="M32 72 L70 50 L96 76 M70 50 L20 38"
				fill="none"
				style={{ stroke: METAL.dim }}
				strokeWidth={0.8}
				strokeDasharray="2 3"
				opacity={0.6}
			/>
			{star({
				key: "large",
				cx: 32,
				cy: 72,
				r: 17,
				fill: METAL.pale,
				delay: 0,
			})}
			{star({
				key: "medium",
				cx: 70,
				cy: 50,
				r: 9,
				fill: METAL.hi,
				delay: 1.4,
			})}
			{star({ key: "small", cx: 96, cy: 76, r: 6, fill: METAL.hi, delay: 0.7 })}
			{star({
				key: "far",
				cx: 20,
				cy: 38,
				r: 4.5,
				fill: METAL.base,
				delay: 2.1,
			})}
			{star({
				key: "low",
				cx: 118,
				cy: 88,
				r: 3.5,
				fill: METAL.base,
				delay: 1.8,
			})}
			<g style={{ fill: METAL.hi }}>
				<circle cx={52} cy={84} r={1.2} opacity={0.7} />
				<circle cx={86} cy={34} r={1} opacity={0.5} />
				<circle cx={8} cy={60} r={1} opacity={0.5} />
				<circle cx={112} cy={60} r={0.9} opacity={0.4} />
			</g>
		</g>
	);

	return mirrored(side);
};
