import { Button } from '@/components/ui/button';

interface HeaderProps {
  onGetStarted: () => void;
}

export function Header({ onGetStarted }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b-0">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl glass-strong flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">nexus</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white/40 hover:text-white transition-colors duration-300">
              Features
            </a>
            <a href="#calculator" className="text-sm text-white/40 hover:text-white transition-colors duration-300">
              Calculator
            </a>
            <a href="#about" className="text-sm text-white/40 hover:text-white transition-colors duration-300">
              About
            </a>
          </nav>

          {/* CTA */}
          <Button 
            onClick={onGetStarted} 
            className="h-9 px-5 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300"
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
