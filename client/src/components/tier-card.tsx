import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import type { Tier } from "@shared/schema";

export function TierCard({ tier }: { tier: Tier }) {
  return (
    <Card
      className={`relative p-6 flex flex-col border-card-border ${tier.isPopular ? "ring-2 ring-primary" : ""}`}
      data-testid={`card-tier-${tier.id}`}
    >
      {tier.isPopular && (
        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 no-default-active-elevate">
          <Star className="h-3 w-3 mr-1" />
          Most Popular
        </Badge>
      )}
      <div className="space-y-4 flex-1">
        <div>
          <h3 className="font-semibold text-lg" data-testid={`text-tier-name-${tier.id}`}>{tier.name}</h3>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold">${tier.price}</span>
            <span className="text-sm text-muted-foreground">/ month</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>
        <ul className="space-y-2.5">
          {tier.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        variant={tier.isPopular ? "default" : "outline"}
        className="w-full mt-6"
        data-testid={`button-join-tier-${tier.id}`}
      >
        Join for ${tier.price}/mo
      </Button>
    </Card>
  );
}
