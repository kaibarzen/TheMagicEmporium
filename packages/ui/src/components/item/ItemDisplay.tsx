import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import type { BackgroundBlur } from "@tme/shared/src/types/itemAppearance";
import { animate } from "animejs";
import { motion } from "framer-motion";
import {
	type CSSProperties,
	type JSX,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { resolveAppearance } from "./appearance/resolveAppearance";
import { GlitchBackground } from "./background/GlitchBackground";
import { ShatteredBackground } from "./background/ShatteredBackground";
import { ItemBreakout } from "./breakout/ItemBreakout";
import { useImageExists } from "./breakout/useImageExists";
import { CardCorners } from "./corners/CardCorners";
import { CardFooter } from "./footer/CardFooter";
import { Header, RARITY_COLOR } from "./header/Header";
import styles from "./ItemDisplay.module.css";
import { metalStyle } from "./metal/metal";
import { Section } from "./section/Section";
import { SectionTier } from "./section/tier";
import { Sparkles } from "./sparkles/Sparkles";
import depth from "./tilt/depth.module.css";
import { useCardTilt } from "./tilt/useCardTilt";

interface BlurStep {
	blur: number;
	/** Distance from the card top (px) where this layer starts fading in */
	fadeStart: number;
	/** Distance from the card top (px) where this layer is fully opaque */
	fadeEnd: number;
}

/**
 * Layers of background art for each blur setting. The first step has no fade,
 * so it is the base layer. PARTIAL is lightest behind the header and strongest
 * behind the modifiers; LIGHT and FULL blur the whole card evenly.
 */
const BACKGROUND_BLUR_STEPS: Record<
	"PARTIAL" | "LIGHT" | "FULL" | "NONE",
	BlurStep[]
> = {
	PARTIAL: [
		{ blur: 1, fadeStart: -1, fadeEnd: 0 },
		{ blur: 2, fadeStart: 80, fadeEnd: 220 },
		{ blur: 4, fadeStart: 160, fadeEnd: 340 },
		{ blur: 8, fadeStart: 260, fadeEnd: 480 },
		{ blur: 16, fadeStart: 380, fadeEnd: 680 },
	],
	LIGHT: [{ blur: 4, fadeStart: -1, fadeEnd: 0 }],
	FULL: [{ blur: 16, fadeStart: -1, fadeEnd: 0 }],
	NONE: [{ blur: 0, fadeStart: -1, fadeEnd: 0 }],
};

const blurLayers = (steps: BlurStep[], image: string): JSX.Element[] => {
	return steps.map((step) => (
		<div
			key={step.blur}
			className={styles.backgroundLayer}
			style={
				{
					backgroundImage: `url(${image})`,
					"--blur": `${step.blur}px`,
					"--fade-start": `${step.fadeStart}px`,
					"--fade-end": `${step.fadeEnd}px`,
				} as CSSProperties
			}
		/>
	));
};

/** The background art in the given treatment; `seed` keeps seeded patterns stable per item */
const backgroundArt = (
	blur: BackgroundBlur,
	image: string,
	seed: string,
): JSX.Element | JSX.Element[] => {
	switch (blur) {
		case "SHATTERED":
			return <ShatteredBackground image={image} seed={seed} />;
		case "PARALLAX":
			// Reads --tilt-x/--tilt-y, which the pointer tracking writes on the tilt surface
			return (
				<div className={styles.parallax}>
					{blurLayers(BACKGROUND_BLUR_STEPS.PARTIAL, image)}
				</div>
			);
		case "GLITCH":
			return <GlitchBackground image={image} seed={seed} />;
		default:
			return blurLayers(BACKGROUND_BLUR_STEPS[blur], image);
	}
};

export interface ItemDisplayProps {
	item: AbstractItem;
	hideFrame?: boolean;
}

export const ItemDisplay = (props: ItemDisplayProps) => {
	const rarityColor = RARITY_COLOR[props.item.rarity];
	// The rarity colour is the accent; the metal (iron, bronze, silver, gold) is the structure
	const rarityStyle = {
		...metalStyle(props.item.rarity),
		"--rarity-color": rarityColor,
	} as CSSProperties;
	const appearance = useMemo(() => resolveAppearance(props.item), [props.item]);
	const sparkles = appearance.effects.sparkles;
	const reveal = appearance.effects.reveal;
	const cardRef = useRef<HTMLDivElement | null>(null);
	const tiltRef = useRef<HTMLDivElement | null>(null);
	const glintRef = useRef<HTMLDivElement | null>(null);

	// Tilting cards tip toward the cursor; gleaming cards catch a light sweep
	const tilt = appearance.effects.tilt;
	const tilts = tilt !== "NONE";
	const sweeps = appearance.effects.gleam === "SWEEP";
	// A parallax background follows the pointer too, even on a card that does not tilt
	const parallax = appearance.background.blur === "PARALLAX";
	useCardTilt(tilts || parallax, sweeps, tiltRef, glintRef);

	// Header art only shows once its image has loaded (AUTO cut-outs often do not exist)
	const headerImage = appearance.header.image;
	const hasHeaderImage = useImageExists(headerImage);

	// CIRCLE reveal: the card opens in a widening clip-path circle
	useEffect(() => {
		const card = cardRef.current;
		if (reveal !== "CIRCLE" || !card) {
			return;
		}
		const anim = animate(card, {
			clipPath: ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"],
			scale: [0.94, 1],
			duration: 1100,
			ease: "outQuart",
			// A leftover clip-path would flatten the card's depth layers
			onComplete: (): void => {
				card.style.removeProperty("clip-path");
			},
		});
		return () => {
			anim.pause();
		};
	}, [reveal]);

	const background = useMemo(() => {
		const bg = appearance.background.image;
		if (!bg) {
			return null;
		}
		const blur = appearance.background.blur;

		return (
			<div className={styles.background} data-blur={blur}>
				{backgroundArt(blur, bg, props.item.name)}
				<div className={styles.backgroundFilter} />
			</div>
		);
	}, [appearance.background, props.item.name]);

	const card = (
		<motion.div
			key={props.item.name}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			className={hasHeaderImage ? styles.withArt : undefined}
			style={rarityStyle}
		>
			<div
				ref={tiltRef}
				className={tilts ? `${styles.tilt} ${depth.preserve}` : undefined}
				data-tilt={tilts ? tilt : undefined}
			>
				{hasHeaderImage && headerImage !== null && (
					<div className={depth.preserve}>
						<ItemBreakout
							src={headerImage}
							alt={props.item.name}
							rarityColor={rarityColor}
							cloudVariant={appearance.header.deco}
						/>
					</div>
				)}
				<div className={`${styles.cardWrap} ${depth.preserve}`}>
					{!props.hideFrame && (
						<div
							className={`${styles.titleGlow} ${depth.deep}`}
							aria-hidden="true"
						/>
					)}
					<div
						ref={cardRef}
						className={`${styles.card} ${depth.preserve}`}
						data-rarity={props.item.rarity}
					>
						<div
							className={`${styles.backdrop} ${depth.back}`}
							aria-hidden="true"
						>
							{background}
							<div className={styles.texture} />
						</div>
						{sparkles !== null && <Sparkles amount={sparkles} />}
						<div className={`${styles.edge} ${depth.front}`} aria-hidden="true">
							{appearance.corners !== null && (
								<CardCorners
									variant={appearance.corners.variant}
									detail={appearance.corners.detail}
								/>
							)}
						</div>
						<Header
							name={props.item.name}
							rarity={props.item.rarity}
							base={props.item.base}
							currency={props.item.currency}
						/>
						<Section tier={SectionTier.Mortal} modifiers={props.item.primary} />
						<Section
							tier={SectionTier.Spirit}
							modifiers={props.item.secondary}
						/>
						<Section
							tier={SectionTier.Immortal}
							modifiers={props.item.tertiary}
						/>
						<CardFooter rarityColor={rarityColor} />
						{sweeps && (
							<div
								className={`${styles.sweep} ${depth.front}`}
								data-gleam="SWEEP"
								aria-hidden="true"
							>
								<div ref={glintRef} className={styles.glint} />
							</div>
						)}
					</div>
				</div>
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
