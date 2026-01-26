import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onGetStarted: () => void;
}

export function Header({ onGetStarted }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-foreground">
              <TrendingUp className="h-5 w-5 text-background" />
            </div>
            <span className="text-xl font-bold tracking-tight">Nexus Capital</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Calculator
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </nav>

          {/* CTA */}
          <Button onClick={onGetStarted} className="font-semibold">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}