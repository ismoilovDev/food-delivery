import { Bell, BellOff, ChevronLeft, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import { formatDate } from "~/lib/format";
import { useNotificationsPage } from "./usePage";

export default function NotificationsPage() {
	const { t, notifications, isLoading, hasUnread, isMarkingAll, handleMarkAll, handleMarkOne } =
		useNotificationsPage();

	return (
		<div className="min-h-screen bg-gray-50 pb-8">
			{/* Header */}
			<div className="bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-12 pb-5 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Link
						to="/profile"
						className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0"
					>
						<ChevronLeft size={18} className="text-white" />
					</Link>
					<h1 className="text-lg font-bold text-white">{t.notifications.title}</h1>
				</div>
				{hasUnread && (
					<button
						type="button"
						onClick={handleMarkAll}
						disabled={isMarkingAll}
						className="text-xs font-semibold text-white/90 bg-white/20 px-3 py-1.5 rounded-xl disabled:opacity-60"
					>
						{isMarkingAll ? (
							<Loader2 size={14} className="animate-spin" />
						) : (
							t.notifications.markAllRead
						)}
					</button>
				)}
			</div>

			<div className="px-4 pt-4 flex flex-col gap-2">
				{isLoading ? (
					Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={`sk-${i}`} className="h-20 w-full rounded-2xl" />
					))
				) : notifications.length === 0 ? (
					<div className="flex flex-col items-center justify-center gap-3 pt-20">
						<div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
							<BellOff size={28} className="text-orange-300" />
						</div>
						<p className="text-base font-semibold text-gray-700">{t.notifications.empty}</p>
						<p className="text-sm text-gray-400 text-center">{t.notifications.emptyDesc}</p>
					</div>
				) : (
					notifications.map((notif) => (
						<button
							key={notif.id}
							type="button"
							onClick={() => !notif.isRead && handleMarkOne(notif.id)}
							className={`w-full text-left rounded-2xl px-4 py-3.5 transition-all ${
								notif.isRead ? "bg-white" : "bg-orange-50 ring-1 ring-orange-100"
							}`}
						>
							<div className="flex items-start gap-3">
								<div
									className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
										notif.isRead ? "bg-gray-100" : "bg-orange-100"
									}`}
								>
									<Bell size={15} className={notif.isRead ? "text-gray-400" : "text-orange-500"} />
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center justify-between gap-2 mb-0.5">
										<p
											className={`text-sm font-semibold truncate ${
												notif.isRead ? "text-gray-700" : "text-gray-900"
											}`}
										>
											{notif.title}
										</p>
										<span className="text-[10px] text-gray-400 shrink-0">
											{formatDate(notif.createdAt)}
										</span>
									</div>
									<p className="text-xs text-gray-500 leading-snug line-clamp-2">{notif.message}</p>
								</div>
								{!notif.isRead && (
									<div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5" />
								)}
							</div>
						</button>
					))
				)}
			</div>
		</div>
	);
}
