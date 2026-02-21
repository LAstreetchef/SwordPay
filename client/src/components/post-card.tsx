import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Lock, Globe } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Post, Creator } from "@shared/schema";

interface PostCardProps {
  post: Post;
  creator?: Creator;
  showCreator?: boolean;
}

export function PostCard({ post, creator, showCreator = false }: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <Card className="p-5 border-card-border" data-testid={`card-post-${post.id}`}>
      <div className="space-y-4">
        {showCreator && creator && (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={creator.avatarUrl} alt={creator.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {creator.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{creator.name}</p>
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
        )}
        {!showCreator && (
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
            {post.isPublic ? (
              <Badge variant="secondary" className="text-xs no-default-active-elevate">
                <Globe className="h-3 w-3 mr-1" /> Public
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs no-default-active-elevate">
                <Lock className="h-3 w-3 mr-1" /> ${post.minTierPrice}+ members
              </Badge>
            )}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-base mb-2" data-testid={`text-post-title-${post.id}`}>
            {post.title}
          </h3>
          {post.isPublic ? (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {post.content}
            </p>
          ) : (
            <div className="bg-muted/50 rounded-md p-4 flex items-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                This post is for members only. Join the ${post.minTierPrice}/mo tier to unlock.
              </p>
            </div>
          )}
        </div>

        {post.imageUrl && post.isPublic && (
          <div className="rounded-md overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-4 pt-1">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors" data-testid={`button-like-post-${post.id}`}>
            <Heart className="h-4 w-4" />
            <span>{post.likeCount}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors" data-testid={`button-comment-post-${post.id}`}>
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentCount}</span>
          </button>
        </div>
      </div>
    </Card>
  );
}

export function PostCardSkeleton() {
  return (
    <Card className="p-5 border-card-border">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          <div className="space-y-1.5">
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-4 w-12 bg-muted animate-pulse rounded" />
          <div className="h-4 w-12 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </Card>
  );
}
