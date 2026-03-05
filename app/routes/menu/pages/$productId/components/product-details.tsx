import { Star, Clock, Flame, Leaf, Weight } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { localName, type Lang } from "~/lib/i18n";
import type { ProductDto } from "~/lib/api/types";
import type { TranslationKeys } from "~/lib/i18n";

interface ProductDetailsProps {
  product: ProductDto;
  lang: Lang;
  t: TranslationKeys;
}

export function ProductDetails({ product, lang, t }: ProductDetailsProps) {
  const name = localName(product.name, lang);
  const description = localName(product.description, lang);

  return (
    <div className="flex flex-col gap-4">
      {/* Name & Category */}
      <div>
        <p className="text-xs text-orange-500 font-medium mb-1">
          {product.categoryName}
        </p>
        <h1 className="text-xl font-bold text-gray-900 leading-tight">{name}</h1>
      </div>

      {/* Rating */}
      {product.rating > 0 && (
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.round(product.rating)
                    ? "fill-orange-400 text-orange-400"
                    : "text-gray-200 fill-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">
            ({product.reviewCount} {t.product.reviews})
          </span>
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      )}

      {/* Meta chips */}
      <div className="flex flex-wrap gap-2">
        {product.preparationTime && (
          <MetaChip
            icon={<Clock size={13} className="text-orange-500" />}
            label={`${product.preparationTime} min`}
          />
        )}
        {product.calories && (
          <MetaChip
            icon={<Flame size={13} className="text-orange-500" />}
            label={`${product.calories} kcal`}
          />
        )}
        {product.weight && (
          <MetaChip
            icon={<Weight size={13} className="text-orange-500" />}
            label={`${product.weight} g`}
          />
        )}
        {product.isVegetarian && (
          <MetaChip
            icon={<Leaf size={13} className="text-green-500" />}
            label={t.product.vegetarian}
            green
          />
        )}
      </div>

      {/* Badges: spicy */}
      {product.isSpicy && (
        <div className="flex items-center gap-2">
          <Badge className="bg-red-50 text-red-500 border-red-100">
            🌶️ {t.product.spicy}
            {product.spicyLevel ? ` (${product.spicyLevel}/5)` : ""}
          </Badge>
        </div>
      )}

      {/* Ingredients */}
      {product.ingredients?.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">
            {t.product.ingredients}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.ingredients.join(", ")}
          </p>
        </div>
      )}

      {/* Allergens */}
      {product.allergens?.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">
            {t.product.allergens}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.allergens.map((a) => (
              <Badge
                key={a}
                variant="outline"
                className="text-xs text-gray-500 border-gray-200"
              >
                {a}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetaChip({
  icon,
  label,
  green,
}: {
  icon: React.ReactNode;
  label: string;
  green?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${
        green ? "bg-green-50 text-green-700" : "bg-orange-50 text-gray-700"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}
