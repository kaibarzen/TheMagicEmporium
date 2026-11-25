import type { JSX, ReactElement } from "react";
import { METAL } from "../../metal/metal";
import styles from "../CardCorners.module.css";
import { CornerDetail } from "../cornerDetail";
import { fourCorners } from "../cornerParts";

export interface FretCornersProps {
	/** How much of the fret is drawn; the full fret when omitted */
	detail?: CornerDetail;
}

const DETAIL_RANK: Record<CornerDetail, number> = {
	[CornerDetail.Bracket]: 0,
	[CornerDetail.Stud]: 1,
	[CornerDetail.Full]: 2,
	[CornerDetail.Ornate]: 3,
};

/**
 * Fret corners (回纹): the square interlocking key pattern from window
 * lattices and bronze vessels, folded into each corner of the card. Built up
 * in layers, so plainer items get a bare bracket and the grandest get
 * the full fret with extra flourishes.
 */
export const FretCorners = (props: FretCornersProps): JSX.Element => {
	const rank = DETAIL_RANK[props.detail ?? CornerDetail.Full];
	const layers: ReactElement[] = [];

	layers.push(
		<path key="bracket" d="M5 46 V5 H46" strokeWidth={1.6} fill="none" />,
	);

	if (rank >= DETAIL_RANK[CornerDetail.Full]) {
		layers.push(
			<path key="fret" d="M10 40 V10 H34 V26 H18 V18 H26" fill="none" />,
			<path key="ticks" d="M46 10 H40 M10 46 V40" fill="none" opacity={0.6} />,
		);
	}

	if (rank >= DETAIL_RANK[CornerDetail.Ornate]) {
		layers.push(
			<path
				key="outer"
				d="M0 24 V0 H24"
				fill="none"
				strokeWidth={1}
				opacity={0.55}
			/>,
			<polygon
				key="arm-top"
				points="46,2 49,5 46,8 43,5"
				style={{ fill: METAL.hi }}
				stroke="none"
			/>,
			<polygon
				key="arm-left"
				points="5,43 8,46 5,49 2,46"
				style={{ fill: METAL.hi }}
				stroke="none"
			/>,
		);
	}

	if (rank >= DETAIL_RANK[CornerDetail.Stud]) {
		layers.push(
			<rect
				key="stud"
				x={2.5}
				y={2.5}
				width={5}
				height={5}
				style={{ fill: METAL.base }}
				stroke="none"
			/>,
		);
	}

	const drawing = (
		<g
			data-detail={props.detail ?? CornerDetail.Full}
			style={{ stroke: METAL.base }}
			strokeWidth={1.4}
			strokeLinecap="square"
			strokeLinejoin="miter"
		>
			{layers}
		</g>
	);

	const className =
		rank >= DETAIL_RANK[CornerDetail.Ornate] ? styles.ember : undefined;

	return fourCorners(drawing, undefined, className);
};
