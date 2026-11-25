import { Rarity } from "@tme/library/src/item/item.types";
import type { JSX, ReactNode } from "react";
import { metalStyle } from "../metal/metal";

export interface CornerStoryFrameProps {
	children: ReactNode;
	/** Metal of the card and its corners; gold when omitted */
	rarity?: Rarity;
}

/**
 * Story-only backdrop: an empty item card for the corner ornaments to sit on.
 */
export const CornerStoryFrame = (props: CornerStoryFrameProps): JSX.Element => {
	return (
		<div
			style={{
				...metalStyle(props.rarity ?? Rarity.VeryRare),
				padding: "24px",
				background: "#040510",
			}}
		>
			<div
				style={{
					position: "relative",
					width: "460px",
					height: "220px",
					borderRadius: "4px",
					background: "linear-gradient(180deg, #0e1124 0%, #07091a 100%)",
					boxShadow:
						"inset 0 0 0 1px color-mix(in srgb, var(--metal) 35%, transparent), inset 0 0 60px color-mix(in srgb, var(--metal) 6%, transparent)",
				}}
			>
				{props.children}
			</div>
		</div>
	);
};
