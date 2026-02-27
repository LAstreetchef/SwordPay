import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingWidget() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[280px] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden" data-testid="floating-widget">
      <button
        onClick={() => setOpen(false)}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground z-10"
        data-testid="button-close-widget"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="px-4 pt-8 pb-2 text-center">
        <p className="font-bold text-sm mb-0.5">Sell your content in seconds</p>
        <p className="text-xs text-muted-foreground mb-3">Set a price, upload, and share your link.</p>
        <a href="https://swordpay.me" target="_blank" rel="noopener noreferrer" className="block mb-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-semibold" data-testid="button-try-it-now">
            Try It Now
          </Button>
        </a>
      </div>
      <div className="px-3 pb-3">
        <img
          src="/images/fileshare-preview.png"
          alt="SWORD FileShare"
          className="w-full rounded-xl"
        />
      </div>
    </div>
  );
}
