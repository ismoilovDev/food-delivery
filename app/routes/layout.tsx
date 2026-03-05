import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "~/store/authStore";
import { BottomNav } from "~/components/bottom-nav";

export default function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Outlet />
      <BottomNav />
    </div>
  );
}
