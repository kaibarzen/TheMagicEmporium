import { useEffect, useState } from "react";

/** One probe per URL for the lifetime of the page, shared by every card */
const probes = new Map<string, Promise<boolean>>();

const probe = (url: string): Promise<boolean> => {
	const cached = probes.get(url);
	if (cached) {
		return cached;
	}

	const result = new Promise<boolean>((resolve) => {
		const image = new Image();
		image.onload = (): void => resolve(true);
		image.onerror = (): void => resolve(false);
		image.src = url;
	});
	probes.set(url, result);
	return result;
};

/**
 * Whether the image at `url` can be loaded. `false` until the check finishes,
 * so nothing that depends on it flashes in and out.
 */
export const useImageExists = (url: string): boolean => {
	const [exists, setExists] = useState(false);

	useEffect(() => {
		let active = true;
		setExists(false);
		void probe(url).then((result) => {
			if (active) {
				setExists(result);
			}
		});
		return (): void => {
			active = false;
		};
	}, [url]);

	return exists;
};
