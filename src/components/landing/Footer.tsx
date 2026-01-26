import { TrendingUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-foreground">
                <TrendingUp className="h-5 w-5 text-background" />
              </div>
              <span className="text-xl font-bold tracking-tight">Nexus Capital</span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Professional compound interest calculator for investors who want to understand their long-term wealth growth.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#calculator" className="hover:text-foreground transition-colors">Calculator</a></li>
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nexus Capital. Calculations are for illustrative purposes only.</p>
        </div>
      </div>
    </footer>
  );
}