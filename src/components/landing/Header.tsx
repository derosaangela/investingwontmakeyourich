import { Button } from '@/components/ui/button';

interface HeaderProps {
  onGetStarted: () => void;
}

export function Header({ onGetStarted }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <span className="text-black font-bold text-sm">N</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">nexus</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">
              Features
            </a>
            <a href="#calculator" className="text-sm text-white/50 hover:text-white transition-colors">
              Calculator
            </a>
            <a href="/planning" className="text-sm text-white/50 hover:text-white transition-colors">
              Planning
            </a>
            <a href="#about" className="text-sm text-white/50 hover:text-white transition-colors">
              About
            </a>
          </nav>

          {/* CTA */}
          <Button 
            onClick={onGetStarted} 
            className="h-9 px-5 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90"
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}