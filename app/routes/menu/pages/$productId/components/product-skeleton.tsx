import { ArrowLeft } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

export function ProductSkeleton({ onBack }: { onBack: () => void }) {
	return (
		<div className="min-h-screen bg-white pb-24">
			<div className="relative w-full aspect-[4/3] bg-gray-100 animate-pulse">
				<button
					type="button"
					onClick={onBack}
					className="absolute top-4 left-4 w-9 h-9 rounded-2xl bg-white/90 flex items-center justify-center shadow-md"
				>
					<ArrowLeft size={18} className="text-gray-800" />
				</button>
			</div>
			<div className="p-4 flex flex-col gap-4">
				<Skeleton className="h-3 w-20 rounded-full" />
				<Skeleton className="h-6 w-3/4 rounded-xl" />
				<div className="flex gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholder
						<Skeleton key={i} className="w-4 h-4 rounded-full" />
					))}
				</div>
				<Skeleton className="h-16 w-full rounded-xl" />
				<div className="flex gap-2">
					{Array.from({ length: 3 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholder
						<Skeleton key={i} className="h-8 w-20 rounded-full" />
					))}
				</div>
			</div>
		</div>
	);
}
