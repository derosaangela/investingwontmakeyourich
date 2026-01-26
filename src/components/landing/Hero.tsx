import { ArrowRight, TrendingUp, Shield, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-secondary/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-8">
            <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <span className="text-sm font-medium">Trusted by 10,000+ investors worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Build Wealth with
            <span className="block mt-2">Compound Growth</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Calculate your investment returns with precision. Visualize how your money grows over time with our professional compound interest calculator.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="h-14 px-8 text-base font-semibold group"
            >
              Start Calculating
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 text-base font-semibold"
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3 p-6">
              <div className="p-3 rounded-full bg-secondary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Precise Calculations</h3>
              <p className="text-sm text-muted-foreground text-center">
                Industry-standard AER formulas for accurate projections
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6">
              <div className="p-3 rounded-full bg-secondary">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Visual Analytics</h3>
              <p className="text-sm text-muted-foreground text-center">
                Interactive charts to understand your growth trajectory
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6">
              <div className="p-3 rounded-full bg-secondary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Tax Considerations</h3>
              <p className="text-sm text-muted-foreground text-center">
                Factor in tax rates for realistic net returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}