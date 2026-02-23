import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearch } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreatorCard, CreatorCardSkeleton } from "@/components/creator-card";
import { useSEO } from "@/hooks/use-seo";
import { Search, AlertCircle } from "lucide-react";
import type { Creator } from "@shared/schema";

const allCategories = [
  "All",
  "Art & Illustration",
  "Music",
  "Podcasts",
  "Gaming",
  "Writing",
  "Video",
  "Education",
  "Photography",
];

export default function Explore() {
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const initialCategory = params.get("category") || "All";

  useSEO({
    title: "Explore Creators | Patreon",
    description: "Discover and support amazing creators across art, music, podcasts, gaming, writing, and more on Patreon.",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { data: creators, isLoading, error } = useQuery<Creator[]>({
    queryKey: ["/api/creators"],
  });

  const filteredCreators = creators?.filter((creator) => {
    const matchesSearch =
      !searchTerm ||
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || creator.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen" data-testid="page-explore">
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Explore creators</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg">
            Discover and support amazing creators building communities
          </p>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search creators by name or topic..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="input-search-creators"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 flex-wrap" data-testid="category-filters">
          {allCategories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              data-testid={`button-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {error ? (
          <div className="text-center py-20" data-testid="error-explore">
            <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Unable to load creators right now. Please try again later.</p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CreatorCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCreators && filteredCreators.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6" data-testid="text-results-count">
              {filteredCreators.length} creator{filteredCreators.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20" data-testid="empty-state-explore">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No creators found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Try adjusting your search or browse a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
