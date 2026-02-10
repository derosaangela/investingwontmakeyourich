import { useState, useMemo } from 'react';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { LumpSumPanel } from '@/components/LumpSumPanel';
import { GoalBasedPanel } from '@/components/GoalBasedPanel';
import { GrowthChart } from '@/components/GrowthChart';
import { SummaryCard } from '@/components/SummaryCard';
import { GoalSummaryCard } from '@/components/GoalSummaryCard';
import { RecurringInputs, LumpSumInputs, GoalBasedInputs, CalculatorMode } from '@/types/calculator';
import { calculateRecurring, calculateLumpSum, calculateGoalBased } from '@/utils/calculations';

const defaultRecurring: RecurringInputs = {
  initialCapital: 10000,
  monthlyDeposit: 500,
  investmentPeriod: 10,
  periodType: 'years',
  yearlyRate: 8,
  taxRate: 0,
};

const defaultLumpSum: LumpSumInputs = {
  initialCapital: 50000,
  investmentPeriod: 10,
  periodType: 'years',
  yearlyRate: 8,
  taxRate: 0,
};

const defaultGoal: GoalBasedInputs = {
  targetAmount: 100000,
  initialCapital: 5000,
  investmentPeriod: 10,
  periodType: 'years',
  yearlyRate: 8,
};

const tabs: { key: CalculatorMode; label: string }[] = [
  { key: 'recurring', label: 'Recurring' },
  { key: 'lumpsum', label: 'Lump Sum' },
  { key: 'goal', label: 'Goal' },
];

export function CalculatorSection() {
  const [mode, setMode] = useState<CalculatorMode>('recurring');
  const [recurringInputs, setRecurringInputs] = useState<RecurringInputs>(defaultRecurring);
  const [lumpSumInputs, setLumpSumInputs] = useState<LumpSumInputs>(defaultLumpSum);
  const [goalInputs, setGoalInputs] = useState<GoalBasedInputs>(defaultGoal);

  const recurringResult = useMemo(() => calculateRecurring(recurringInputs), [recurringInputs]);
  const lumpSumResult = useMemo(() => calculateLumpSum(lumpSumInputs), [lumpSumInputs]);
  const goalResult = useMemo(() => calculateGoalBased(goalInputs), [goalInputs]);

  const chartData = mode === 'recurring'
    ? recurringResult.monthlyData
    : mode === 'lumpsum'
    ? lumpSumResult.monthlyData
    : goalResult.monthlyData;

  const initialCapital = mode === 'recurring'
    ? recurringInputs.initialCapital
    : mode === 'lumpsum'
    ? lumpSumInputs.initialCapital
    : goalInputs.initialCapital;

  const periodType = mode === 'recurring'
    ? recurringInputs.periodType
    : mode === 'lumpsum'
    ? lumpSumInputs.periodType
    : goalInputs.periodType;

  return (
    <section id="calculator" className="py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Calculator</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Plan your growth
            </h2>
            <p className="text-white/40 max-w-md mx-auto mb-8">
              Enter your investment details to visualize compound growth over time.
            </p>

            {/* Tabs */}
            <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl glass">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setMode(tab.key)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    mode === tab.key
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            {/* Configuration Panel */}
            <aside>
              {mode === 'recurring' && (
                <ConfigurationPanel inputs={recurringInputs} onInputChange={setRecurringInputs} />
              )}
              {mode === 'lumpsum' && (
                <LumpSumPanel inputs={lumpSumInputs} onInputChange={setLumpSumInputs} />
              )}
              {mode === 'goal' && (
                <GoalBasedPanel inputs={goalInputs} onInputChange={setGoalInputs} />
              )}
            </aside>

            {/* Results */}
            <div className="space-y-6">
              <GrowthChart data={chartData} initialCapital={initialCapital} periodType={periodType} />
              {mode === 'goal' ? (
                <GoalSummaryCard result={goalResult} />
              ) : (
                <SummaryCard result={mode === 'recurring' ? recurringResult : lumpSumResult} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
