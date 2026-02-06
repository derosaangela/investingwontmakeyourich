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
    <section id="calculator" className="py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Calculator</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Plan your growth
            </h2>
            <p className="text-white/40 max-w-md mx-auto">
              Enter your investment details to visualize compound growth over time.
            </p>
          </div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            {/* Configuration Panel */}
            <aside>
              <ConfigurationPanel inputs={inputs} onInputChange={setInputs} />
            </aside>

            {/* Results */}
            <div className="space-y-6">
              <GrowthChart data={result.monthlyData} initialCapital={inputs.initialCapital} periodType={inputs.periodType} />
              <SummaryCard result={result} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}