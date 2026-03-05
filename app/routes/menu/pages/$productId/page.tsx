import { useProductDetailPage } from "./usePage";
import { ProductHero } from "./components/product-hero";
import { ProductDetails } from "./components/product-details";
import { ProductFooter } from "./components/product-footer";
import { ProductSkeleton } from "./components/product-skeleton";
import { localName } from "~/lib/i18n";

export default function ProductDetailPage() {
  const { t, lang, product, isLoading, qty, handleIncrement, handleDecrement, goBack } =
    useProductDetailPage();

  if (isLoading) return <ProductSkeleton onBack={goBack} />;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 p-8">
        <p className="text-gray-400 text-sm text-center">{t.common.error}</p>
        <button
          onClick={goBack}
          className="text-orange-500 text-sm font-medium"
        >
          {t.common.back}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <ProductHero
        imageUrl={product.mainImageUrl}
        alt={localName(product.name, lang)}
        onBack={goBack}
      />

      {/* Content card */}
      <div className="relative -mt-4 bg-white rounded-t-3xl px-4 pt-5 pb-4">
        <ProductDetails product={product} lang={lang} t={t} />
      </div>

      <ProductFooter
        price={product.price}
        discountPrice={product.discountPrice}
        qty={qty}
        sumLabel={t.common.sum}
        addToCartLabel={t.product.addToCart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
}
