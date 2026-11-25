import type { JSX, ReactNode } from "react";
import styles from "./CardCorners.module.css";

/**
 * Places an ornament drawn for the top-left corner (48 × 48 view box, with the
 * card's corner at 5, 5) into all four corners of the card. `className` is
 * added to every corner.
 */
export const fourCorners = (
	drawing: ReactNode,
	defs?: ReactNode,
	className?: string,
): JSX.Element => {
	const positions = [
		{ key: "top-left", className: styles.topLeft },
		{ key: "top-right", className: styles.topRight },
		{ key: "bottom-right", className: styles.bottomRight },
		{ key: "bottom-left", className: styles.bottomLeft },
	];

	return (
		<>
			{positions.map((position, index) => (
				<svg
					key={position.key}
					data-corner={position.key}
					className={[styles.corner, position.className, className]
						.filter(Boolean)
						.join(" ")}
					viewBox="0 0 48 48"
					aria-hidden="true"
				>
					{index === 0 && defs !== undefined && <defs>{defs}</defs>}
					{drawing}
				</svg>
			))}
		</>
	);
};
