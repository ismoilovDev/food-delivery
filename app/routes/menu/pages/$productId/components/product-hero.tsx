import { ArrowLeft, ChefHat } from "lucide-react";

interface ProductHeroProps {
  imageUrl?: string;
  alt: string;
  onBack: () => void;
}

export function ProductHero({ imageUrl, alt, onBack }: ProductHeroProps) {
  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100">
      {imageUrl ? (
        <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-orange-50">
          <ChefHat size={64} className="text-orange-200" />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 w-9 h-9 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-transform"
      >
        <ArrowLeft size={18} className="text-gray-800" />
      </button>
    </div>
  );
}
