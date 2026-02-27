import { Lock } from "lucide-react";
import type { Product } from "@shared/schema";

const silhouetteGradients = [
  "radial-gradient(ellipse 45% 70% at 50% 45%, rgba(180,140,120,0.7) 0%, rgba(180,140,120,0.3) 40%, transparent 70%)",
  "radial-gradient(ellipse 40% 65% at 48% 48%, rgba(160,130,115,0.65) 0%, rgba(160,130,115,0.25) 45%, transparent 72%)",
  "radial-gradient(ellipse 42% 68% at 52% 44%, rgba(175,145,125,0.7) 0%, rgba(175,145,125,0.3) 42%, transparent 68%)",
  "radial-gradient(ellipse 38% 72% at 50% 42%, rgba(170,135,118,0.68) 0%, rgba(170,135,118,0.28) 38%, transparent 70%)",
];

const bgTones = [
  "bg-gradient-to-br from-stone-200 via-stone-300 to-stone-200 dark:from-stone-700 dark:via-stone-800 dark:to-stone-700",
  "bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700",
  "bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700",
  "bg-gradient-to-br from-stone-200 via-stone-300 to-neutral-200 dark:from-stone-700 dark:via-neutral-800 dark:to-stone-700",
];

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

function hashIndex(str: string, len: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % len;
}

export function ProductCard({ product }: { product: Product }) {
  const gradientIdx = hashIndex(product.id, silhouetteGradients.length);
  const bgIdx = hashIndex(product.name, bgTones.length);

  return (
    <div
      className="group cursor-pointer"
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-square w-full max-w-[50%] overflow-hidden rounded-lg mb-3 relative">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 blur-lg"
          />
        ) : (
          <div className={`w-full h-full ${bgTones[bgIdx]}`}>
            <div
              className="absolute inset-0 blur-[2px]"
              style={{ background: silhouetteGradients[gradientIdx] }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 12% 10% at 50% 22%, rgba(180,150,130,0.5) 0%, transparent 100%)",
              }}
            />
          </div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
            <Lock className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-medium">{product.name}</span>
          </div>
        </div>
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
