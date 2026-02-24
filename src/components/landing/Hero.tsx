import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="text-xs font-medium tracking-wide text-white/60 uppercase">Trusted by investors worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.95]">
            <span className="gradient-text">Grow your</span>
            <br />
            <span className="text-white">wealth</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-12 leading-relaxed font-light">
            Visualize compound growth. Plan your future with precision.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="h-12 px-8 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-all group"
            >
              Start calculating
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="h-12 px-8 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-full"
            >
              Learn more
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-3xl mx-auto mt-32">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold tracking-tight">$2.4B+</p>
              <p className="text-xs md:text-sm text-white/40 mt-2 uppercase tracking-wider">Calculated</p>
            </div>
            <div className="text-center border-x border-white/10">
              <p className="text-3xl md:text-4xl font-bold tracking-tight">50K+</p>
              <p className="text-xs md:text-sm text-white/40 mt-2 uppercase tracking-wider">Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold tracking-tight">99%</p>
              <p className="text-xs md:text-sm text-white/40 mt-2 uppercase tracking-wider">Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}