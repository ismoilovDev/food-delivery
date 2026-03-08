import { Home, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useCart } from "~/lib/api/hooks/useCart";
import { useI18nStore } from "~/store/i18nStore";

export function BottomNav() {
	const { pathname } = useLocation();
	const { t } = useI18nStore();
	const { data: cart } = useCart();

	const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

	const tabs = [
		{ to: "/menu", icon: Home, label: t.nav.menu },
		{ to: "/cart", icon: ShoppingCart, label: t.nav.cart, badge: cartCount },
		{ to: "/profile", icon: User, label: t.nav.profile },
	];

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-50">
			<div className="flex items-center justify-around py-2 px-2 safe-bottom">
				{tabs.map(({ to, icon: Icon, label, badge }) => {
					const active = pathname === to || pathname.startsWith(`${to}/`);
					return (
						<Link
							key={to}
							to={to}
							className="flex flex-col items-center gap-0.5 py-1 px-4 rounded-2xl transition-all"
						>
							<div className="relative">
								<Icon
									size={22}
									className={active ? "text-orange-500 drop-shadow-sm" : "text-gray-400"}
									strokeWidth={active ? 2.5 : 1.8}
								/>
								{!!badge && (
									<span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-0.5 leading-none">
										{badge > 99 ? "99+" : badge}
									</span>
								)}
							</div>
							<span
								className={`text-[10px] font-medium transition-colors ${
									active ? "text-orange-500" : "text-gray-400"
								}`}
							>
								{label}
							</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
