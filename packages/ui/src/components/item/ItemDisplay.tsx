import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { equipmentDetails } from "@tme/library/src/item/equipment/equipment.details";
import { animate } from "animejs";
import { motion } from "framer-motion";
import { type CSSProperties, useEffect, useMemo, useRef } from "react";
import { getCutoutUrl } from "./breakout/cutoutUrl";
import { ItemBreakout } from "./breakout/ItemBreakout";
import { useImageExists } from "./breakout/useImageExists";
import { Header, RARITY_COLOR } from "./header/Header";
import styles from "./ItemDisplay.module.css";
import { Section } from "./section/Section";
import { Sparkles } from "./sparkles/Sparkles";

export interface ItemDisplayProps {
	item: AbstractItem;
	hideFrame?: boolean;
}

interface CornerProps {
	rotation: number;
	className: string;
}

const Corner = (props: CornerProps) => (
	<svg
		width="72"
		height="72"
		viewBox="0 0 64 64"
		aria-hidden="true"
		className={`${styles.corner} ${props.className}`}
		style={{ "--rotation": `${props.rotation}deg` } as CSSProperties}
	>
		<path
			d="M2 26 L2 2 L26 2"
			stroke="#d4a64a"
			fill="none"
			strokeWidth="1.3"
			strokeLinecap="round"
		/>
		<path
			d="M7 19 L7 7 L19 7"
			stroke="#d4a64a"
			fill="none"
			strokeWidth="0.7"
			opacity="0.6"
		/>
		<path
			d="M2 38 Q 8 36 12 30 Q 14 26 20 24 L 28 22"
			stroke="#d4a64a"
			fill="none"
			strokeWidth="0.9"
			opacity="0.7"
		/>
		<path
			d="M38 2 Q 36 8 30 12 Q 26 14 24 20 L 22 28"
			stroke="#d4a64a"
			fill="none"
			strokeWidth="0.9"
			opacity="0.7"
		/>
		<circle
			cx="2"
			cy="2"
			r="2"
			fill="none"
			stroke="#f3dca0"
			strokeWidth="0.7"
		/>
		<circle cx="2" cy="2" r="0.8" fill="#f3dca0" />
		<circle
			cx="13"
			cy="13"
			r="1.6"
			fill="none"
			stroke="#d4a64a"
			strokeWidth="0.6"
		/>
		<polygon points="22,2 24,4 22,6 20,4" fill="#d4a64a" opacity="0.9" />
		<polygon points="2,22 4,20 6,22 4,24" fill="#d4a64a" opacity="0.9" />
	</svg>
);

export const ItemDisplay = (props: ItemDisplayProps) => {
	const sparkles = props.item.getSparkles();
	const cardRef = useRef<HTMLDivElement | null>(null);

	// Item art only shows when a *.cutout.png exists next to the base item's icon
	const cutoutUrl = getCutoutUrl(equipmentDetails[props.item.base].icon);
	const hasCutout = useImageExists(cutoutUrl);

	// Clip-path Iris reveal
	useEffect(() => {
		if (!sparkles.enabled || !cardRef.current) return;
		const anim = animate(cardRef.current, {
			clipPath: ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"],
			scale: [0.94, 1],
			duration: 1100,
			ease: "outQuart",
		});
		return () => {
			anim.pause();
		};
	}, [sparkles.enabled]);

	const background = useMemo(() => {
		const bg = props.item.getBackground();
		if (!bg) return null;

		return (
			<div
				className={styles.background}
				style={{ backgroundImage: `url(${bg})` }}
			>
				<div className={styles.backgroundFilter} />
			</div>
		);
	}, [props.item]);

	const card = (
		<motion.div
			key={props.item.name}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			className={hasCutout ? styles.withArt : undefined}
		>
			<div ref={cardRef} className={styles.card}>
				{background}
				{sparkles.enabled && <Sparkles amount={sparkles.amount} />}
				<Corner rotation={0} className={styles.cornerTL} />
				<Corner rotation={90} className={styles.cornerTR} />
				<Corner rotation={180} className={styles.cornerBR} />
				<Corner rotation={270} className={styles.cornerBL} />
				{hasCutout && (
					<ItemBreakout
						src={cutoutUrl}
						alt={props.item.name}
						rarityColor={RARITY_COLOR[props.item.rarity]}
					/>
				)}
				<Header
					name={props.item.name}
					rarity={props.item.rarity}
					base={props.item.base}
					currency={props.item.currency}
				/>
				<Section kanji="凡" title="FAN" modifiers={props.item.primary} />
				<Section kanji="灵" title="LING" modifiers={props.item.secondary} />
				<Section kanji="仙" title="XIAN" modifiers={props.item.tertiary} />
			</div>
		</motion.div>
	);

	if (props.hideFrame) {
		return card;
	}

	return (
		<div
			className={styles.frame}
			style={
				{ "--rarity-color": RARITY_COLOR[props.item.rarity] } as CSSProperties
			}
		>
			<div className={styles.aura} aria-hidden="true" />
			{card}
		</div>
	);
};
