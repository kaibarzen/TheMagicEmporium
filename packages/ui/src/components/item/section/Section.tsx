import type { AppliedModifier } from "@tme/library/src/modifiers/Modifier";
import type { JSX } from "react";
import { ModifierDisplay } from "../../modifiers/ModifierDisplay";
import { METAL, metalVars } from "../metal/metal";
import depth from "../tilt/depth.module.css";
import styles from "./Section.module.css";
import { SectionTier, TIER_LABEL, TIER_METAL } from "./tier";

export interface SectionProps {
	tier: SectionTier;
	modifiers: AppliedModifier[];
}

interface OrnamentProps {
	tier: SectionTier;
	flip: boolean;
}

/** Flanks the title: an empty diamond for mortals, a filled diamond for spirits, a cloud curl for immortals. */
const Ornament = (props: OrnamentProps): JSX.Element => {
	if (props.tier === SectionTier.Mortal) {
		return (
			<svg
				aria-hidden="true"
				width="10"
				height="10"
				viewBox="0 0 10 10"
				data-testid="tier-hollow-diamond"
			>
				<polygon
					points="5,0.8 9.2,5 5,9.2 0.8,5"
					fill="none"
					style={{ stroke: METAL.base }}
					strokeWidth={1.1}
					strokeLinejoin="miter"
				/>
			</svg>
		);
	}

	if (props.tier === SectionTier.Immortal) {
		return (
			<svg
				aria-hidden="true"
				className={props.flip ? styles.flipped : undefined}
				width="22"
				height="12"
				viewBox="0 0 22 12"
				data-testid="tier-cloud"
			>
				<path
					d="M1 8 H8 C5 8 4 5 6 3.5 C8 2 11 3 11 5.5 C11 7.5 8.5 8 8 6.5 M11 5.5 C11.5 2.5 15 1 17.5 2.5 C20.5 4.5 19.5 8 16.5 8 C14.5 8 14 6 15.5 5.5"
					fill="none"
					style={{ stroke: METAL.base }}
					strokeWidth={1.2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}

	return (
		<svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10">
			<polygon points="5,0 10,5 5,10 0,5" style={{ fill: METAL.base }} />
		</svg>
	);
};

export const Section = (props: SectionProps) => {
	if (props.modifiers.length === 0) {
		return null;
	}

	const label = TIER_LABEL[props.tier];

	return (
		<div className={depth.preserve}>
			<div
				className={`${styles.header} ${depth.front}`}
				data-tier={props.tier}
				style={metalVars(TIER_METAL[props.tier])}
			>
				<div className={styles.rule}>
					<div className={styles.ruleLine} />
					<div className={styles.ruleLineFaint} />
				</div>
				<div className={styles.titleWrapper}>
					<Ornament tier={props.tier} flip={false} />
					<div className={styles.titleStack}>
						<span className={styles.kanji} lang="zh">
							{label.kanji}
						</span>
						<span className={styles.title}>{label.title}</span>
					</div>
					<Ornament tier={props.tier} flip={true} />
				</div>
				<div className={styles.rule}>
					<div className={styles.ruleLine} />
					<div className={styles.ruleLineFaint} />
				</div>
			</div>
			{props.modifiers.map((applied, i) => (
				<div key={i} className={`${styles.item} ${depth.preserve}`}>
					{i > 0 && <div className={`${styles.divider} ${depth.front}`} />}
					<ModifierDisplay modifier={applied.modifier} float={applied.float} />
				</div>
			))}
		</div>
	);
};
