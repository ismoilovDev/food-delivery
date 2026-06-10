import { openLink } from "@telegram-apps/sdk-react";

/**
 * To'lov (checkout) URL'ini ochadi.
 * Telegram Mini App ichida `openLink` orqali, aks holda yangi oynada.
 */
export function openCheckout(url: string) {
	if (!url) return;
	try {
		if (openLink.isAvailable()) {
			openLink(url);
			return;
		}
	} catch {
		// openLink mavjud emas — fallback
	}
	window.open(url, "_blank");
}
