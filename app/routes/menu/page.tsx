import { CategoryTabs } from "./components/category-tabs";
import { MenuHeader } from "./components/menu-header";
import { ProductGrid } from "./components/product-grid";
import { useMenuPage } from "./usePage";

export default function MenuPage() {
	const {
		t,
		lang,
		categories,
		categoriesLoading,
		displayProducts,
		isLoading,
		selectedCategoryId,
		setSelectedCategoryId,
		searchQuery,
		setSearchQuery,
		cartItemMap,
		handleIncrement,
		handleDecrement,
	} = useMenuPage();

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<div className="sticky top-0 z-40 shadow-lg shadow-orange-200/50">
				<MenuHeader
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					placeholder={t.menu.search}
				/>
				<CategoryTabs
					categories={categories}
					isLoading={categoriesLoading}
					selectedId={selectedCategoryId}
					allLabel={t.menu.all}
					onSelect={setSelectedCategoryId}
				/>
			</div>

			<div className="flex-1 p-4">
				<ProductGrid
					products={displayProducts}
					isLoading={isLoading}
					emptyLabel={t.menu.empty}
					lang={lang}
					sumLabel={t.common.sum}
					cartItemMap={cartItemMap}
					onIncrement={handleIncrement}
					onDecrement={handleDecrement}
				/>
			</div>
		</div>
	);
}
