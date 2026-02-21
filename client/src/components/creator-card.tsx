import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, CheckCircle } from "lucide-react";
import type { Creator } from "@shared/schema";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link href={`/creator/${creator.slug}`} data-testid={`card-creator-${creator.slug}`}>
      <Card className="group cursor-pointer hover-elevate transition-all duration-200 border-card-border">
        <div className="relative h-32 rounded-t-md overflow-hidden">
          {creator.coverUrl ? (
            <img
              src={creator.coverUrl}
              alt={`${creator.name} cover`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="relative px-4 pb-4">
          <div className="-mt-8 mb-3 flex items-end gap-3">
            <Avatar className="h-14 w-14 border-2 border-background">
              <AvatarImage src={creator.avatarUrl} alt={creator.name} />
              <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                {creator.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-base truncate" data-testid={`text-creator-name-${creator.slug}`}>
                {creator.name}
              </h3>
              {creator.isVerified && (
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {creator.tagline}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Badge variant="secondary" className="text-xs no-default-active-elevate">
                {creator.category}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                {creator.patronCount.toLocaleString()} patrons
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function CreatorCardSkeleton() {
  return (
    <Card className="border-card-border">
      <div className="h-32 rounded-t-md bg-muted animate-pulse" />
      <div className="relative px-4 pb-4">
        <div className="-mt-8 mb-3">
          <div className="h-14 w-14 rounded-full bg-muted animate-pulse border-2 border-background" />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-32 bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
          <div className="flex items-center gap-3 pt-1">
            <div className="h-5 w-16 bg-muted animate-pulse rounded-full" />
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    </Card>
  );
}
