import { Rarity } from "@tme/library/src/item/item.types";
import type { JSX, ReactNode } from "react";
import { metalStyle } from "../metal/metal";

export interface CloudStoryFrameProps {
	children: ReactNode;
	/** Metal of the line and decoration; gold when omitted */
	rarity?: Rarity;
}

/**
 * Story-only backdrop: a dark card strip with the golden line the cloud
 * decorations rest on.
 */
export const CloudStoryFrame = (props: CloudStoryFrameProps): JSX.Element => {
	return (
		<div
			style={{
				...metalStyle(props.rarity ?? Rarity.VeryRare),
				position: "relative",
				width: "488px",
				padding: "24px 0",
				background: "linear-gradient(180deg, #0e1124 0%, #07091a 100%)",
			}}
		>
			{props.children}
			<div
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: "24px",
					height: "1.5px",
					background:
						"linear-gradient(90deg, transparent, var(--metal-dim) 18%, var(--metal-hi) 50%, var(--metal-dim) 82%, transparent)",
					boxShadow:
						"0 0 8px color-mix(in srgb, var(--metal-hi) 35%, transparent)",
				}}
			/>
		</div>
	);
};
