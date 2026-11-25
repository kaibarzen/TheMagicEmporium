import { type CSSProperties, type JSX, useMemo } from "react";
import styles from "./GlitchBackground.module.css";
import { glitchSlices } from "./glitch";

export interface GlitchBackgroundProps {
	/** URL of the background art */
	image: string;
	/** Decides which bands glitch; the same seed always glitches the same way */
	seed: string;
}

/**
 * Background art breaking up like a corrupted signal: the red channel slips
 * away from the green and blue, bands of the art jolt sideways now and then,
 * and faint scanlines run over it all. Must be placed inside a positioned
 * container.
 */
export const GlitchBackground = (props: GlitchBackgroundProps): JSX.Element => {
	const slices = useMemo(() => glitchSlices(props.seed), [props.seed]);
	const art = { backgroundImage: `url(${props.image})` } as CSSProperties;

	return (
		<div className={styles.root}>
			{/* Green and blue channels in place */}
			<div className={`${styles.channel} ${styles.cyan}`}>
				<div className={styles.art} style={art} />
			</div>
			{/* Red channel, slipped sideways and screened back over them */}
			<div className={`${styles.channel} ${styles.red}`}>
				<div className={styles.art} style={art} />
			</div>
			{slices.map((slice) => (
				<div
					key={`${slice.top}-${slice.bottom}`}
					className={styles.slice}
					data-slice=""
					style={
						{
							clipPath: `inset(${slice.top.toFixed(2)}% 0 ${slice.bottom.toFixed(2)}% 0)`,
							"--shift": `${slice.shift.toFixed(1)}px`,
							animationDuration: `${slice.duration.toFixed(2)}s`,
							animationDelay: `${slice.delay.toFixed(2)}s`,
						} as CSSProperties
					}
				>
					<div className={styles.art} style={art} />
				</div>
			))}
			<div className={styles.scanlines} />
		</div>
	);
};
