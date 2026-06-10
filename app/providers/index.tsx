import { init } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
	// Telegram SDK'ni ishga tushiramiz — openLink kabi metodlar shusiz ishlamaydi.
	// Telegram muhitidan tashqarida (dev brauzer) xato bersa — e'tiborsiz qoldiramiz.
	useEffect(() => {
		try {
			init();
		} catch {
			// not in Telegram — ignore
		}
	}, []);

	return <QueryProvider>{children}</QueryProvider>;
}
