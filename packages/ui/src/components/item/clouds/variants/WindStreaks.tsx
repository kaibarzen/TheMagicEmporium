import type { JSX } from "react";
import { METAL } from "../../metal/metal";
import { drift, mirrored } from "../cloudParts";

/**
 * Thin drifting lines ending in small curls, like wind or mist trailing past
 * the item.
 */
export const WindStreaks = (): JSX.Element => {
	const side = (
		<g fill="none" style={{ stroke: METAL.base }} strokeLinecap="round">
			{drift(
				<path
					d="M0 88 H86 c9 0 11 -9 4 -11 c-5 -1 -7 4 -3 6"
					strokeWidth={1.3}
				/>,
			)}
			{drift(
				<path
					d="M22 76 H104 c8 0 10 -8 4 -10 c-4 -1 -6 3 -3 5"
					strokeWidth={1.1}
					opacity={0.8}
				/>,
				true,
			)}
			{drift(
				<path
					d="M6 64 H66 c7 0 8 -7 3 -8 c-4 -1 -5 3 -2 4"
					strokeWidth={1}
					opacity={0.6}
				/>,
			)}
			{drift(
				<path d="M40 52 H84 c6 0 7 -6 2 -7" strokeWidth={0.9} opacity={0.4} />,
				true,
			)}
		</g>
	);

	return mirrored(side);
};
