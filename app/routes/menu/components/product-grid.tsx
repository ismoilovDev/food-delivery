import { ChefHat } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { ProductCard } from "./product-card";
import type { ProductDto } from "~/lib/api/types";
import type { Lang } from "~/lib/i18n";

interface ProductGridProps {
  products: ProductDto[] | undefined;
  isLoading: boolean;
  emptyLabel: string;
  lang: Lang;
  sumLabel: string;
  cartItemMap: Map<number, { id: number; quantity: number }>;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
}

export function ProductGrid({
  products,
  isLoading,
  emptyLabel,
  lang,
  sumLabel,
  cartItemMap,
  onIncrement,
  onDecrement,
}: ProductGridProps) {
  if (isLoading) return <ProductGridSkeleton />;

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
          <ChefHat size={28} className="text-orange-300" />
        </div>
        <p className="text-gray-400 text-sm">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          lang={lang}
          sumLabel={sumLabel}
          cartItem={cartItemMap.get(product.id)}
          onIncrement={() => onIncrement(product.id)}
          onDecrement={() => onDecrement(product.id)}
        />
      ))}
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <Skeleton className="aspect-square w-full" />
          <div className="p-2.5 space-y-2">
            <Skeleton className="h-3 w-3/4 rounded-full" />
            <Skeleton className="h-3 w-1/2 rounded-full" />
            <Skeleton className="h-7 w-full rounded-xl mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
