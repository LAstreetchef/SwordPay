import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-10">
          <div className="flex items-center">
            <Link href="/" data-testid="link-home">
              <span className="text-3xl font-black tracking-wide text-[#1e3a8a]">
                SWORDPAY
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/how-it-works">
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="link-how-it-works"
              >
                How it works
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700" data-testid="button-find-creator">
                Find a creator
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-2" data-testid="mobile-menu">
          <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start" data-testid="mobile-link-how-it-works">
              How it works
            </Button>
          </Link>
          <Link href="/explore" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700" data-testid="mobile-button-find">
              Find a creator
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
