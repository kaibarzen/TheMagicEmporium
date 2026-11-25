import type { JSX, ReactNode } from "react";

export interface CornerStoryFrameProps {
	children: ReactNode;
}

/**
 * Story-only backdrop: an empty item card for the corner ornaments to sit on.
 */
export const CornerStoryFrame = (props: CornerStoryFrameProps): JSX.Element => {
	return (
		<div style={{ padding: "24px", background: "#040510" }}>
			<div
				style={{
					position: "relative",
					width: "460px",
					height: "220px",
					borderRadius: "4px",
					background: "linear-gradient(180deg, #0e1124 0%, #07091a 100%)",
					boxShadow:
						"inset 0 0 0 1px rgba(212, 166, 74, 0.35), inset 0 0 60px rgba(212, 166, 74, 0.06)",
				}}
			>
				{props.children}
			</div>
		</div>
	);
};
