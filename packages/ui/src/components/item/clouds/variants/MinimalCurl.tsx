import type { JSX } from "react";
import { METAL } from "../../metal/metal";
import { mirrored } from "../cloudParts";

/**
 * The quietest decoration: each end of the line finishes in a single curl
 * with a small diamond.
 */
export const MinimalCurl = (): JSX.Element => {
	const side = (
		<g>
			<path
				d="M110 95 H46 C26 95 18 80 28 72 C37 65 48 72 44 80 C41 86 33 84 34 78"
				fill="none"
				style={{ stroke: METAL.base }}
				strokeWidth={1.5}
				strokeLinecap="round"
			/>
			<polygon points="62,84 66,88 62,92 58,88" style={{ fill: METAL.base }} />
		</g>
	);

	return mirrored(side);
};
