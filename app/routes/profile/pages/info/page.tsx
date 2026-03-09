import { Check, ChevronLeft, Loader2, Phone, User } from "lucide-react";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import { useProfileInfoPage } from "./usePage";

export default function ProfileInfoPage() {
	const {
		t,
		user,
		isLoading,
		firstName,
		setFirstName,
		lastName,
		setLastName,
		hasChanges,
		isSaving,
		savedMsg,
		handleSave,
	} = useProfileInfoPage();

	return (
		<div className="min-h-screen bg-gray-50 pb-8">
			{/* Header */}
			<div className="bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-12 pb-5 flex items-center gap-3">
				<Link
					to="/profile"
					className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0"
				>
					<ChevronLeft size={18} className="text-white" />
				</Link>
				<h1 className="text-lg font-bold text-white">{t.info.title}</h1>
			</div>

			<div className="px-4 pt-4 flex flex-col gap-3">
				{isLoading ? (
					<>
						<Skeleton className="h-16 w-full rounded-2xl" />
						<Skeleton className="h-16 w-full rounded-2xl" />
						<Skeleton className="h-16 w-full rounded-2xl" />
					</>
				) : (
					<>
						{/* First name */}
						<div className="bg-white rounded-2xl shadow-sm px-4 py-3.5">
							<label
								htmlFor="firstName"
								className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5"
							>
								{t.info.firstName}
							</label>
							<div className="flex items-center gap-3">
								<User size={16} className="text-gray-400 shrink-0" />
								<input
									id="firstName"
									type="text"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="flex-1 text-sm text-gray-900 font-medium outline-none bg-transparent placeholder-gray-300"
									placeholder={t.info.firstName}
								/>
							</div>
						</div>

						{/* Last name */}
						<div className="bg-white rounded-2xl shadow-sm px-4 py-3.5">
							<label
								htmlFor="lastName"
								className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5"
							>
								{t.info.lastName}
							</label>
							<div className="flex items-center gap-3">
								<User size={16} className="text-gray-400 shrink-0" />
								<input
									id="lastName"
									type="text"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="flex-1 text-sm text-gray-900 font-medium outline-none bg-transparent placeholder-gray-300"
									placeholder={t.info.lastName}
								/>
							</div>
						</div>

						{/* Phone (read-only) */}
						<div className="bg-white rounded-2xl shadow-sm px-4 py-3.5">
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
								{t.info.phone}
							</p>
							<div className="flex items-center gap-3">
								<Phone size={16} className="text-gray-400 shrink-0" />
								<span className="text-sm text-gray-500">{user?.phone ?? "—"}</span>
							</div>
						</div>

						{/* Save button */}
						<button
							type="button"
							onClick={handleSave}
							disabled={!hasChanges || isSaving}
							className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-base shadow-lg shadow-orange-200 active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
						>
							{isSaving ? (
								<Loader2 size={18} className="animate-spin" />
							) : savedMsg ? (
								<>
									<Check size={18} />
									{t.info.saved}
								</>
							) : (
								t.info.save
							)}
						</button>
					</>
				)}
			</div>
		</div>
	);
}
