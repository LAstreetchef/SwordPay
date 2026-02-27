import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Lock, Flame } from "lucide-react";
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

function ProductImage({ product, className = "" }: { product: Product; className?: string }) {
  const gradientIdx = hashIndex(product.id, silhouetteGradients.length);
  const bgIdx = hashIndex(product.name, bgTones.length);

  return (
    <div className={`overflow-hidden rounded-lg relative ${className}`}>
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
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
          <Lock className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}

export function HeroProductCard({ product }: { product: Product }) {
  return (
    <div
      className="group cursor-pointer rounded-xl border border-border overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300"
      data-testid={`card-product-hero-${product.id}`}
    >
      <div className="flex flex-col md:flex-row">
        <ProductImage product={product} className="aspect-square md:w-1/2 shrink-0" />
        <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="no-default-active-elevate">
              <Flame className="h-3 w-3 mr-1" />
              Best Seller
            </Badge>
            {product.salesCount > 0 && (
              <span className="text-xs text-muted-foreground">{product.salesCount.toLocaleString()} sold</span>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {product.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-2xl md:text-3xl font-bold" data-testid={`text-product-price-${product.id}`}>
              {formatPrice(product.price)}
            </span>
            <Button size="lg" className="ml-auto" data-testid={`button-buy-product-${product.id}`}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="group cursor-pointer rounded-xl border border-border overflow-hidden bg-card hover:shadow-md transition-shadow duration-300"
      data-testid={`card-product-${product.id}`}
    >
      <ProductImage product={product} className="aspect-[4/3] w-full" />
      <div className="p-4">
        <h3
          className="font-semibold text-sm leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-1"
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold" data-testid={`text-product-price-${product.id}`}>
            {formatPrice(product.price)}
          </span>
          {product.salesCount > 0 && (
            <span className="text-[11px] text-muted-foreground">{product.salesCount.toLocaleString()} sold</span>
          )}
        </div>
        <Button className="w-full mt-3" size="sm" data-testid={`button-buy-product-${product.id}`}>
          <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
          Buy Now
        </Button>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <div className="aspect-[4/3] w-full bg-muted animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
        <div className="h-3 w-full bg-muted animate-pulse rounded" />
        <div className="h-5 w-16 bg-muted animate-pulse rounded" />
        <div className="h-8 w-full bg-muted animate-pulse rounded mt-2" />
      </div>
    </div>
  );
}

export function HeroProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <div className="flex flex-col md:flex-row">
        <div className="aspect-square md:w-1/2 bg-muted animate-pulse" />
        <div className="p-6 md:p-8 flex-1 space-y-3">
          <div className="h-5 w-24 bg-muted animate-pulse rounded-full" />
          <div className="h-7 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded mt-4" />
        </div>
      </div>
    </div>
  );
}
