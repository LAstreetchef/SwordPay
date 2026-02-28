import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SWORD Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#1e3a8a] tracking-wide">SWORDPAY</h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* About & Contact */}
          <div>
            <h3 className="font-semibold text-[#1e3a8a] text-sm mb-1">About</h3>
            <div className="mt-4">
              <h3 className="font-semibold text-[#1e3a8a] text-sm mb-1">Contact</h3>
              <a 
                href="mailto:Support@swordpay.io" 
                className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors"
              >
                Support@swordpay.io
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-[#1e3a8a] text-sm mb-1">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 text-sm hover:text-[#1e3a8a] transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
