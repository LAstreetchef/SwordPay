import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingWidget() {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div
        onClick={() => setCollapsed(false)}
        className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-0"
        style={{ width: '120px' }}
        data-testid="floating-widget-collapsed"
      >

        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full text-xs font-semibold animate-pulse py-1 px-3">
          Start Free Today
        </Button>
        <div className="relative w-full">
          <img
            src="/images/fileshare-new.jpg"
            alt="SWORD FileShare"
            className="w-full rounded-xl shadow-2xl border border-white/30"
          />
          <div className="absolute inset-0 rounded-xl pointer-events-none">
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block" style={{top:'5%', fontSize:'15.4px'}}>SET PRICE</span>
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block" style={{top:'35%', fontSize:'15.4px'}}>ADD FILE</span>
            <span className="absolute font-black text-black tracking-wider text-center bg-white rounded px-2 py-1 w-full block" style={{top:'65%', fontSize:'15.4px'}}>SHARE</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden" style={{ width: '265px', fontSize: '16px' }} data-testid="floating-widget">
      <button
        onClick={() => setCollapsed(true)}
        className="absolute top-1 right-1 text-muted-foreground hover:text-foreground z-10"
        data-testid="button-collapse-widget"
      >
        <ChevronDown className="h-3 w-3" />
      </button>
      <div className="px-3 pt-3 pb-0 text-center">
        <p className="font-bold text-base leading-tight whitespace-nowrap">Sell your content in seconds</p>
        <p className="text-base text-muted-foreground leading-tight whitespace-nowrap">Set a price, Upload, and Share</p>
        <a href="https://swordpay.me" target="_blank" rel="noopener noreferrer" className="block mt-1">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-semibold animate-pulse" data-testid="button-try-it-now">
            Start Free Today
          </Button>
        </a>
      </div>
      <div className="relative">
        <a href="https://swordpay.me" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/fileshare-new.jpg"
            alt="SWORD FileShare"
            className="w-full hover:opacity-90 transition-opacity"
          />
        </a>

      </div>
    </div>
  );
}
