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
                <Button size="lg" className="text-lg px-8 bg-blue-600 hover:bg-blue-700" data-testid="button-hero-create">
                  Start Sharing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden h-[300px] md:h-[350px]" data-testid="hero2-section">
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

      <section className="relative overflow-hidden h-[250px] md:h-[300px]" data-testid="hero3-section">
        <div className="absolute inset-0">
          <img
            src="/images/hero3-bg.webp"
            alt=""
            className="w-full h-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="flex items-center h-full px-4 sm:px-6 lg:px-8 gap-6 md:gap-10">
            <div className="h-[80%] shrink-0">
              <img
                src="/images/liga-strip.png"
                alt="League logos"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="shrink-0 flex flex-col items-center -mt-8">
              <img
                src="/images/dazn-logo.png"
                alt="DAZN"
                className="w-24 md:w-36 opacity-90"
              />
              <p className="text-white/80 text-xs md:text-sm font-semibold tracking-wider mt-3 uppercase">
                Payment Partner of DAZN
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-3" data-testid="features-cards-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Profit Beyond Borders.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="rounded-xl overflow-hidden mb-1 aspect-[4/3]">
                <img
                  src="/images/card-marketing.webp"
                  alt="Marketing"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-blue-600 mb-0">Marketing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Join <strong>DAZN</strong> and other leading brands on <strong>SWORD</strong>, and gain access to a global audience.
              </p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden mb-1 aspect-[4/3]">
                <img
                  src="/images/card-payments.jpeg"
                  alt="Global Payments"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-blue-600 mb-0">Global Payments</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Accept and Send</strong> unlimited Payments from anywhere in the world.
              </p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden mb-1 aspect-[4/3]">
                <img
                  src="/images/card-conversion.jpeg"
                  alt="Higher Conversion"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-blue-600 mb-0">Higher Conversion</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our <strong>EXPRESS CHECKOUT</strong> removes all friction, enhancing user retention and maximizing conversion.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
