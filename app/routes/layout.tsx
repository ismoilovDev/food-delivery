import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { BottomNav } from "~/components/bottom-nav";
import { useAuthStore } from "~/store/authStore";
import { useBranchStore } from "~/store/branchStore";

export default function AppLayout() {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const selectedBranch = useBranchStore((s) => s.selectedBranch);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/", { replace: true });
			return;
		}
		// Restoran tanlanmagan bo'lsa — menyu/savatcha mantiqsiz, tanlashga yo'naltiramiz.
		if (!selectedBranch) {
			navigate("/restaurants", { replace: true });
		}
	}, [isAuthenticated, selectedBranch, navigate]);

	if (!isAuthenticated || !selectedBranch) return null;

	return (
		<div className="min-h-screen bg-gray-50 pb-16">
			<Outlet />
			<BottomNav />
		</div>
	);
}
