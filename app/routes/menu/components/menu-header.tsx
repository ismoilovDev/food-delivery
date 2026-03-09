import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";

interface MenuHeaderProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	placeholder: string;
}

export function MenuHeader({ searchQuery, onSearchChange, placeholder }: MenuHeaderProps) {
	return (
		<div className="bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-4 pb-3">
			<div className="relative">
				<Search
					size={16}
					className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10"
				/>
				<Input
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder={placeholder}
					className="pl-9 rounded-2xl border-0 bg-white shadow-sm text-sm"
				/>
			</div>
		</div>
	);
}
