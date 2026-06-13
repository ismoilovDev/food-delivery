import { isLaunchParamsRetrieveError, retrieveRawInitData } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { telegramAuth } from "~/lib/api/services/auth";
import { getMe } from "~/lib/api/services/users";
import { useAuthStore } from "~/store/authStore";
import { useBranchStore } from "~/store/branchStore";
import { useI18nStore } from "~/store/i18nStore";

export type AuthStatus = "loading" | "error" | "no-telegram";

export function useAuthPage() {
	const [status, setStatus] = useState<AuthStatus>("loading");
	const [errorMsg, setErrorMsg] = useState("");
	const [devToken, setDevToken] = useState("");
	const navigate = useNavigate();

	const { setTokens, setUser, isAuthenticated } = useAuthStore();
	const { t } = useI18nStore();

	// Restoran tanlangan bo'lsa menyuga, aks holda restoran tanlash sahifasiga.
	function goAfterAuth() {
		const hasBranch = useBranchStore.getState().selectedBranch !== null;
		navigate(hasBranch ? "/menu" : "/restaurants", { replace: true });
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional mount-only effect
	useEffect(() => {
		if (isAuthenticated) {
			goAfterAuth();
			return;
		}
		doAuth();
	}, []);

	async function doAuth() {
		try {
			let initData: string | undefined;
			try {
				initData = retrieveRawInitData();
			} catch (err) {
				if (isLaunchParamsRetrieveError(err)) {
					setStatus("no-telegram");
					return;
				}
				throw err;
			}

			if (!initData) {
				setStatus("no-telegram");
				return;
			}

			const authRes = await telegramAuth({ initData });

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

			goAfterAuth();
		} catch (err) {
			setErrorMsg(err instanceof Error ? err.message : t.auth.authError);
			setStatus("error");
		}
	}

	function retry() {
		setStatus("loading");
		setErrorMsg("");
		doAuth();
	}

	async function handleDevLogin() {
		const token = devToken.trim();
		if (!token) return;
		setTokens(token, "");
		try {
			const meRes = await getMe();
			if (meRes.success && meRes.data) setUser(meRes.data);
		} catch {
			// not critical
		}
		goAfterAuth();
	}

	return { status, errorMsg, devToken, setDevToken, handleDevLogin, retry, t };
}
