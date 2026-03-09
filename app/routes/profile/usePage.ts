import { useState } from "react";
import { useNavigate } from "react-router";
import { useUnreadNotificationCount } from "~/lib/api/hooks/useNotifications";
import { useMe } from "~/lib/api/hooks/useUser";
import type { Lang } from "~/lib/i18n";
import { useAuthStore } from "~/store/authStore";
import { useI18nStore } from "~/store/i18nStore";

export function useProfilePage() {
	const { t, lang, setLang } = useI18nStore();
	const navigate = useNavigate();
	const logout = useAuthStore((s) => s.logout);

	const { data: user } = useMe();
	const { data: unreadCount = 0 } = useUnreadNotificationCount();

	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
	const [showLangSheet, setShowLangSheet] = useState(false);
	const [pendingLang, setPendingLang] = useState<Lang>(lang);

	function handleLogout() {
		logout();
		navigate("/", { replace: true });
	}

	function handleSaveLang() {
		setLang(pendingLang);
		setShowLangSheet(false);
	}

	return {
		t,
		lang,
		user,
		unreadCount,
		showLogoutConfirm,
		setShowLogoutConfirm,
		showLangSheet,
		setShowLangSheet,
		pendingLang,
		setPendingLang,
		handleLogout,
		handleSaveLang,
	};
}
