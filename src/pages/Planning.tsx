import { useState } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InvestmentSurvey } from '@/components/planning/InvestmentSurvey';
import { PlanResults } from '@/components/planning/PlanResults';
import { PlanningSection } from '@/components/landing/PlanningSection';
import { SurveyAnswers, PhaseResult, evaluatePhase } from '@/components/planning/types';

const Planning = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<PhaseResult | null>(null);

  const handleGetStarted = () => {
    navigate('/#calculator');
  };

  const handleSurveyComplete = (answers: SurveyAnswers) => {
    setResult(evaluatePhase(answers));
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onGetStarted={handleGetStarted} />
      <main className="pt-16">
        <div className="container mx-auto px-6 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Planning</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {result ? 'Your Investment Roadmap' : 'Investment Readiness Assessment'}
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {result
                  ? 'Follow these phases in order to build a solid financial foundation before investing.'
                  : 'Answer a few questions about your finances to get a personalised step-by-step plan.'}
              </p>
            </div>

            {result ? (
              <PlanResults result={result} onReset={handleReset} />
            ) : (
              <InvestmentSurvey onComplete={handleSurveyComplete} />
            )}
          </div>
        </section>

        {/* Keep the allocation tool below for users who reach Phase 4 */}
        {result && result.currentPhase === 4 && <PlanningSection />}
      </main>
      <Footer />
    </div>
  );
};

export default Planning;
