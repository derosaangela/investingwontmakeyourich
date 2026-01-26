import { useState, useMemo } from 'react';
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

export function CalculatorSection() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);

  const result = useMemo(() => calculateCompoundInterest(inputs), [inputs]);

  return (
    <section id="calculator" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Compound Interest Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your investment details below to see how your money can grow over time.
          </p>
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-8 max-w-7xl mx-auto">
          {/* Configuration Panel */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ConfigurationPanel inputs={inputs} onInputChange={setInputs} />
          </aside>

          {/* Results */}
          <div className="space-y-8">
            <GrowthChart data={result.monthlyData} initialCapital={inputs.initialCapital} />
            <SummaryCard result={result} />
          </div>
        </div>
      </div>
    </section>
  );
}