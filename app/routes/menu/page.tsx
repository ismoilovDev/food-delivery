import { useMenuPage } from "./usePage";
import { MenuHeader } from "./components/menu-header";
import { CategoryTabs } from "./components/category-tabs";
import { ProductGrid } from "./components/product-grid";

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
    selectedBranch,
    handleIncrement,
    handleDecrement,
  } = useMenuPage();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MenuHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedBranch={selectedBranch}
        lang={lang}
        placeholder={t.menu.search}
        branchPlaceholder={t.branches.select}
      />

      <CategoryTabs
        categories={categories}
        isLoading={categoriesLoading}
        selectedId={selectedCategoryId}
        allLabel={t.menu.all}
        onSelect={setSelectedCategoryId}
      />

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
