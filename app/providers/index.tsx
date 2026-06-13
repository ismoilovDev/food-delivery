import { init } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		try {
			init();
		} catch {
			// not in Telegram — ignore
		}
	}, []);

	return <QueryProvider>{children}</QueryProvider>;
}
