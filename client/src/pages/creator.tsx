import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { TierCard } from "@/components/tier-card";
import { PostCard, PostCardSkeleton } from "@/components/post-card";
import {
  Users,
  FileText,
  CheckCircle,
  ExternalLink,
  Globe,
  Share2,
} from "lucide-react";
import { SiX, SiYoutube, SiInstagram } from "react-icons/si";
import { useSEO } from "@/hooks/use-seo";
import type { Creator, Tier, Post } from "@shared/schema";

export default function CreatorPage() {
  const params = useParams<{ slug: string }>();

  const { data: creator, isLoading: creatorLoading } = useQuery<Creator>({
    queryKey: ["/api/creators", params.slug],
  });

  const { data: tiers, isLoading: tiersLoading } = useQuery<Tier[]>({
    queryKey: ["/api/creators", params.slug, "tiers"],
    enabled: !!creator,
  });

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/creators", params.slug, "posts"],
    enabled: !!creator,
  });

  useSEO({
    title: creator ? `${creator.name} | Patreon` : "Creator | Patreon",
    description: creator?.tagline || "Support this creator on Patreon.",
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
      <div className="relative h-56 md:h-72">
        {creator.coverUrl ? (
          <img
            src={creator.coverUrl}
            alt={`${creator.name} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/40 via-primary/20 to-accent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 mb-6 flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
          <Avatar className="h-28 w-28 border-4 border-background" data-testid="avatar-creator">
            <AvatarImage src={creator.avatarUrl} alt={creator.name} />
            <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
              {creator.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-creator-page-name">
                {creator.name}
              </h1>
              {creator.isVerified && (
                <CheckCircle className="h-5 w-5 text-primary" />
              )}
            </div>
            <p className="text-muted-foreground mb-3">{creator.tagline}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <Badge variant="secondary" className="no-default-active-elevate">
                {creator.category}
              </Badge>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {creator.patronCount.toLocaleString()} patrons
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                {creator.postCount} posts
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" data-testid="button-share-creator">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <div className="flex items-center gap-3 mb-8 flex-wrap" data-testid="social-links">
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <SiX className="h-4 w-4" />
              </a>
            )}
            {socialLinks.youtube && (
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <SiYoutube className="h-4 w-4" />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <SiInstagram className="h-4 w-4" />
              </a>
            )}
            {socialLinks.website && (
              <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-4 w-4" />
                <span>Website</span>
              </a>
            )}
          </div>
        )}

        <Tabs defaultValue="posts" className="mb-16">
          <TabsList className="mb-6" data-testid="creator-tabs">
            <TabsTrigger value="posts" data-testid="tab-posts">Posts</TabsTrigger>
            <TabsTrigger value="membership" data-testid="tab-membership">Membership</TabsTrigger>
            <TabsTrigger value="about" data-testid="tab-about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {postsLoading
                  ? Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
                  : posts && posts.length > 0
                  ? posts.map((post) => <PostCard key={post.id} post={post} />)
                  : (
                    <div className="text-center py-12" data-testid="empty-posts">
                      <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No posts yet</p>
                    </div>
                  )}
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  Membership tiers
                </h3>
                {tiersLoading
                  ? Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="h-40 bg-muted animate-pulse rounded-md" />
                    ))
                  : tiers?.map((tier) => <TierCard key={tier.id} tier={tier} />)}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="membership">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiersLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-64 bg-muted animate-pulse rounded-md" />
                  ))
                : tiers?.map((tier) => <TierCard key={tier.id} tier={tier} />)}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="max-w-2xl">
              <div className="prose prose-sm dark:prose-invert">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap" data-testid="text-creator-description">
                  {creator.description}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function CreatorPageSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="h-56 md:h-72 bg-muted animate-pulse" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 mb-6 flex items-end gap-6">
          <Skeleton className="h-28 w-28 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-72" />
            <div className="flex gap-3">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
