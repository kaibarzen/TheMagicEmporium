import { type JSX, useId } from "react";
import { cloudShape, drift, mirrored, svgId } from "../cloudParts";

export interface EmberCloudsProps {
	/** Tint for the clouds, usually the item's rarity colour */
	color: string;
}

/**
 * The puffy clouds tinted with a colour, so the decoration can signal rarity.
 */
export const EmberClouds = (props: EmberCloudsProps): JSX.Element => {
	const fillId = svgId(useId(), "ember");
	const fill = `url(#${fillId})`;
	const underlay = "#120a14";

	const defs = (
		<linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stopColor={props.color} stopOpacity={0.55} />
			<stop offset="100%" stopColor={props.color} stopOpacity={0.15} />
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
			underlay,
			stroke: props.color,
			curlStroke: props.color,
			opacity: 0.7,
		}),
		cloudShape({
			key: "large",
			x: -6,
			y: 44,
			width: 130,
			height: 50,
			fill,
			underlay,
			stroke: props.color,
			curlStroke: props.color,
		}),
		cloudShape({
			key: "small",
			x: 58,
			y: 58,
			width: 96,
			height: 37,
			fill,
			underlay,
			stroke: props.color,
			curlStroke: props.color,
		}),
	]);

	return mirrored(side, defs);
};
