import { index, layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	// Splash / Auth
	index("routes/auth/page.tsx"),

	// Layout bilan sahifalar (Bottom Nav ko'rinadi)
	layout("routes/layout.tsx", [
		route("menu", "routes/menu/page.tsx"),
		route("menu/:productId", "routes/menu/pages/$productId/page.tsx"),
		route("orders", "routes/orders/page.tsx"),
		route("orders/:id", "routes/orders/pages/$id/page.tsx"),
		route("cart", "routes/cart/page.tsx"),
		route("profile", "routes/profile/page.tsx"),
		route("profile/info", "routes/profile/pages/info/page.tsx"),
		route("profile/addresses", "routes/profile/pages/addresses/page.tsx"),
		route("profile/notifications", "routes/profile/pages/notifications/page.tsx"),
	]),
] satisfies RouteConfig;
