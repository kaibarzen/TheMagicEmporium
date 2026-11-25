import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { equipmentDetails } from "@tme/library/src/item/equipment/equipment.details";
import type {
	AppearanceImage,
	HeaderDeco,
	Intensity,
} from "@tme/shared/src/types/itemAppearance";
import { getCutoutUrl } from "../breakout/cutoutUrl";
import { autoCloud } from "../clouds/autoCloud";
import { CloudVariant } from "../clouds/CloudDecoration";
import { sparkleAmount } from "../sparkles/sparkleDensity";
import { autoTilt } from "../tilt/tilt";

/** An item's appearance with every AUTO and missing field turned into a concrete value */
export interface ResolvedAppearance {
	/** Background art URL, or null for the plain rarity frame */
	background: string | null;
	header: {
		/**
		 * Header art URL, or null for none. The file may not exist (an AUTO
		 * cut-out is only a guess), so check it loads before showing it.
		 */
		image: string | null;
		/** Cloud design on the golden line, or null for a bare line */
		deco: CloudVariant | null;
	};
	effects: {
		tilt: Intensity | "NONE";
		/** Number of sparkles, or null for none */
		sparkles: number | null;
		reveal: boolean;
	};
}

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

export const resolveAppearance = (item: AbstractItem): ResolvedAppearance => {
	const appearance = item.appearance;

	const tilt = appearance.effects?.tilt;
	const sparkles = resolveSparkles(item);
	const reveal = appearance.effects?.reveal;

	return {
		background: resolveImage(appearance.background?.image),
		header: {
			image: resolveHeaderImage(item),
			deco: resolveDeco(item),
		},
		effects: {
			tilt:
				tilt === undefined || tilt === "AUTO" ? autoTilt(item.rarity) : tilt,
			sparkles,
			reveal:
				reveal === undefined || reveal === "AUTO" ? sparkles !== null : reveal,
		},
	};
};
