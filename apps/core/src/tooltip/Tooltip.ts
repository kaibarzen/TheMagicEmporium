import type { AbstractItem } from "@tme/library/src/item/AbstractItem";
import {
	ITEM_CARD_SELECTOR,
	ItemDisplay,
} from "@tme/ui/src/components/item/ItemDisplay.tsx";
import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { placeCardTop } from "./placement";
import styles from "./Tooltip.module.css";

const GAP = 20;
const TOOLTIP_WIDTH = 516;
/** Space kept free between the card and the top or bottom of the window */
const EDGE_MARGIN = 12;

export class Tooltip {
	private pinned: boolean = false;
	private shown: boolean = false;
	private mouseOver: boolean = false;
	private isDragging: boolean = false;
	private dragOffsetX: number = 0;
	private dragOffsetY: number = 0;
	private showTimer: ReturnType<typeof setTimeout> | null = null;
	private scrollTimer: ReturnType<typeof setTimeout> | null = null;
	private currentTop: number = 0;
	private currentLeft: number = 0;
	private currentScale: number = 1;
	private readonly container: HTMLDivElement;
	private readonly contentDiv: HTMLDivElement;
	private root: Root | null = null;
	private item: AbstractItem | null = null;
	private anchorY: number = 0;
	/**
	 * Whether the tooltip still places itself. It re-places whenever its
	 * content changes size (header art loads late), until the user scrolls,
	 * drags or pins it.
	 */
	private autoPlace: boolean = false;

	constructor() {
		this.container = document.createElement("div");
		this.container.className = styles["container"];

		this.contentDiv = document.createElement("div");
		this.contentDiv.className = styles["content"];
		this.container.appendChild(this.contentDiv);

		document.body.appendChild(this.container);

		new ResizeObserver((): void => {
			if (this.autoPlace) {
				this.placeVertically();
			}
		}).observe(this.contentDiv);

		let dragPending = false;
		let dragStartX = 0;
		let dragStartY = 0;

		this.container.addEventListener("mousedown", (e: MouseEvent) => {
			if (e.button !== 0 || !this.pinned) return;
			dragPending = true;
			dragStartX = e.clientX;
			dragStartY = e.clientY;
			this.dragOffsetX = e.clientX - this.currentLeft;
			this.dragOffsetY = e.clientY - this.currentTop;
		});

		document.addEventListener("mousemove", (e: MouseEvent) => {
			if (dragPending && !this.isDragging) {
				if (
					Math.abs(e.clientX - dragStartX) > 4 ||
					Math.abs(e.clientY - dragStartY) > 4
				) {
					this.isDragging = true;
					this.autoPlace = false;
					this.container.classList.add(styles["dragging"]);
				}
			}
			if (!this.isDragging) return;
			this.currentLeft = e.clientX - this.dragOffsetX;
			this.currentTop = e.clientY - this.dragOffsetY;
			this.container.style.left = `${this.currentLeft}px`;
			this.container.style.top = `${this.currentTop}px`;
		});

		document.addEventListener("mouseup", (e: MouseEvent) => {
			dragPending = false;
			if (!this.isDragging || e.button !== 0) return;
			this.isDragging = false;
			this.container.classList.remove(styles["dragging"]);
		});

		this.container.addEventListener("mouseenter", () => {
			this.mouseOver = true;
		});

		this.container.addEventListener("mouseleave", () => {
			this.mouseOver = false;
		});

		document.addEventListener(
			"wheel",
			(e: WheelEvent) => {
				if (!this.shown || !this.mouseOver) return;
				e.preventDefault();
				if (e.ctrlKey) {
					this.currentScale = Math.min(
						2,
						Math.max(0.5, this.currentScale - e.deltaY * 0.001),
					);
					this.container.style.transform = `scale(${this.currentScale})`;
					return;
				}
				this.autoPlace = false;
				this.container.classList.add(styles["scrolling"]);
				if (this.scrollTimer) clearTimeout(this.scrollTimer);
				this.scrollTimer = setTimeout(() => {
					this.container.classList.remove(styles["scrolling"]);
					this.scrollTimer = null;
				}, 150);
				this.currentTop -= e.deltaY / 2;
				this.container.style.top = `${this.currentTop}px`;
			},
			{ passive: false },
		);

		document.addEventListener("mousedown", (e: MouseEvent) => {
			if (e.button === 1 && this.shown && !this.pinned) {
				e.preventDefault();
				this.pin();
				return;
			}
			if (this.pinned) {
				const rect = this.container.getBoundingClientRect();
				const inside =
					e.clientX >= rect.left &&
					e.clientX <= rect.right &&
					e.clientY >= rect.top &&
					e.clientY <= rect.bottom;
				if (!inside) this.unpin();
			}
		});

		document.addEventListener("keydown", (e: KeyboardEvent) => {
			if (this.pinned && e.key === "Escape") {
				this.unpin();
			}
		});
	}

	/** Places the tooltip beside the cursor, on whichever side has room */
	private placeAt = (x: number, y: number): void => {
		if (this.pinned) {
			return;
		}
		const left =
			x + GAP + TOOLTIP_WIDTH <= window.innerWidth
				? x + GAP
				: x - TOOLTIP_WIDTH - GAP;
		this.currentLeft = Math.max(0, left);
		this.container.style.left = `${this.currentLeft}px`;
		this.anchorY = y;
		this.autoPlace = true;
		this.placeVertically();
	};

	/**
	 * Centres the card body on the cursor and keeps it readable on screen; see
	 * placeCardTop. Measures the rendered card, so it works at any zoom.
	 */
	private placeVertically = (): void => {
		const card = this.contentDiv.querySelector(ITEM_CARD_SELECTOR);
		if (card === null) {
			return;
		}
		const cardRect = card.getBoundingClientRect();
		const contentRect = this.contentDiv.getBoundingClientRect();
		const cardTop = placeCardTop({
			anchorY: this.anchorY,
			viewportHeight: window.innerHeight,
			margin: EDGE_MARGIN,
			above: cardRect.top - contentRect.top,
			card: cardRect.height,
			below: contentRect.bottom - cardRect.bottom,
		});
		this.currentTop += cardTop - cardRect.top;
		this.container.style.top = `${this.currentTop}px`;
	};

	public show = (): void => {
		this.shown = true;
		this.container.style.opacity = "1";
		this.container.style.visibility = "visible";
	};

	public hide = (): void => {
		if (this.showTimer) {
			clearTimeout(this.showTimer);
			this.showTimer = null;
		}
		if (this.pinned) return;
		this.shown = false;
		this.container.style.opacity = "0";
		this.container.style.visibility = "hidden";
	};

	public setContent = (item: AbstractItem): void => {
		this.item = item;
		this.render();
	};

	/** Renders the current item; a pinned tooltip shows the card as selected */
	private render = (): void => {
		if (this.item === null) {
			return;
		}
		if (!this.root) {
			this.root = createRoot(this.contentDiv);
		}
		this.root.render(
			createElement(ItemDisplay, { item: this.item, selected: this.pinned }),
		);
	};

	public showNextTo = (e: MouseEvent, item: AbstractItem): void => {
		if (this.showTimer) clearTimeout(this.showTimer);
		if (this.shown) {
			this.setContent(item);
			this.placeAt(e.clientX, e.clientY);
			return;
		}
		this.showTimer = setTimeout(() => {
			this.setContent(item);
			this.placeAt(e.clientX, e.clientY);
			this.show();
			this.showTimer = null;
		}, 400);
	};

	public pin = (): void => {
		if (!this.shown) return;
		this.pinned = true;
		this.autoPlace = false;
		this.container.classList.add(styles["pinned"]);
		this.contentDiv.style.pointerEvents = "auto";
		this.render();
	};

	public unpin = (): void => {
		this.pinned = false;
		this.shown = false;
		this.container.classList.remove(styles["pinned"]);
		this.contentDiv.style.pointerEvents = "none";
		this.render();
		this.container.style.opacity = "0";
		this.container.style.visibility = "hidden";
	};
}
