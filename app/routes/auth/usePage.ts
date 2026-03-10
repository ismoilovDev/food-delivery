import { isLaunchParamsRetrieveError, retrieveRawInitData } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { telegramAuth } from "~/lib/api/services/auth";
import { getMe } from "~/lib/api/services/users";
import { useAuthStore } from "~/store/authStore";
import { useI18nStore } from "~/store/i18nStore";

export type AuthStatus = "loading" | "error" | "no-telegram";

export function useAuthPage() {
	const [status, setStatus] = useState<AuthStatus>("loading");
	const [errorMsg, setErrorMsg] = useState("");
	const navigate = useNavigate();

	const { setTokens, setUser, isAuthenticated } = useAuthStore();
	const { t } = useI18nStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional mount-only effect
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/menu", { replace: true });
			return;
		}
		doAuth();
	}, []);

	async function doAuth() {
		try {
			const rawInitData = retrieveRawInitData();

			if (!rawInitData) {
				setStatus("no-telegram");
				return;
			}

			const authRes = await telegramAuth({ initData: rawInitData });

			if (!authRes.success || !authRes.data) {
				setErrorMsg(authRes.message || t.auth.authError);
				setStatus("error");
				return;
			}

			setTokens(authRes.data.accessToken, authRes.data.refreshToken);

			try {
				const meRes = await getMe();
				if (meRes.success && meRes.data) {
					setUser(meRes.data);
				}
			} catch {
				// user info is not critical
			}

			navigate("/menu", { replace: true });
		} catch (err) {
			if (isLaunchParamsRetrieveError(err)) {
				setStatus("no-telegram");
				return;
			}
			setErrorMsg(err instanceof Error ? err.message : t.auth.authError);
			setStatus("error");
		}
	}

	function retry() {
		setStatus("loading");
		setErrorMsg("");
		doAuth();
	}

	return { status, errorMsg, retry, t };
}
