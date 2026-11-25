import type { JSX } from "react";
import { GOLD } from "../../clouds/cloudParts";
import { fourCorners } from "../cornerParts";

/**
 * Fret corners (回纹): the square interlocking key pattern from window
 * lattices and bronze vessels, folded into each corner of the card.
 */
export const FretCorners = (): JSX.Element => {
	const drawing = (
		<g>
			<g
				fill="none"
				stroke={GOLD}
				strokeWidth={1.4}
				strokeLinecap="square"
				strokeLinejoin="miter"
			>
				<path d="M5 46 V5 H46" strokeWidth={1.6} />
				<path d="M10 40 V10 H34 V26 H18 V18 H26" />
				<path d="M46 10 H40 M10 46 V40" opacity={0.6} />
			</g>
			<rect x={2.5} y={2.5} width={5} height={5} fill={GOLD} />
		</g>
	);

	return fourCorners(drawing);
};
