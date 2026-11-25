import type { JSX } from "react";
import { drift, GOLD, mirrored } from "../cloudParts";

/**
 * Gold line art only: the golden line curls up into spiral cloud scrolls,
 * like a carved ruyi motif.
 */
export const RuyiScrolls = (): JSX.Element => {
	const side = (
		<g fill="none" stroke={GOLD} strokeLinecap="round">
			{drift([
				<path
					key="main"
					d="M118 95 H70 C46 95 36 78 46 66 C55 56 72 60 72 72 C72 81 61 83 57 77 C54 72 58 68 62 69"
					strokeWidth={1.5}
				/>,
				<path
					key="outer"
					d="M70 95 C40 95 18 88 14 72 C11 60 22 52 31 57 C38 61 36 70 30 70 C26 70 25 66 27 64"
					strokeWidth={1.3}
				/>,
				<path
					key="inner"
					d="M96 95 C104 86 112 82 122 84 C130 86 131 94 125 95"
					strokeWidth={1.1}
					opacity={0.8}
				/>,
				<path
					key="wisp"
					d="M30 46 C42 38 58 40 60 50 C61 57 53 59 51 54"
					strokeWidth={1}
					opacity={0.55}
				/>,
			])}
		</g>
	);

	return mirrored(side);
};
