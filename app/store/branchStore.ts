import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RestaurantDto } from "~/lib/api/types";

interface BranchState {
	selectedBranch: RestaurantDto | null;
	setSelectedBranch: (branch: RestaurantDto) => void;
	clearBranch: () => void;
}

export const useBranchStore = create<BranchState>()(
	persist(
		(set) => ({
			selectedBranch: null,
			setSelectedBranch: (branch) => set({ selectedBranch: branch }),
			clearBranch: () => set({ selectedBranch: null }),
		}),
		{
			name: "branch-storage",
		}
	)
);
