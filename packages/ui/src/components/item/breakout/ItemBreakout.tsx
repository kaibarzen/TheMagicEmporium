import type { CSSProperties, JSX } from "react";
import {
	CloudDecoration,
	type CloudVariant,
	DEFAULT_CLOUD_VARIANT,
} from "../clouds/CloudDecoration";
import depth from "../tilt/depth.module.css";
import styles from "./ItemBreakout.module.css";

export interface ItemBreakoutProps {
	/** URL of the item's transparent cut-out, cut off along its bottom edge */
	src: string;
	alt: string;
	/** Rarity colour for the glow behind the item */
	rarityColor: string;
	/** Cloud design on the golden line; null leaves the line bare */
	cloudVariant?: CloudVariant | null;
}

/**
 * Item art that breaks out above the top of the card. The cut-out's bottom
 * edge rests on a golden line, with a mirrored cloud decoration on both ends.
 * Only shown for items that have header art.
 */
export const ItemBreakout = (props: ItemBreakoutProps): JSX.Element => {
	const variant =
		props.cloudVariant === undefined
			? DEFAULT_CLOUD_VARIANT
			: props.cloudVariant;

	return (
		<div
			className={`${styles.root} ${depth.front}`}
			style={{ "--rarity-color": props.rarityColor } as CSSProperties}
		>
			<div className={styles.halo} />
			<img className={styles.item} src={props.src} alt={props.alt} />
			<div className={styles.baseline} aria-hidden="true">
				<div className={styles.baselineLine} />
				<div className={styles.baselineFaint} />
			</div>
			{variant !== null && (
				<div className={styles.clouds}>
					<CloudDecoration variant={variant} />
				</div>
			)}
		</div>
	);
};
