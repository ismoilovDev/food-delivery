import { Search, MapPin } from "lucide-react";
import { Input } from "~/components/ui/input";
import { localName } from "~/lib/i18n";
import type { Lang } from "~/lib/i18n";
import type { RestaurantDto } from "~/lib/api/types";

interface MenuHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedBranch: RestaurantDto | null;
  lang: Lang;
  placeholder: string;
  branchPlaceholder: string;
}

export function MenuHeader({
  searchQuery,
  onSearchChange,
  selectedBranch,
  lang,
  placeholder,
  branchPlaceholder,
}: MenuHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-4 pb-3 shadow-lg shadow-orange-200/50">
      <div className="flex items-center gap-1.5 mb-3">
        <MapPin size={13} className="text-orange-100 shrink-0" />
        <span className="text-orange-100 text-xs font-medium truncate">
          {selectedBranch
            ? localName(selectedBranch.name, lang, selectedBranch.nameStr)
            : branchPlaceholder}
        </span>
      </div>

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
