import type { CSSProperties, JSX } from "react";
import styles from "./ModifierMark.module.css";

export interface ModifierMarkProps {
	/** Single character naming the modifier type, e.g. 进 for linear */
	kanji: string;
	/** Modifier type colour, used for the character and its trail */
	color: string;
}

/**
 * Brush-written character heading a glowing trail in the modifier type's colour.
 * Fills the height of its grid cell so the trail runs alongside the modifier text.
 */
export const ModifierMark = (props: ModifierMarkProps): JSX.Element => {
	return (
		<div
			className={styles.mark}
			style={{ "--mark-color": props.color } as CSSProperties}
			aria-hidden="true"
		>
			<span className={styles.kanji} lang="zh">
				{props.kanji}
			</span>
			<div className={styles.trail} />
		</div>
	);
};
