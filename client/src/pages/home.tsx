import { useState, useEffect, useCallback } from "react";
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


function useHeroAnimation() {
  const [phase, setPhase] = useState<"heading-in" | "heading-out" | "words" | "done">("heading-in");
  const [wordIndex, setWordIndex] = useState(-1);
  const words = ["Create.", "Profit.", "Repeat."];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "heading-in") {
      timer = setTimeout(() => setPhase("heading-out"), 2000);
    } else if (phase === "heading-out") {
      timer = setTimeout(() => {
        setPhase("words");
        setWordIndex(0);
      }, 800);
    } else if (phase === "words") {
      if (wordIndex < words.length - 1) {
        timer = setTimeout(() => setWordIndex((i) => i + 1), 600);
      } else {
        setPhase("done");
      }
    }

    return () => clearTimeout(timer);
  }, [phase, wordIndex]);

  return { phase, wordIndex, words };
}

const hero2Slides = [
  {
    image: "/images/hero2-3.jpeg",
    lines: ["FOR", "FREELANCERS", "SECURE", "PAYMENTS"],
  },
  {
    image: "/images/hero2-1.webp",
    lines: ["FOR DIGITAL", "PLATFORMS", "FASTER EASIER", "CHECKOUTS"],
  },
  {
    image: "/images/hero2-4.jpg",
    lines: ["FOR DIGITAL", "PLATFORMS", "FASTER EASIER", "CHECKOUTS"],
  },
];

function useHero2Animation() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setSlideIndex((i) => (i + 1) % hero2Slides.length);
        setTextVisible(true);
      }, 600);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return { slide: hero2Slides[slideIndex], textVisible };
}

export default function Home() {
  const { phase, wordIndex, words } = useHeroAnimation();
  const { slide, textVisible } = useHero2Animation();

  useSEO({
    title: "Sword Creator - Best way for creators to get paid",
    description: "Profit from Your Passion. Create. Profit. Repeat. Discover and support creators on Sword Creator.",
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
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
                Profit from Your Passion
              </h1>
              <p
                className={`text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight transition-opacity duration-500 ${
                  phase === "words" || phase === "done" ? "opacity-100" : "opacity-0"
                }`}
              >
                {words.map((word, i) => (
                  <span
                    key={word}
                    className={`inline-block mr-4 transition-all duration-400 ease-out ${
                      i <= wordIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/how-it-works">
                <Button size="lg" className="text-base px-8 bg-blue-600 hover:bg-blue-700" data-testid="button-hero-create">
                  Start creating
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden h-[500px] md:h-[600px]" data-testid="hero2-section">
        {hero2Slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-600 ${
              s === slide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <div
            className={`text-center transition-all duration-500 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {slide.lines.map((line, i) => (
              <p
                key={`${slide.image}-${i}`}
                className={`font-bold text-white leading-tight tracking-tight ${
                  i % 2 === 0 ? "text-2xl md:text-4xl text-white/70" : "text-4xl md:text-6xl"
                }`}
              >
                {line}
              </p>
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


      <section className="py-20" data-testid="how-it-works-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How Sword Creator works</h2>
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
