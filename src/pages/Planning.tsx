import { Header } from '@/components/landing/Header';
import { PlanningSection } from '@/components/landing/PlanningSection';
import { Footer } from '@/components/landing/Footer';
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
        <PlanningSection />
      </main>
      <Footer />
    </div>
  );
};

export default Planning;
