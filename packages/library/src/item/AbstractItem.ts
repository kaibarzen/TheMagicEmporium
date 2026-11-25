import { namespace } from "@tme/shared/src/namespaceConfig";
import { type Item5e, ItemType } from "@tme/shared/src/types/item5e";
import type { ItemAppearance } from "@tme/shared/src/types/itemAppearance";
import { generateBackgroundUrl } from "../misc/generateBackgroundUrl";
import type { AppliedModifier } from "../modifiers/Modifier";
import { registry } from "../registry/Registry";
import { equipmentDetails } from "./equipment/equipment.details";
import { Equipment } from "./equipment/equipment.types";
import { Rarity } from "./item.types";

// TODO Refactor: Unify this across the codebase
export const rarityLabel: Record<Rarity, string> = {
	[Rarity.Common]: "Common",
	[Rarity.Uncommon]: "Uncommon",
	[Rarity.Rare]: "Rare",
	[Rarity.VeryRare]: "Very Rare",
	[Rarity.Legendary]: "Legendary",
};

/**
 * Represents an abstracted magic item, no fluff
 */
export class AbstractItem {
	public name = "Empty Abstraction Item Name";

	public rarity: Rarity = Rarity.Common;
	public base: Equipment = Equipment.Relic;

	public currency = 0;

	/** Card customization; anything left out is derived from the item */
	public appearance: ItemAppearance = {};

	public primary: AppliedModifier[] = [];
	public secondary: AppliedModifier[] = [];
	public tertiary: AppliedModifier[] = [];

	/**
	 * Creates an abstract item from a foundry item document
	 * TODO add validation for abstractItem creation
	 * @param document
	 */
	public static createFromDocument = (document: any): null | AbstractItem => {
		const data = document.flags[
			namespace.core.id
		] as Item5e["flags"][typeof namespace.core.id];

		if (!data) {
			return null;
		}

		if (data.type !== ItemType.MagicItem) {
			return null;
		}

		const item = new AbstractItem();
		item.base = data.base as Equipment;
		item.name = document.name;
		item.appearance = data.appearance ?? {};
		item.rarity = document.system.rarity as Rarity;

		if (document.system.price.denomination === "gp") {
			item.currency = document.system.price.value;
		}

		data.primary.forEach((rawMod) => {
			const modifier = registry.get(rawMod.identifier);
			if (!modifier) return;
			item.primary.push({ modifier, float: rawMod.float });
		});

		data.secondary.forEach((rawMod) => {
			const modifier = registry.get(rawMod.identifier);
			if (!modifier) return;
			item.secondary.push({ modifier, float: rawMod.float });
		});

		data.tertiary.forEach((rawMod) => {
			const modifier = registry.get(rawMod.identifier);
			if (!modifier) return;
			item.tertiary.push({ modifier, float: rawMod.float });
		});

		return item;
	};

	public getNameWithoutRarity = (): string => {
		return this.name.replace(`${rarityLabel[this.rarity]}`, "");
	};

	public getRarityLabel = (): string => {
		return rarityLabel[this.rarity];
	};

	public getEquipmentLabel = (): string => {
		return equipmentDetails[this.base].title;
	};

	/**
	 * Background art provided by the item's modifiers, used when the
	 * appearance background is AUTO. Later modifiers win.
	 */
	public getModifierBackground = (): string | null => {
		for (const applied of [
			...this.primary,
			...this.secondary,
			...this.tertiary,
		].reverse()) {
			const background = applied.modifier.getBackground(applied.float);
			if (background) {
				return generateBackgroundUrl(background);
			}
		}
		return null;
	};

	/**
	 * Sparkles earned by a perfect roll, used when the appearance sparkles are
	 * AUTO: at least three modifiers, all at their highest breakpoint.
	 * Returns the amount, or null when the item does not sparkle.
	 */
	public getPerfectRollSparkles = (): number | null => {
		const all = [...this.primary, ...this.secondary, ...this.tertiary];
		if (all.length < 3) {
			return null;
		}
		const perfect = all.every((applied) =>
			applied.modifier.isHighestPossibleBreakpoint(applied.float),
		);
		if (!perfect) {
			return null;
		}
		return all.length * 6;
	};
}
