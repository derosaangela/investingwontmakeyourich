import { useRef } from 'react';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { CalculatorSection } from '@/components/landing/CalculatorSection';

import { Footer } from '@/components/landing/Footer';

const Index = () => {
  const calculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onGetStarted={scrollToCalculator} />
      
      <main className="pt-16">
        <Hero onGetStarted={scrollToCalculator} />
        <Features />
        <div ref={calculatorRef}>
          <CalculatorSection />
        </div>
        
      </main>

      <Footer />
    </div>
  );
};

export default Index;