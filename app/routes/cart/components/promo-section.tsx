import { Loader2, Tag, X } from "lucide-react";

interface PromoSectionProps {
	input: string;
	appliedPromo: string | null;
	error: string;
	isApplying: boolean;
	isRemoving: boolean;
	onInputChange: (val: string) => void;
	onApply: () => void;
	onRemove: () => void;
	t: {
		promo: string;
		promoPlaceholder: string;
		apply: string;
		remove: string;
	};
}

export function PromoSection({
	input,
	appliedPromo,
	error,
	isApplying,
	isRemoving,
	onInputChange,
	onApply,
	onRemove,
	t,
}: PromoSectionProps) {
	return (
		<div className="bg-white rounded-2xl shadow-sm overflow-hidden px-4 py-3.5">
			<div className="flex items-center gap-2 mb-3">
				<Tag size={14} className="text-orange-500" />
				<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t.promo}</h2>
			</div>

			{appliedPromo ? (
				<div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5">
					<div className="flex items-center gap-2">
						<Tag size={14} className="text-orange-500" />
						<span className="text-sm font-semibold text-orange-600 tracking-wide">
							{appliedPromo}
						</span>
					</div>
					<button
						type="button"
						onClick={onRemove}
						disabled={isRemoving}
						className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center active:scale-90 transition-transform disabled:opacity-50"
					>
						{isRemoving ? (
							<Loader2 size={13} className="text-orange-500 animate-spin" />
						) : (
							<X size={13} className="text-orange-500" />
						)}
					</button>
				</div>
			) : (
				<div className="flex gap-2">
					<input
						type="text"
						value={input}
						onChange={(e) => onInputChange(e.target.value.toUpperCase())}
						onKeyDown={(e) => e.key === "Enter" && onApply()}
						placeholder={t.promoPlaceholder}
						className="flex-1 h-10 px-3 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 focus:bg-white transition-colors"
					/>
					<button
						type="button"
						onClick={onApply}
						disabled={!input.trim() || isApplying}
						className="h-10 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white text-sm font-semibold disabled:opacity-50 active:scale-95 transition-transform flex items-center gap-1.5"
					>
						{isApplying ? <Loader2 size={14} className="animate-spin" /> : t.apply}
					</button>
				</div>
			)}

			{error && <p className="mt-2 text-xs text-red-500">{error}</p>}
		</div>
	);
}
