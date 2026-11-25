import { type JSX, useId } from "react";
import { svgId } from "../../clouds/cloudParts";
import { METAL } from "../../metal/metal";
import { fourCorners } from "../cornerParts";

/**
 * A metal diamond on each corner with lines fading out along both edges,
 * like the section header rules.
 */
export const DiamondCorners = (): JSX.Element => {
	const reactId = useId();
	const horizontalId = svgId(reactId, "fade-h");
	const verticalId = svgId(reactId, "fade-v");

	const defs = (
		<>
			<linearGradient id={horizontalId} x1="0" y1="0" x2="1" y2="0">
				<stop offset="0%" style={{ stopColor: METAL.hi }} />
				<stop offset="100%" style={{ stopColor: METAL.base }} stopOpacity={0} />
			</linearGradient>
			<linearGradient id={verticalId} x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" style={{ stopColor: METAL.hi }} />
				<stop offset="100%" style={{ stopColor: METAL.base }} stopOpacity={0} />
			</linearGradient>
		</>
	);

	const drawing = (
		<g>
			<rect
				x={9}
				y={4.25}
				width={70}
				height={1.5}
				fill={`url(#${horizontalId})`}
			/>
			<rect
				x={4.25}
				y={9}
				width={1.5}
				height={70}
				fill={`url(#${verticalId})`}
			/>
			<polygon points="5,-1 11,5 5,11 -1,5" style={{ fill: METAL.base }} />
			<polygon points="5,2 8,5 5,8 2,5" style={{ fill: METAL.pale }} />
		</g>
	);

	return fourCorners(drawing, defs);
};
