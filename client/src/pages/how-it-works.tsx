import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSEO } from "@/hooks/use-seo";
import {
  ArrowRight,
  Heart,
  Shield,
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  Star,
  Lock,
  Globe,
} from "lucide-react";

const creatorBenefits = [
  {
    icon: DollarSign,
    title: "Predictable income",
    description: "Earn recurring revenue from your biggest fans instead of relying on ads or one-time sales.",
  },
  {
    icon: Users,
    title: "Build a community",
    description: "Create a dedicated space for your fans to connect with you and each other.",
  },
  {
    icon: Zap,
    title: "Creative freedom",
    description: "Create what you want without worrying about algorithms or platform changes.",
  },
  {
    icon: Shield,
    title: "Own your audience",
    description: "Your membership list is yours. No algorithm decides who sees your content.",
  },
];

const patronBenefits = [
  {
    icon: Star,
    title: "Exclusive content",
    description: "Get access to behind-the-scenes content, early releases, and patron-only updates.",
  },
  {
    icon: Lock,
    title: "Tiered rewards",
    description: "Choose the tier that fits your budget and get benefits at every level.",
  },
  {
    icon: Heart,
    title: "Direct impact",
    description: "Your support directly funds the creators you love, helping them do what they do best.",
  },
  {
    icon: Globe,
    title: "Community access",
    description: "Join a community of fellow fans and interact with creators in a meaningful way.",
  },
];

export default function HowItWorks() {
  useSEO({
    title: "How Patreon Works | Patreon",
    description: "Learn how Patreon helps creators earn recurring income from their fans and build sustainable creative careers.",
  });

  return (
    <div className="min-h-screen" data-testid="page-how-it-works">
      <section className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            How Patreon works
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            A membership platform connecting creators with their biggest fans for
            recurring support and exclusive content.
          </p>
          <Link href="/explore">
            <Button size="lg" className="text-base" data-testid="button-hiw-explore">
              Explore creators
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20" data-testid="steps-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14">
            Three simple steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: 1,
                icon: Heart,
                title: "Find your creator",
                description: "Browse thousands of creators across categories like art, music, podcasts, gaming, and more. Find someone whose work resonates with you.",
              },
              {
                step: 2,
                icon: Shield,
                title: "Choose your tier",
                description: "Each creator offers different membership levels with unique perks. Pick the one that fits your budget and get instant access to benefits.",
              },
              {
                step: 3,
                icon: TrendingUp,
                title: "Enjoy the experience",
                description: "Unlock exclusive content, join the community, and know that your support directly helps creators do what they love.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-5">
                <div className="relative mx-auto">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card" data-testid="creator-benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">For creators</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Everything you need to build a thriving creative business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creatorBenefits.map((benefit) => (
              <Card key={benefit.title} className="p-6 border-card-border">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" data-testid="patron-benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">For patrons</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Get closer to the creators you admire
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patronBenefits.map((benefit) => (
              <Card key={benefit.title} className="p-6 border-card-border">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-lg mx-auto">
            Whether you're a creator or a patron, there's a place for you here.
          </p>
          <Link href="/explore">
            <Button size="lg" variant="outline" className="text-base px-8 bg-white/15 backdrop-blur-sm border-white/30 text-white" data-testid="button-hiw-cta">
              Find a creator
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
