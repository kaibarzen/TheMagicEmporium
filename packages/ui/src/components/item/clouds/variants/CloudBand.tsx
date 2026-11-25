import { type JSX, useId } from "react";
import { METAL } from "../../metal/metal";
import { drift, mirrored, svgId } from "../cloudParts";

/**
 * Stacked half-round lobes with concentric lines, like the cloud bands on
 * temple carvings and porcelain.
 */
export const CloudBand = (): JSX.Element => {
	const fillId = svgId(useId(), "band");
	const fill = `url(#${fillId})`;

	const defs = (
		<linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stopColor="#1a1f42" />
			<stop offset="100%" stopColor="#0b0d22" />
		</linearGradient>
	);

	const side = (
		<g style={{ stroke: METAL.base }} strokeWidth={1.2}>
			{drift([
				<path
					key="back"
					d="M52 79 A20 20 0 0 1 92 79"
					fill={fill}
					opacity={0.9}
				/>,
				<path key="large" d="M-6 95 A30 30 0 0 1 54 95 Z" fill={fill} />,
				<path
					key="large-rings"
					d="M4 95 A20 20 0 0 1 44 95 M14 95 A10 10 0 0 1 34 95"
					fill="none"
					opacity={0.6}
				/>,
				<path key="mid" d="M46 95 A22 22 0 0 1 90 95 Z" fill={fill} />,
				<path
					key="mid-ring"
					d="M54 95 A14 14 0 0 1 82 95"
					fill="none"
					opacity={0.6}
				/>,
				<path key="small" d="M86 95 A14 14 0 0 1 114 95 Z" fill={fill} />,
				<path
					key="small-ring"
					d="M92 95 A8 8 0 0 1 108 95"
					fill="none"
					opacity={0.6}
				/>,
			])}
		</g>
	);

	return mirrored(side, defs);
};
