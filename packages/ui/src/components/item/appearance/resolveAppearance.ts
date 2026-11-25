import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { equipmentDetails } from "@tme/library/src/item/equipment/equipment.details";
import type {
	AppearanceImage,
	BackgroundBlur,
	CornerStyle,
	EmberStyle,
	GleamStyle,
	HeaderDeco,
	Intensity,
	RevealStyle,
	SmokeStyle,
} from "@tme/shared/src/types/itemAppearance";
import { getCutoutUrl } from "../breakout/cutoutUrl";
import { autoCloud } from "../clouds/autoCloud";
import { CloudVariant } from "../clouds/CloudDecoration";
import { CornerVariant, DEFAULT_CORNER_VARIANT } from "../corners/CardCorners";
import { CornerDetail, RARITY_CORNER_DETAIL } from "../corners/cornerDetail";
import { metalFromColor } from "../metal/metal";
import { emberAmount, SMOKE_AMOUNT } from "../particles/particleAmount";
import { sparkleAmount } from "../sparkles/sparkleDensity";
import { autoGleam, autoTilt } from "../tilt/tilt";
import { type CardColors, rarityColors } from "./colors";

/** An item's appearance with every AUTO and missing field turned into a concrete value */
export interface ResolvedAppearance {
	colors: CardColors;
	background: {
		/** Background art URL, or null for the plain rarity frame */
		image: string | null;
		blur: BackgroundBlur;
	};
	header: {
		/**
		 * Header art URL, or null for none. The file may not exist (an AUTO
		 * cut-out is only a guess), so check it loads before showing it.
		 */
		image: string | null;
		/** Cloud design on the golden line, or null for a bare line */
		deco: CloudVariant | null;
	};
	/** Corner ornaments, or null for bare corners */
	corners: {
		variant: CornerVariant;
		detail: CornerDetail;
	} | null;
	effects: {
		tilt: Intensity | "NONE";
		/** Number of sparkles, or null for none */
		sparkles: number | null;
		/** Light that plays across the card on hover, or null for none */
		gleam: Exclude<GleamStyle, "NONE"> | null;
		/** Smoke curling up from the bottom edge, or null for none */
		smoke: {
			style: SmokeStyle;
			amount: number;
		} | null;
		/** Embers rising from the bottom edge, or null for none */
		embers: {
			style: EmberStyle;
			amount: number;
		} | null;
		/** Reveal animation, or null for none */
		reveal: Exclude<RevealStyle, "NONE"> | null;
	};
}

const resolveColors = (item: AbstractItem): CardColors => {
	const colors = rarityColors(item.rarity);
	const accent = item.appearance.colors?.accent;
	const metal = item.appearance.colors?.metal;
	return {
		accent: accent === undefined || accent === "AUTO" ? colors.accent : accent,
		metal:
			metal === undefined || metal === "AUTO"
				? colors.metal
				: metalFromColor(metal),
	};
};

const DECO_CLOUD: Record<HeaderDeco, CloudVariant | null> = {
	PUFFY: CloudVariant.Puffy,
	RUYI: CloudVariant.Ruyi,
	BAND: CloudVariant.Band,
	WIND: CloudVariant.Wind,
	DIAMONDS: CloudVariant.Diamonds,
	STARS: CloudVariant.Stars,
	NONE: null,
};

const resolveDeco = (item: AbstractItem): CloudVariant | null => {
	const deco = item.appearance.header?.deco;
	if (deco === undefined || deco === "AUTO") {
		return autoCloud(item.rarity);
	}
	return DECO_CLOUD[deco];
};

type ResolvedCorners = ResolvedAppearance["corners"];

const fret = (detail: CornerDetail): ResolvedCorners => {
	return { variant: CornerVariant.Fret, detail };
};

const STYLE_CORNERS: Record<CornerStyle, ResolvedCorners> = {
	BRACKET: fret(CornerDetail.Bracket),
	STUD: fret(CornerDetail.Stud),
	FULL: fret(CornerDetail.Full),
	ORNATE: fret(CornerDetail.Ornate),
	// The diamond corners have no detail levels
	DIAMOND: { variant: CornerVariant.Diamond, detail: CornerDetail.Full },
	NONE: null,
};

const resolveCorners = (item: AbstractItem): ResolvedCorners => {
	const corners = item.appearance.corners;
	if (corners === undefined || corners === "AUTO") {
		return {
			variant: DEFAULT_CORNER_VARIANT,
			detail: RARITY_CORNER_DETAIL[item.rarity],
		};
	}
	return STYLE_CORNERS[corners];
};

const resolveBlur = (
	blur: "AUTO" | BackgroundBlur | undefined,
): BackgroundBlur => {
	if (blur === undefined || blur === "AUTO") {
		return "PARTIAL";
	}
	return blur;
};

const resolveImage = (image: AppearanceImage | undefined): string | null => {
	if (image === undefined || image === "NONE") {
		return null;
	}
	return image;
};

const resolveHeaderImage = (item: AbstractItem): string | null => {
	const image = item.appearance.header?.image;
	if (image === undefined || image === "AUTO") {
		return getCutoutUrl(equipmentDetails[item.base].icon);
	}
	return resolveImage(image);
};

const resolveSparkles = (item: AbstractItem): number | null => {
	const sparkles = item.appearance.effects?.sparkles;
	const modifierCount = item.getModifiers().length;
	if (sparkles === undefined || sparkles === "AUTO") {
		if (!item.isPerfectRoll()) {
			return null;
		}
		return sparkleAmount("MEDIUM", modifierCount);
	}
	if (sparkles === "NONE") {
		return null;
	}
	return sparkleAmount(sparkles, modifierCount);
};

const resolveGleam = (
	item: AbstractItem,
): ResolvedAppearance["effects"]["gleam"] => {
	const gleam = item.appearance.effects?.gleam;
	const style =
		gleam === undefined || gleam === "AUTO" ? autoGleam(item.rarity) : gleam;
	if (style === "NONE") {
		return null;
	}
	return style;
};

const resolveSmoke = (
	item: AbstractItem,
): ResolvedAppearance["effects"]["smoke"] => {
	const smoke = item.appearance.effects?.smoke;
	// AUTO has nothing to go on yet; it will read the modifiers' elements later
	if (smoke === undefined || smoke === "AUTO" || smoke === "NONE") {
		return null;
	}
	return {
		style: smoke,
		amount: SMOKE_AMOUNT,
	};
};

const resolveEmbers = (
	item: AbstractItem,
): ResolvedAppearance["effects"]["embers"] => {
	const embers = item.appearance.effects?.embers;
	// AUTO has nothing to go on yet; it will read the modifiers' elements later
	if (embers === undefined || embers === "AUTO" || embers === "NONE") {
		return null;
	}
	return {
		style: embers,
		amount: emberAmount(item.getModifiers().length),
	};
};

const resolveReveal = (
	reveal: "AUTO" | RevealStyle | undefined,
	sparkles: number | null,
): ResolvedAppearance["effects"]["reveal"] => {
	if (reveal === undefined || reveal === "AUTO") {
		return sparkles !== null ? "CIRCLE" : null;
	}
	if (reveal === "NONE") {
		return null;
	}
	return reveal;
};

export const resolveAppearance = (item: AbstractItem): ResolvedAppearance => {
	const appearance = item.appearance;

	const tilt = appearance.effects?.tilt;
	const sparkles = resolveSparkles(item);
	const reveal = appearance.effects?.reveal;

	return {
		colors: resolveColors(item),
		background: {
			image: resolveImage(appearance.background?.image),
			blur: resolveBlur(appearance.background?.blur),
		},
		header: {
			image: resolveHeaderImage(item),
			deco: resolveDeco(item),
		},
		corners: resolveCorners(item),
		effects: {
			tilt:
				tilt === undefined || tilt === "AUTO" ? autoTilt(item.rarity) : tilt,
			sparkles,
			gleam: resolveGleam(item),
			smoke: resolveSmoke(item),
			embers: resolveEmbers(item),
			reveal: resolveReveal(reveal, sparkles),
		},
	};
};
