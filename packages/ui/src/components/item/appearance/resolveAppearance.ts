import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { equipmentDetails } from "@tme/library/src/item/equipment/equipment.details";
import type {
	AppearanceImage,
	HeaderDeco,
	TiltMode,
} from "@tme/shared/src/types/itemAppearance";
import { getCutoutUrl } from "../breakout/cutoutUrl";
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
		deco: HeaderDeco;
	};
	effects: {
		tilt: TiltMode;
		/** Number of sparkles, or null for none */
		sparkles: number | null;
		reveal: boolean;
	};
}

const resolveImage = (
	image: AppearanceImage | undefined,
	auto: () => string | null,
): string | null => {
	if (image === undefined || image === "AUTO") {
		return auto();
	}
	if (image === "NONE") {
		return null;
	}
	return image;
};

const resolveSparkles = (item: AbstractItem): number | null => {
	const sparkles = item.appearance.effects?.sparkles;
	if (sparkles === undefined || sparkles === "AUTO") {
		return item.getPerfectRollSparkles();
	}
	if (sparkles === "NONE" || sparkles <= 0) {
		return null;
	}
	return sparkles;
};

export const resolveAppearance = (item: AbstractItem): ResolvedAppearance => {
	const appearance = item.appearance;

	const tilt = appearance.effects?.tilt;
	const sparkles = resolveSparkles(item);
	const reveal = appearance.effects?.reveal;

	return {
		background: resolveImage(appearance.background?.image, () =>
			item.getModifierBackground(),
		),
		header: {
			image: resolveImage(appearance.header?.image, () =>
				getCutoutUrl(equipmentDetails[item.base].icon),
			),
			deco: appearance.header?.deco ?? "CLOUDS",
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
