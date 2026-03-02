import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  // Splash / Auth
  index("routes/auth/page.tsx"),

  // Layout bilan sahifalar (Bottom Nav ko'rinadi)
  layout("routes/layout.tsx", [
    route("menu", "routes/menu/page.tsx"),
    route("menu/:productId", "routes/menu/pages/$productId/page.tsx"),
    route("branches", "routes/branches/page.tsx"),
    route("cart", "routes/cart/page.tsx"),
    route("profile", "routes/profile/page.tsx"),
    route("profile/orders", "routes/profile/pages/orders/page.tsx"),
    route("profile/orders/:id", "routes/profile/pages/orders/pages/$id/page.tsx"),
    route("profile/info", "routes/profile/pages/info/page.tsx"),
    route("profile/addresses", "routes/profile/pages/addresses/page.tsx"),
  ]),
] satisfies RouteConfig;
