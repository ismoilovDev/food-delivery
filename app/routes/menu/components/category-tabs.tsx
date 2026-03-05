import { Skeleton } from "~/components/ui/skeleton";
import type { CategoryDto } from "~/lib/api/types";
import { cn } from "~/lib/utils";

interface CategoryTabsProps {
	categories: CategoryDto[] | undefined;
	isLoading: boolean;
	selectedId: number | null;
	allLabel: string;
	onSelect: (id: number | null) => void;
}

export function CategoryTabs({
	categories,
	isLoading,
	selectedId,
	allLabel,
	onSelect,
}: CategoryTabsProps) {
	return (
		<div className="sticky top-[92px] z-30 bg-white border-b border-gray-100 shadow-sm">
			<div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
				<CategoryPill
					label={allLabel}
					active={selectedId === null}
					onClick={() => onSelect(null)}
				/>

				{isLoading
					? Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} className="shrink-0 h-8 w-20 rounded-full" />
						))
					: categories?.map((cat) => (
							<CategoryPill
								key={cat.id}
								label={cat.nameStr || cat.name}
								active={selectedId === cat.id}
								onClick={() => onSelect(cat.id)}
							/>
						))}
			</div>
		</div>
	);
}

function CategoryPill({
	label,
	active,
	onClick,
}: {
	label: string;
	active: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
				active
					? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md shadow-orange-200"
					: "bg-gray-100 text-gray-600"
			)}
		>
			{label}
		</button>
	);
}
