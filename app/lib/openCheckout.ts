import { openLink } from "@telegram-apps/sdk-react";

/**
 * To'lov (checkout) URL'ini ochadi.
 * 1) Telegram Mini App ichida `openLink` (tashqi brauzerda ochadi, app ochiq qoladi).
 * 2) Aks holda webview'ni to'g'ridan-to'g'ri shu URL'ga yo'naltiramiz —
 *    `window.open` Telegram webview'da ko'pincha bloklanadi, location esa ishonchli.
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
	window.location.href = url;
}
