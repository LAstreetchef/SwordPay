import type { Product } from "@shared/schema";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="group cursor-pointer"
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-square w-3/4 overflow-hidden rounded-lg mb-2 relative">
        <img
          src={product.imageUrl || "/images/product-placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3
        className="font-semibold text-base leading-snug mb-1 group-hover:text-primary transition-colors"
        data-testid={`text-product-name-${product.id}`}
      >
        {product.name}
      </h3>
      <p
        className="text-base text-muted-foreground"
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
