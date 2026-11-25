export type EdgeFile = "top" | "bottom";

/**
 * URL of the edge image that belongs to a background, which sits next to it
 * with the extension swapped: `backgrounds/cave.jpg` → `backgrounds/cave.top.png`.
 * The file only exists for backgrounds that have been given edges.
 */
export const getEdgeUrl = (background: string, edge: EdgeFile): string => {
	return background.replace(/\.[^./]+$/, `.${edge}.png`);
};
