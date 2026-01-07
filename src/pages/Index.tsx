import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { GrowthChart } from '@/components/GrowthChart';
import { SummaryCard } from '@/components/SummaryCard';
import { CalculatorInputs } from '@/types/calculator';
import { calculateCompoundInterest } from '@/utils/calculations';

const defaultInputs: CalculatorInputs = {
  initialCapital: 10000,
  monthlyDeposit: 500,
  investmentPeriod: 10,
  periodType: 'years',
  yearlyRate: 8,
  taxRate: 0,
};

const Index = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);

  const result = useMemo(() => calculateCompoundInterest(inputs), [inputs]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Compound Interest Calculator</h1>
              <p className="text-sm text-muted-foreground">
                Visualize your investment growth over time
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Left Sidebar - Configuration */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ConfigurationPanel inputs={inputs} onInputChange={setInputs} />
          </aside>

          {/* Main Area - Chart and Summary */}
          <div className="space-y-6">
            <GrowthChart data={result.monthlyData} initialCapital={inputs.initialCapital} />
            <SummaryCard result={result} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Calculations are for illustrative purposes only. Actual returns may vary.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
