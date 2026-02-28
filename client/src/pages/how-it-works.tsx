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
    title: "How Sword Creator Works | Sword Creator",
    description: "Learn how Sword Creator helps creators earn recurring income from their fans and build sustainable creative careers.",
  });

  return (
    <div className="min-h-screen" data-testid="page-how-it-works">
      <section className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">
            How SWORD works
          </h1>
          <p className="text-[21px] text-blue-600 max-w-xl mx-auto">
            Payments for the Digital Economy
          </p>
        </div>
      </section>

      <section className="pt-[20px] pb-0" data-testid="steps-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-[32px]">
            Three simple steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1: Set Price with Video */}
            <div className="text-center space-y-2.5">
              <h3 className="text-[22px] font-semibold">SET PRICE</h3>
              <div className="rounded-xl overflow-hidden shadow-lg max-w-[202px] mx-auto transition-transform duration-300 hover:scale-[1.65] cursor-pointer">
                <video 
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/set-price.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Step 2: Add File with Video */}
            <div className="text-center space-y-2.5">
              <h3 className="text-[22px] font-semibold">ADD FILE</h3>
              <div className="rounded-xl overflow-hidden shadow-lg max-w-[202px] mx-auto transition-transform duration-300 hover:scale-[1.65] cursor-pointer">
                <video 
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/add-file.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Step 3: Share with Video */}
            <div className="text-center space-y-2.5">
              <h3 className="text-[22px] font-semibold">SHARE</h3>
              <div className="rounded-xl overflow-hidden shadow-lg max-w-[202px] mx-auto transition-transform duration-300 hover:scale-[1.65] cursor-pointer">
                <video 
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/share.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
