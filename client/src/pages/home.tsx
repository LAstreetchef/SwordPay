import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CreatorCard, CreatorCardSkeleton } from "@/components/creator-card";
import { useQuery } from "@tanstack/react-query";
import { useSEO } from "@/hooks/use-seo";
import {
  ArrowRight,
  Palette,
  Music,
  Mic,
  Gamepad2,
  PenTool,
  Video,
  Heart,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import type { Creator } from "@shared/schema";

const categories = [
  { name: "Art & Illustration", icon: Palette, color: "text-rose-500" },
  { name: "Music", icon: Music, color: "text-violet-500" },
  { name: "Podcasts", icon: Mic, color: "text-amber-500" },
  { name: "Gaming", icon: Gamepad2, color: "text-emerald-500" },
  { name: "Writing", icon: PenTool, color: "text-blue-500" },
  { name: "Video", icon: Video, color: "text-pink-500" },
];

const stats = [
  { number: "250K+", label: "Active creators" },
  { number: "8M+", label: "Active patrons" },
  { number: "$3.5B+", label: "Earned by creators" },
];

export default function Home() {
  useSEO({
    title: "Patreon - Best way for creators to get paid",
    description: "Patreon is a membership platform that makes it easy for artists and creators to get paid. Join over 250,000 creators earning a living.",
  });

  const { data: featuredCreators, isLoading, error } = useQuery<Creator[]>({
    queryKey: ["/api/creators/featured"],
  });

  return (
    <div className="min-h-screen" data-testid="page-home">
      <section className="relative overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Change the way
              <br />
              art is valued
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-lg">
              Patreon is a membership platform that makes it easy for artists and creators
              to get paid. Join over 250,000 creators earning a living through their work.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/explore">
                <Button size="lg" className="text-base px-8" data-testid="button-hero-explore">
                  Find a creator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="text-base px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white" data-testid="button-hero-create">
                  Start creating
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="featured-creators-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured creators</h2>
              <p className="text-muted-foreground">Discover amazing creators building communities</p>
            </div>
            <Link href="/explore">
              <Button variant="outline" size="sm" data-testid="button-see-all-creators">
                See all
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          {error ? (
            <div className="text-center py-12" data-testid="error-featured-creators">
              <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Unable to load creators right now. Please try again later.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <CreatorCardSkeleton key={i} />)
              : featuredCreators?.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
          </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-card" data-testid="categories-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Explore by category</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              From art to education, find creators in every field
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/explore?category=${encodeURIComponent(cat.name)}`}>
                <Card className="p-5 text-center hover-elevate cursor-pointer border-card-border transition-all duration-200">
                  <cat.icon className={`h-8 w-8 mx-auto mb-3 ${cat.color}`} />
                  <p className="text-sm font-medium">{cat.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="how-it-works-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How Patreon works</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              A simple way to support the creators you love
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Find a creator you love",
                description: "Browse thousands of creators across art, music, podcasts, gaming, and more.",
              },
              {
                icon: Shield,
                title: "Choose a membership tier",
                description: "Pick a tier that fits your budget and get exclusive benefits from your favorite creators.",
              },
              {
                icon: TrendingUp,
                title: "Unlock exclusive content",
                description: "Get behind-the-scenes access, early releases, community perks, and more.",
              },
            ].map((step, i) => (
              <div key={step.title} className="text-center space-y-4">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to support your favorite creators?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-lg mx-auto">
            Join millions of patrons who are helping creators build sustainable careers.
          </p>
          <Link href="/explore">
            <Button size="lg" variant="outline" className="text-base px-8 bg-white/15 backdrop-blur-sm border-white/30 text-white" data-testid="button-cta-explore">
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
