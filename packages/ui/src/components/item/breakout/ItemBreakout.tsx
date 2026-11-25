import type { CSSProperties, JSX } from "react";
import {
	CloudDecoration,
	type CloudVariant,
	DEFAULT_CLOUD_VARIANT,
} from "../clouds/CloudDecoration";
import styles from "./ItemBreakout.module.css";

export interface ItemBreakoutProps {
	/** URL of the item's transparent cut-out, cut off along its bottom edge */
	src: string;
	alt: string;
	/** Rarity colour for the glow behind the item and the ember clouds */
	rarityColor: string;
	cloudVariant?: CloudVariant;
}

/**
 * Item art that breaks out above the top of the card. The cut-out's bottom
 * edge rests on a golden line, with a mirrored cloud decoration on both ends.
 */
export const ItemBreakout = (props: ItemBreakoutProps): JSX.Element => {
	const variant = props.cloudVariant ?? DEFAULT_CLOUD_VARIANT;

	return (
		<div
			className={styles.root}
			style={{ "--rarity-color": props.rarityColor } as CSSProperties}
		>
			<div className={styles.halo} />
			<img className={styles.item} src={props.src} alt={props.alt} />
			<div className={styles.baseline} aria-hidden="true">
				<div className={styles.baselineLine} />
				<div className={styles.baselineFaint} />
			</div>
			<div className={styles.clouds}>
				<CloudDecoration variant={variant} rarityColor={props.rarityColor} />
			</div>
		</div>
	);
};
