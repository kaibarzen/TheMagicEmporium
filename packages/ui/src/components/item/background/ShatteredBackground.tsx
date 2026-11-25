import { type CSSProperties, type JSX, useMemo } from "react";
import styles from "./ShatteredBackground.module.css";
import { MIN_BLUR, shatter } from "./shatter";

/** Seconds for a shard to cycle once through the rainbow; matches the holo animation in the CSS */
const HOLO_CYCLE = 9;

export interface ShatteredBackgroundProps {
	/** URL of the background art */
	image: string;
	/** Decides the crack pattern; the same seed always shatters the same way */
	seed: string;
}

/**
 * Background art seen through broken glass. The card is cut into shards that
 * fit together seamlessly; each one keeps its place but refracts the art
 * behind it (shifted, scaled and turned a little) with its own blur,
 * brightness, sheen and a rainbow foil that cycles through the spectrum out
 * of step with its neighbours. Must be placed inside a positioned container.
 */
export const ShatteredBackground = (
	props: ShatteredBackgroundProps,
): JSX.Element => {
	const glass = useMemo(() => shatter(props.seed), [props.seed]);

	return (
		<div className={styles.root} data-shards={glass.shards.length}>
			{/* Fills the hairlines where neighbouring shards' anti-aliased edges meet */}
			<div
				className={styles.art}
				style={
					{
						backgroundImage: `url(${props.image})`,
						"--blur": `${MIN_BLUR}px`,
						"--brightness": 1,
					} as CSSProperties
				}
			/>
			{glass.shards.map((shard) => (
				<div
					key={shard.clipPath}
					className={styles.shard}
					style={{ clipPath: shard.clipPath }}
				>
					<div
						className={styles.art}
						style={
							{
								backgroundImage: `url(${props.image})`,
								transform: `translate(${shard.refraction.x.toFixed(2)}px, ${shard.refraction.y.toFixed(2)}px) scale(${shard.refraction.scale.toFixed(3)}) rotate(${shard.refraction.rotate.toFixed(2)}deg)`,
								"--blur": `${shard.blur}px`,
								"--brightness": shard.brightness.toFixed(2),
							} as CSSProperties
						}
					/>
					<div
						className={styles.sheen}
						style={
							{
								"--sheen-angle": `${shard.sheen.angle}deg`,
								"--sheen-opacity": shard.sheen.opacity.toFixed(3),
							} as CSSProperties
						}
					/>
					<div
						className={styles.holo}
						style={
							{
								"--holo-angle": `${shard.holo.angle}deg`,
								"--holo-hue": `${shard.holo.hue}deg`,
								// Start part-way through the cycle, so neighbours never match
								animationDelay: `${(-(shard.holo.hue / 360) * HOLO_CYCLE).toFixed(2)}s`,
								"--holo-opacity": shard.holo.opacity.toFixed(3),
							} as CSSProperties
						}
					/>
				</div>
			))}
		</div>
	);
};
