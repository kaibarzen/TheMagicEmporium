import { AbstractItem } from "@tme/library/src/item/AbstractItem";
import { legendaryNoBackgroundFixture } from "./legendaryNoBackgroundFixture";

/** A legendary item recoloured through its appearance: a teal accent on a steel-blue metal */
export const legendaryCustomColorsFixture = new AbstractItem();
legendaryCustomColorsFixture.name = "Legendary Tidecaller";
legendaryCustomColorsFixture.rarity = legendaryNoBackgroundFixture.rarity;
legendaryCustomColorsFixture.base = legendaryNoBackgroundFixture.base;
legendaryCustomColorsFixture.currency = legendaryNoBackgroundFixture.currency;
legendaryCustomColorsFixture.appearance = {
	colors: { accent: "#3fd0c9", metal: "#7f9bb8" },
};
legendaryCustomColorsFixture.primary = legendaryNoBackgroundFixture.primary;
legendaryCustomColorsFixture.secondary = legendaryNoBackgroundFixture.secondary;
legendaryCustomColorsFixture.tertiary = legendaryNoBackgroundFixture.tertiary;
