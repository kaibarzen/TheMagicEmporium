import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { equipmentDetails } from "@tme/library/src/item/equipment/equipment.details";
import { animate } from "animejs";
import { motion } from "framer-motion";
import { type CSSProperties, useEffect, useMemo, useRef } from "react";
import { getCutoutUrl } from "./breakout/cutoutUrl";
import { ItemBreakout } from "./breakout/ItemBreakout";
import { useImageExists } from "./breakout/useImageExists";
import { CardCorners, DEFAULT_CORNER_VARIANT } from "./corners/CardCorners";
import { CardFooter } from "./footer/CardFooter";
import { Header, RARITY_COLOR } from "./header/Header";
import styles from "./ItemDisplay.module.css";
import { Section } from "./section/Section";
import { Sparkles } from "./sparkles/Sparkles";

export interface ItemDisplayProps {
	item: AbstractItem;
	hideFrame?: boolean;
}

export const ItemDisplay = (props: ItemDisplayProps) => {
	const rarityColor = RARITY_COLOR[props.item.rarity];
	const rarityStyle = { "--rarity-color": rarityColor } as CSSProperties;
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
			style={rarityStyle}
		>
			{hasCutout && (
				<ItemBreakout
					src={cutoutUrl}
					alt={props.item.name}
					rarityColor={rarityColor}
				/>
			)}
			<div ref={cardRef} className={styles.card}>
				{background}
				{sparkles.enabled && <Sparkles amount={sparkles.amount} />}
				<CardCorners variant={DEFAULT_CORNER_VARIANT} />
				<Header
					name={props.item.name}
					rarity={props.item.rarity}
					base={props.item.base}
					currency={props.item.currency}
				/>
				<Section kanji="凡" title="FAN" modifiers={props.item.primary} />
				<Section kanji="灵" title="LING" modifiers={props.item.secondary} />
				<Section kanji="仙" title="XIAN" modifiers={props.item.tertiary} />
				<CardFooter rarityColor={rarityColor} />
			</div>
		</motion.div>
	);

	if (props.hideFrame) {
		return card;
	}

	return (
		<div className={styles.frame} style={rarityStyle}>
			<div className={styles.aura} aria-hidden="true" />
			{card}
		</div>
	);
};
