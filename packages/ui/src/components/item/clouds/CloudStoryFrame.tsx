import type { JSX, ReactNode } from "react";

export interface CloudStoryFrameProps {
	children: ReactNode;
}

/**
 * Story-only backdrop: a dark card strip with the golden line the cloud
 * decorations rest on.
 */
export const CloudStoryFrame = (props: CloudStoryFrameProps): JSX.Element => {
	return (
		<div
			style={{
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
						"linear-gradient(90deg, rgba(212, 166, 74, 0), #8a6a2c 18%, #e8c87a 50%, #8a6a2c 82%, rgba(212, 166, 74, 0))",
					boxShadow: "0 0 8px rgba(232, 200, 122, 0.35)",
				}}
			/>
		</div>
	);
};
