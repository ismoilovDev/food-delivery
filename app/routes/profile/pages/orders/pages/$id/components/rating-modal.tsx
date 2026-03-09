import { Loader2, Star, X } from "lucide-react";

interface RatingModalProps {
	isOpen: boolean;
	onClose: () => void;
	ratingValue: number;
	reviewText: string;
	isSubmitting: boolean;
	onRatingChange: (v: number) => void;
	onReviewChange: (v: string) => void;
	onSubmit: () => void;
	t: {
		title: string;
		submit: string;
		placeholder: string;
	};
}

export function RatingModal({
	isOpen,
	onClose,
	ratingValue,
	reviewText,
	isSubmitting,
	onRatingChange,
	onReviewChange,
	onSubmit,
	t,
}: RatingModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-end">
			<button
				type="button"
				aria-label="close"
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
			/>
			<div className="relative w-full bg-white rounded-t-3xl px-4 pt-4 pb-8 z-10">
				{/* Handle */}
				<div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />

				<div className="flex items-center justify-between mb-5">
					<h2 className="text-lg font-bold text-gray-900">{t.title}</h2>
					<button
						type="button"
						onClick={onClose}
						className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"
					>
						<X size={16} className="text-gray-500" />
					</button>
				</div>

				{/* Stars */}
				<div className="flex justify-center gap-3 mb-5">
					{Array.from({ length: 5 }).map((_, i) => (
						<button
							key={`star-input-${i}`}
							type="button"
							onClick={() => onRatingChange(i + 1)}
							className="active:scale-110 transition-transform"
						>
							<Star
								size={36}
								className={
									i < ratingValue
										? "text-orange-400 fill-orange-400"
										: "text-gray-200 fill-gray-200"
								}
							/>
						</button>
					))}
				</div>

				{/* Review text */}
				<textarea
					value={reviewText}
					onChange={(e) => onReviewChange(e.target.value)}
					placeholder={t.placeholder}
					rows={3}
					className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 resize-none mb-4"
				/>

				<button
					type="button"
					onClick={onSubmit}
					disabled={ratingValue === 0 || isSubmitting}
					className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-base shadow-lg shadow-orange-200 active:scale-[0.98] transition-transform disabled:opacity-60 flex items-center justify-center gap-2"
				>
					{isSubmitting ? <Loader2 size={18} className="animate-spin" /> : t.submit}
				</button>
			</div>
		</div>
	);
}
