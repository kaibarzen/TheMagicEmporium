import type { Icon } from "@tme/library/src/item/icon";
import { generateIconUrl } from "@tme/library/src/misc/generateIconUrl";

/**
 * URL of the transparent cut-out version of an item icon, which sits next to
 * the icon with the extension swapped: `clothes/royal.jpg` → `clothes/royal.cutout.png`.
 * The file only exists for icons that have been cut out.
 */
export const getCutoutUrl = (icon: Icon): string => {
	return generateIconUrl(icon).replace(/\.[^./]+$/, ".cutout.png");
};
