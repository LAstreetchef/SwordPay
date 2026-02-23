import { Link } from "wouter";
import { SiX, SiInstagram, SiYoutube } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-foreground text-background" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/explore" className="text-sm opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-explore">Explore</Link></li>
              <li><Link href="/how-it-works" className="text-sm opacity-80 hover:opacity-100 transition-opacity" data-testid="footer-link-how">How it works</Link></li>
              <li><span className="text-sm opacity-80">Pricing</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">Resources</h3>
            <ul className="space-y-3">
              <li><span className="text-sm opacity-80">Blog</span></li>
              <li><span className="text-sm opacity-80">Help Center</span></li>
              <li><span className="text-sm opacity-80">Creator Hub</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">Company</h3>
            <ul className="space-y-3">
              <li><span className="text-sm opacity-80">About</span></li>
              <li><span className="text-sm opacity-80">Careers</span></li>
              <li><span className="text-sm opacity-80">Press</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-70">Legal</h3>
            <ul className="space-y-3">
              <li><span className="text-sm opacity-80">Terms of Use</span></li>
              <li><span className="text-sm opacity-80">Privacy Policy</span></li>
              <li><span className="text-sm opacity-80">Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              <span className="text-primary">Sword Creator</span>
            </span>
          </div>
          <p className="text-sm opacity-60">2025 Sword Creator. Built for demonstration purposes.</p>
          <div className="flex items-center gap-4">
            <SiX className="h-4 w-4 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            <SiInstagram className="h-4 w-4 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            <SiYoutube className="h-4 w-4 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
}
