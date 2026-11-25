import type { CSSProperties, ReactElement } from "react";
import { METAL } from "../metal/metal";
import styles from "./CardFooter.module.css";

export interface CardFooterProps {
	rarityColor: string;
}

const WIDTH = 220;
const CENTER = WIDTH / 2;

/**
 * Closing ornament at the foot of the item card: tapered rules meeting in a
 * rarity seal, so the card ends on a deliberate flourish rather than empty space.
 */
export const CardFooter = (props: CardFooterProps): ReactElement => {
	const style = { "--rarity-color": props.rarityColor } as CSSProperties;

	return (
		<div className={styles.root} style={style} data-testid="card-footer">
			<svg
				aria-hidden="true"
				width={WIDTH}
				height="18"
				viewBox={`0 0 ${WIDTH} 18`}
			>
				<defs>
					<linearGradient
						id="card-footer-left"
						gradientUnits="userSpaceOnUse"
						x1="0"
						x2={CENTER - 26}
					>
						<stop
							offset="0"
							style={{ stopColor: METAL.base }}
							stopOpacity="0"
						/>
						<stop
							offset="1"
							style={{ stopColor: METAL.base }}
							stopOpacity="0.8"
						/>
					</linearGradient>
					<linearGradient
						id="card-footer-right"
						gradientUnits="userSpaceOnUse"
						x1={CENTER + 26}
						x2={WIDTH}
					>
						<stop
							offset="0"
							style={{ stopColor: METAL.base }}
							stopOpacity="0.8"
						/>
						<stop
							offset="1"
							style={{ stopColor: METAL.base }}
							stopOpacity="0"
						/>
					</linearGradient>
				</defs>
				<path
					d={`M0 9 H${CENTER - 26}`}
					stroke="url(#card-footer-left)"
					strokeWidth="1"
				/>
				<path
					d={`M${CENTER + 26} 9 H${WIDTH}`}
					stroke="url(#card-footer-right)"
					strokeWidth="1"
				/>
				<path
					d={`M${CENTER - 20} 9 l3 -3 l3 3 l-3 3 Z`}
					style={{ fill: METAL.base }}
					opacity="0.7"
				/>
				<path
					d={`M${CENTER + 14} 9 l3 -3 l3 3 l-3 3 Z`}
					style={{ fill: METAL.base }}
					opacity="0.7"
				/>
				<path
					d={`M${CENTER} 1 L${CENTER + 8} 9 L${CENTER} 17 L${CENTER - 8} 9 Z`}
					fill="#07091a"
					style={{ stroke: METAL.base }}
					strokeWidth="1"
				/>
				<path
					className={styles.seal}
					d={`M${CENTER} 5 L${CENTER + 4} 9 L${CENTER} 13 L${CENTER - 4} 9 Z`}
					fill={props.rarityColor}
				/>
			</svg>
		</div>
	);
};
