import { equipmentDetails } from "@tme/library/src/item/equipment/equipment.details";
import type { Equipment } from "@tme/library/src/item/equipment/equipment.types";
import { Rarity } from "@tme/library/src/item/item.types";
import { type CSSProperties, type ReactElement, useMemo } from "react";
import { METAL, metalStyle } from "../metal/metal";
import styles from "./Header.module.css";

export interface HeaderProps {
	name: string;
	rarity: Rarity;
	base: Equipment;
	currency: number;
}

export const RARITY_COLOR: Record<Rarity, string> = {
	[Rarity.Common]: "#9d9d9d",
	[Rarity.Uncommon]: "#4fc978",
	[Rarity.Rare]: "#5b9de8",
	[Rarity.VeryRare]: "#b88ce8",
	[Rarity.Legendary]: "#ee7e3e",
};

const RARITY_SHADOW: Record<Rarity, string> = {
	[Rarity.Common]: "rgba(157,157,157,.4)",
	[Rarity.Uncommon]: "rgba(79,201,120,.4)",
	[Rarity.Rare]: "rgba(91,157,232,.4)",
	[Rarity.VeryRare]: "rgba(184,140,232,.4)",
	[Rarity.Legendary]: "rgba(238,126,62,.4)",
};

/** Background glow behind the header; null means no glow for that rarity. */
const RARITY_HALO: Record<Rarity, string | null> = {
	[Rarity.Common]: null,
	[Rarity.Uncommon]: null,
	[Rarity.Rare]: "rgba(91,157,232,.10)",
	[Rarity.VeryRare]: "rgba(184,140,232,.14)",
	[Rarity.Legendary]: "rgba(238,126,62,.18)",
};

const RARITY_LABEL: Record<Rarity, string> = {
	[Rarity.Common]: "Common",
	[Rarity.Uncommon]: "Uncommon",
	[Rarity.Rare]: "Rare",
	[Rarity.VeryRare]: "Very Rare",
	[Rarity.Legendary]: "Legendary",
};

/** How many diamonds sit in the centre of the divider. */
const RARITY_RANK: Record<Rarity, number> = {
	[Rarity.Common]: 1,
	[Rarity.Uncommon]: 2,
	[Rarity.Rare]: 3,
	[Rarity.VeryRare]: 4,
	[Rarity.Legendary]: 5,
};

/** Extra class for the item name: plain ink at the bottom, gilded at the top. */
const RARITY_NAME_CLASS: Record<Rarity, string | null> = {
	[Rarity.Common]: styles.nameInk,
	[Rarity.Uncommon]: null,
	[Rarity.Rare]: null,
	[Rarity.VeryRare]: styles.nameGilded,
	[Rarity.Legendary]: `${styles.nameGilded} ${styles.nameShimmer}`,
};

const formatCurrency = (gp: number): string =>
	`${gp.toLocaleString("en-US")} gp`;

interface DiamondProps {
	size: number;
	fill: string;
}

const Diamond = (props: DiamondProps): ReactElement => {
	return (
		<svg
			aria-hidden="true"
			width={props.size}
			height={props.size}
			viewBox="0 0 6 6"
		>
			<path d="M3 0 L6 3 L3 6 L0 3 Z" style={{ fill: props.fill }} />
		</svg>
	);
};

const DIVIDER_WIDTH = 180;
const DIVIDER_CENTER = DIVIDER_WIDTH / 2;
/** Half-width of one outlined diamond. */
const PIP_RADIUS = 6;
/** Space between neighbouring diamonds, and between the outer diamonds and the side ornaments. */
const PIP_GAP = 8;
/** Distance between the centres of neighbouring diamonds. */
const PIP_STEP = PIP_RADIUS * 2 + PIP_GAP;

interface DividerProps {
	count: number;
	fill: string;
}

/** Ornamental divider whose centre holds `count` outlined, rarity-filled diamonds. */
const Divider = (props: DividerProps): ReactElement => {
	const halfGroup = PIP_RADIUS + ((props.count - 1) * PIP_STEP) / 2;
	const leftEdge = DIVIDER_CENTER - halfGroup;
	const rightEdge = DIVIDER_CENTER + halfGroup;
	const firstCenter = leftEdge + PIP_RADIUS;

	return (
		<svg
			aria-hidden="true"
			width={DIVIDER_WIDTH}
			height="14"
			viewBox={`0 0 ${DIVIDER_WIDTH} 14`}
		>
			<path
				d={`M6 7 H${leftEdge - PIP_GAP * 2}`}
				style={{ stroke: METAL.lo }}
				strokeWidth="1"
			/>
			<path
				d={`M${rightEdge + PIP_GAP * 2} 7 H${DIVIDER_WIDTH - 6}`}
				style={{ stroke: METAL.lo }}
				strokeWidth="1"
			/>
			<circle cx="3" cy="7" r="1.3" style={{ fill: METAL.lo }} />
			<circle
				cx={DIVIDER_WIDTH - 3}
				cy="7"
				r="1.3"
				style={{ fill: METAL.lo }}
			/>
			<circle
				cx={leftEdge - PIP_GAP}
				cy="7"
				r="1.3"
				style={{ fill: METAL.text }}
			/>
			<circle
				cx={rightEdge + PIP_GAP}
				cy="7"
				r="1.3"
				style={{ fill: METAL.text }}
			/>
			{Array.from({ length: props.count }, (_, index: number): ReactElement => {
				const cx = firstCenter + index * PIP_STEP;
				return (
					<g key={index} data-testid="rarity-pip">
						<path
							d={`M${cx} 1 L${cx + 6} 7 L${cx} 13 L${cx - 6} 7 Z`}
							fill="none"
							style={{ stroke: METAL.text }}
							strokeWidth="1"
						/>
						<path
							d={`M${cx} 4.5 L${cx + 2.5} 7 L${cx} 9.5 L${cx - 2.5} 7 Z`}
							fill={props.fill}
						/>
					</g>
				);
			})}
		</svg>
	);
};

export const Header = (props: HeaderProps): ReactElement => {
	const color = RARITY_COLOR[props.rarity];
	const halo = RARITY_HALO[props.rarity];
	const isLegendary = props.rarity === Rarity.Legendary;

	const strippedName = useMemo((): string => {
		const prefix = RARITY_LABEL[props.rarity];
		return props.name.replace(prefix, "").trim();
	}, [props.name, props.rarity]);

	const nameClass = RARITY_NAME_CLASS[props.rarity];

	const style = {
		...metalStyle(props.rarity),
		"--rarity-color": color,
		"--rarity-shadow": RARITY_SHADOW[props.rarity],
		"--rarity-halo": halo ?? "transparent",
	} as CSSProperties;

	return (
		<div className={styles.root} style={style}>
			<div className={styles.rarityRow}>
				<span className={`${styles.rule} ${styles.ruleLeft}`} />
				<Diamond size={6} fill={color} />
				<span className={styles.rarity}>{RARITY_LABEL[props.rarity]}</span>
				<Diamond size={6} fill={color} />
				<span className={`${styles.rule} ${styles.ruleRight}`} />
			</div>

			<div className={styles.nameWrap}>
				{halo && <div className={styles.halo} aria-hidden="true" />}
				<div
					className={nameClass ? `${styles.name} ${nameClass}` : styles.name}
				>
					{strippedName}
				</div>
			</div>

			<Divider count={RARITY_RANK[props.rarity]} fill={color} />

			<div className={styles.meta}>
				<span className={styles.metaText}>
					{equipmentDetails[props.base].title}
				</span>
				<Diamond size={5} fill={METAL.lo} />
				<span className={styles.price}>
					<svg aria-hidden="true" width="11" height="11" viewBox="0 0 12 12">
						<circle
							cx="6"
							cy="6"
							r="5.3"
							fill="#d4a94a"
							stroke="#8a6a2a"
							strokeWidth="1"
						/>
						<circle
							cx="6"
							cy="6"
							r="3.6"
							fill="none"
							stroke="#a7802f"
							strokeWidth="0.7"
						/>
						<rect x="4.6" y="4.6" width="2.8" height="2.8" fill="#0b0c1a" />
					</svg>
					<span
						className={
							isLegendary
								? `${styles.metaText} ${styles.metaGold}`
								: styles.metaText
						}
					>
						{formatCurrency(props.currency)}
					</span>
				</span>
			</div>
		</div>
	);
};
