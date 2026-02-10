import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/3 w-[700px] h-[700px] bg-white/[0.015] rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-white/[0.008] rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass liquid-shine mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <span className="text-xs font-medium tracking-wide text-white/60 uppercase">Trusted by investors worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.95]">
            <span className="gradient-text">Grow your</span>
            <br />
            <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">wealth</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/40 max-w-xl mx-auto mb-14 leading-relaxed font-light">
            Visualize compound growth. Plan your future with precision.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="h-13 px-10 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 group shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
            >
              Start calculating
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="h-13 px-10 text-sm font-medium text-white/50 hover:text-white glass hover:border-white/15 rounded-full transition-all duration-300"
            >
              Learn more
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-3xl mx-auto mt-36">
          <div className="glass rounded-2xl liquid-shine p-8">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">$2.4B+</p>
                <p className="text-xs md:text-sm text-white/35 mt-2 uppercase tracking-wider">Calculated</p>
              </div>
              <div className="text-center border-x border-white/[0.06]">
                <p className="text-3xl md:text-4xl font-bold tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">50K+</p>
                <p className="text-xs md:text-sm text-white/35 mt-2 uppercase tracking-wider">Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">99.9%</p>
                <p className="text-xs md:text-sm text-white/35 mt-2 uppercase tracking-wider">Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5 glass-subtle">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
