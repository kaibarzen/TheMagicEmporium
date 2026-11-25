import { type JSX, type ReactNode, useId } from "react";
import { REDUCED_MOTION_QUERY } from "../tilt/tilt";
import styles from "./WobbleBackground.module.css";

export interface WobbleBackgroundProps {
	/** The art to wobble; it should overhang the container so the warp never pulls in an empty edge */
	children: ReactNode;
}

/**
 * Background art that wobbles like something alive: slow noise churns
 * through it and warps it like jelly, the warp swells and settles as if
 * breathing, and the colours drift faintly off true. Must be placed inside
 * a positioned container. When the viewer prefers reduced motion the art
 * keeps a still warp.
 */
export const WobbleBackground = (props: WobbleBackgroundProps): JSX.Element => {
	// useId contains characters that break url(#…) references
	const filterId = `wobble-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
	const still = window.matchMedia(REDUCED_MOTION_QUERY).matches;

	return (
		<div className={styles.root} data-wobble="">
			<svg
				className={styles.filterDefs}
				width="0"
				height="0"
				aria-hidden="true"
			>
				<filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.006 0.009"
						numOctaves={2}
						seed={3}
					>
						{!still && (
							<animate
								attributeName="baseFrequency"
								dur="16s"
								values="0.006 0.009;0.009 0.006;0.007 0.011;0.006 0.009"
								repeatCount="indefinite"
							/>
						)}
					</feTurbulence>
					<feDisplacementMap
						in="SourceGraphic"
						scale={24}
						xChannelSelector="R"
						yChannelSelector="B"
					>
						{!still && (
							<animate
								attributeName="scale"
								dur="7s"
								values="16;30;20;16"
								keyTimes="0;0.45;0.75;1"
								calcMode="spline"
								keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
								repeatCount="indefinite"
							/>
						)}
					</feDisplacementMap>
				</filter>
			</svg>
			<div className={styles.tint}>
				<div className={styles.warp} style={{ filter: `url(#${filterId})` }}>
					{props.children}
				</div>
			</div>
		</div>
	);
};
