import { Download, Package, Wrench } from "lucide-react";
import type { Product } from "@shared/schema";

const categoryIcons: Record<string, typeof Download> = {
  digital: Download,
  physical: Package,
  service: Wrench,
};

const categoryColors: Record<string, string> = {
  digital: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  physical: "bg-green-500/10 text-green-600 dark:text-green-400",
  service: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export function ProductCard({ product }: { product: Product }) {
  const Icon = categoryIcons[product.category] || Download;
  const colorClass = categoryColors[product.category] || categoryColors.digital;

  return (
    <div
      className="group cursor-pointer"
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted mb-3">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center gap-3 ${colorClass}`}>
            <Icon className="h-12 w-12 opacity-60" />
            <span className="text-xs font-medium uppercase tracking-wider opacity-50">
              {product.category}
            </span>
          </div>
        )}
      </div>
      <h3
        className="font-semibold text-sm leading-snug mb-1 group-hover:text-primary transition-colors"
        data-testid={`text-product-name-${product.id}`}
      >
        {product.name}
      </h3>
      <p
        className="text-sm text-muted-foreground"
        data-testid={`text-product-price-${product.id}`}
      >
        {formatPrice(product.price)}
      </p>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="aspect-square w-full bg-muted animate-pulse rounded-lg mb-3" />
      <div className="h-4 w-3/4 bg-muted animate-pulse rounded mb-2" />
      <div className="h-4 w-16 bg-muted animate-pulse rounded" />
    </div>
  );
}
