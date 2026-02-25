import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Download, Package, Wrench, Sparkles } from "lucide-react";
import type { Product } from "@shared/schema";

const categoryConfig: Record<string, { label: string; icon: typeof Download; variant: "default" | "secondary" | "outline" }> = {
  digital: { label: "Digital", icon: Download, variant: "secondary" },
  physical: { label: "Physical", icon: Package, variant: "outline" },
  service: { label: "Service", icon: Wrench, variant: "outline" },
};

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export function ProductCard({ product }: { product: Product }) {
  const config = categoryConfig[product.category] || categoryConfig.digital;
  const CategoryIcon = config.icon;

  return (
    <Card
      className={`relative p-6 flex flex-col border-card-border ${product.isFeatured ? "ring-2 ring-primary" : ""}`}
      data-testid={`card-product-${product.id}`}
    >
      {product.isFeatured && (
        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 no-default-active-elevate">
          <Sparkles className="h-3 w-3 mr-1" />
          Featured
        </Badge>
      )}
      <div className="space-y-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
          </div>
          <Badge variant={config.variant} className="no-default-active-elevate flex-shrink-0">
            <CategoryIcon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-2xl font-bold" data-testid={`text-product-price-${product.id}`}>
            {formatPrice(product.price)}
          </span>
          {product.salesCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {product.salesCount.toLocaleString()} sold
            </span>
          )}
        </div>
      </div>
      <Button className="w-full mt-4" data-testid={`button-buy-product-${product.id}`}>
        <ShoppingCart className="h-4 w-4 mr-2" />
        Buy Now
      </Button>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="p-6 flex flex-col border-card-border">
      <div className="space-y-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-5 w-16 bg-muted animate-pulse rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-8 w-20 bg-muted animate-pulse rounded" />
      </div>
      <div className="h-10 w-full bg-muted animate-pulse rounded mt-4" />
    </Card>
  );
}
