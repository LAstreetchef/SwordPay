import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import {
  Users,
  CheckCircle,
  Globe,
  Share2,
  ShoppingBag,
} from "lucide-react";
import { SiX, SiYoutube, SiInstagram } from "react-icons/si";
import { useSEO } from "@/hooks/use-seo";
import type { Creator, Product } from "@shared/schema";

export default function CreatorPage() {
  const params = useParams<{ slug: string }>();

  const { data: creator, isLoading: creatorLoading } = useQuery<Creator>({
    queryKey: ["/api/creators", params.slug],
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/creators", params.slug, "products"],
    enabled: !!creator,
  });

  useSEO({
    title: creator ? `${creator.name} | Sword Creator` : "Creator | Sword Creator",
    description: creator?.tagline || "Support this creator on Sword Creator.",
  });

  if (creatorLoading) {
    return <CreatorPageSkeleton />;
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="creator-not-found">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold">Creator not found</h2>
          <p className="text-muted-foreground">This creator page doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const socialLinks = creator.socialLinks as { twitter?: string; youtube?: string; instagram?: string; website?: string } | null;

  return (
    <div className="min-h-screen" data-testid={`page-creator-${creator.slug}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-1.5 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-14 w-14 border-2 border-border" data-testid="avatar-creator">
            <AvatarImage src={creator.avatarUrl} alt={creator.name} />
            <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
              {creator.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl md:text-2xl font-bold" data-testid="text-creator-page-name">
                {creator.name}
              </h1>
              {creator.isVerified && (
                <CheckCircle className="h-4 w-4 text-primary" />
              )}
              <Badge variant="secondary" className="no-default-active-elevate text-xs">
                {creator.category}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                {creator.patronCount.toLocaleString()} patrons
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-0.5">{creator.tagline}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {socialLinks && (
              <>
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><SiX className="h-3.5 w-3.5" /></Button>
                  </a>
                )}
                {socialLinks.youtube && (
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><SiYoutube className="h-3.5 w-3.5" /></Button>
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><SiInstagram className="h-3.5 w-3.5" /></Button>
                  </a>
                )}
                {socialLinks.website && (
                  <a href={socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Globe className="h-3.5 w-3.5" /></Button>
                  </a>
                )}
              </>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-share-creator">
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="border-b border-border mb-4" />

        {productsLoading ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-testid="empty-products">
            <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No products available yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CreatorPageSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-72" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
        <div className="border-b border-border mb-5" />
        <Skeleton className="h-5 w-16 mb-4" />
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
