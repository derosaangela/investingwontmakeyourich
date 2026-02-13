import { Header } from '@/components/landing/Header';
import { PlanningSection } from '@/components/landing/PlanningSection';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Planning = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/#calculator');
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
            className="gap-2 text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        <PlanningSection />
      </main>
      <Footer />
    </div>
  );
};

export default Planning;
