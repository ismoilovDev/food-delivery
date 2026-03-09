import { Bell, ChevronRight, Globe, LogOut, MapPin, Package, User } from "lucide-react";
import { Link } from "react-router";
import { BottomSheet } from "~/components/bottom-sheet";
import type { Lang } from "~/lib/i18n";
import { useProfilePage } from "./usePage";

export default function ProfilePage() {
	const {
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
	} = useProfilePage();

	const initials = user
		? `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`.toUpperCase()
		: "?";

	const menuItems = [
		{ icon: User, label: t.profile.info, to: "/profile/info", badge: null },
		{ icon: Package, label: t.nav.orders, to: "/orders", badge: null },
		{ icon: MapPin, label: t.profile.addresses, to: "/profile/addresses", badge: null },
		{
			icon: Bell,
			label: t.profile.notifications,
			to: "/profile/notifications",
			badge: unreadCount > 0 ? unreadCount : null,
		},
	];

	return (
		<div className="min-h-screen bg-gray-50 pb-8">
			{/* Header */}
			<div className="bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-12 pb-8">
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
						{user?.photoUrl ? (
							<img
								src={user.photoUrl}
								alt={user.fullName}
								className="w-full h-full object-cover rounded-2xl"
							/>
						) : (
							<span className="text-xl font-bold text-white">{initials}</span>
						)}
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-lg font-bold text-white truncate">{user?.fullName ?? "..."}</p>
						<p className="text-orange-100 text-sm mt-0.5">{user?.phone ?? ""}</p>
					</div>
				</div>
			</div>

			<div className="px-4 -mt-3 flex flex-col gap-3">
				{/* Navigation links */}
				<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
					{menuItems.map(({ icon: Icon, label, to, badge }, idx) => (
						<Link
							key={to}
							to={to}
							className={`flex items-center gap-3 px-4 py-4 active:bg-gray-50 transition-colors ${
								idx > 0 ? "border-t border-gray-50" : ""
							}`}
						>
							<div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
								<Icon size={18} className="text-orange-500" />
							</div>
							<span className="flex-1 text-sm font-medium text-gray-800">{label}</span>
							{badge !== null && (
								<span className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 mr-1">
									{badge > 99 ? "99+" : badge}
								</span>
							)}
							<ChevronRight size={16} className="text-gray-300" />
						</Link>
					))}
				</div>

				{/* Language */}
				<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
					<button
						type="button"
						onClick={() => setShowLangSheet(true)}
						className="flex items-center gap-3 px-4 py-4 w-full active:bg-gray-50 transition-colors"
					>
						<div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
							<Globe size={18} className="text-orange-500" />
						</div>
						<span className="flex-1 text-sm font-medium text-gray-800 text-left">
							{t.profile.language}
						</span>
						<span className="text-xs font-semibold text-orange-500 mr-1">
							{lang === "uz" ? t.language.uz : t.language.ru}
						</span>
						<ChevronRight size={16} className="text-gray-300" />
					</button>
				</div>

				{/* Logout */}
				<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
					<button
						type="button"
						onClick={() => setShowLogoutConfirm(true)}
						className="flex items-center gap-3 px-4 py-4 w-full active:bg-red-50 transition-colors"
					>
						<div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
							<LogOut size={18} className="text-red-400" />
						</div>
						<span className="flex-1 text-sm font-medium text-red-500 text-left">
							{t.profile.logout}
						</span>
					</button>
				</div>
			</div>

			{/* Language bottom sheet */}
			<BottomSheet isOpen={showLangSheet} onClose={() => setShowLangSheet(false)}>
				<h2 className="text-lg font-bold text-gray-900 mb-4">{t.language.select}</h2>
				<div className="flex flex-col gap-2 mb-5">
					{(["uz", "ru"] as Lang[]).map((l) => (
						<button
							key={l}
							type="button"
							onClick={() => setPendingLang(l)}
							className={`flex items-center justify-between px-4 py-4 rounded-2xl border-2 transition-all ${
								pendingLang === l ? "border-orange-400 bg-orange-50" : "border-gray-100 bg-white"
							}`}
						>
							<span
								className={`text-base font-semibold ${
									pendingLang === l ? "text-orange-600" : "text-gray-700"
								}`}
							>
								{l === "uz" ? t.language.uz : t.language.ru}
							</span>
							{pendingLang === l && (
								<div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
									<div className="w-2 h-2 rounded-full bg-white" />
								</div>
							)}
						</button>
					))}
				</div>
				<button
					type="button"
					onClick={handleSaveLang}
					className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-base shadow-lg shadow-orange-200 active:scale-[0.98] transition-transform"
				>
					{t.language.save}
				</button>
			</BottomSheet>

			{/* Logout confirm bottom sheet */}
			<BottomSheet isOpen={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)}>
				<h2 className="text-lg font-bold text-gray-900 mb-1">{t.profile.logout}</h2>
				<p className="text-sm text-gray-400 mb-6">{t.profile.logoutConfirm}</p>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={() => setShowLogoutConfirm(false)}
						className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-sm"
					>
						{t.profile.no}
					</button>
					<button
						type="button"
						onClick={handleLogout}
						className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white font-semibold text-sm active:scale-[0.98] transition-transform"
					>
						{t.profile.yes}
					</button>
				</div>
			</BottomSheet>
		</div>
	);
}
