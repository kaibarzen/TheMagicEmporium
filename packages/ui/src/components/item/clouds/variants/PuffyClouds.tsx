import { type JSX, useId } from "react";
import { METAL } from "../../metal/metal";
import { cloudShape, drift, mirrored, svgId } from "../cloudParts";

/**
 * Filled navy clouds with gold outlines and curls, three per side.
 */
export const PuffyClouds = (): JSX.Element => {
	const fillId = svgId(useId(), "fill");
	const fill = `url(#${fillId})`;

	const defs = (
		<linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stopColor="#1a1f42" />
			<stop offset="100%" stopColor="#0b0d22" />
		</linearGradient>
	);

	const side = drift([
		cloudShape({
			key: "back",
			x: 18,
			y: 20,
			width: 84,
			height: 32,
			fill,
			stroke: METAL.base,
			curlStroke: METAL.base,
			opacity: 0.75,
		}),
		cloudShape({
			key: "large",
			x: -6,
			y: 44,
			width: 130,
			height: 50,
			fill,
			stroke: METAL.base,
			curlStroke: METAL.base,
		}),
		cloudShape({
			key: "small",
			x: 58,
			y: 58,
			width: 96,
			height: 37,
			fill,
			stroke: METAL.base,
			curlStroke: METAL.base,
		}),
	]);

	return mirrored(side, defs);
};
