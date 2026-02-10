import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '@/utils/calculations';
import { TrendingUp, Shield, Wallet, Landmark, AlertTriangle } from 'lucide-react';

interface PlanningInputs {
  monthlyIncome: number;
  housing: number;
  food: number;
  transport: number;
  entertainment: number;
  utilities: number;
  other: number;
}

const defaultInputs: PlanningInputs = {
  monthlyIncome: 5000,
  housing: 1500,
  food: 400,
  transport: 300,
  entertainment: 200,
  utilities: 150,
  other: 200,
};

interface Allocation {
  label: string;
  amount: number;
  percentage: number;
  color: string;
  icon: React.ElementType;
  description: string;
}

function getAllocations(surplus: number, monthlyIncome: number): Allocation[] {
  if (surplus <= 0) return [];

  const savingsRate = surplus / monthlyIncome;

  // Adjust allocation based on how much surplus there is
  let emergency: number, conservative: number, growth: number, aggressive: number;

  if (savingsRate < 0.1) {
    // Low surplus: prioritize emergency fund
    emergency = 0.6;
    conservative = 0.25;
    growth = 0.15;
    aggressive = 0;
  } else if (savingsRate < 0.25) {
    // Moderate surplus: balanced approach
    emergency = 0.3;
    conservative = 0.25;
    growth = 0.3;
    aggressive = 0.15;
  } else {
    // High surplus: more growth-oriented
    emergency = 0.2;
    conservative = 0.2;
    growth = 0.35;
    aggressive = 0.25;
  }

  return [
    {
      label: 'Emergency Fund',
      amount: surplus * emergency,
      percentage: emergency * 100,
      color: 'hsl(0, 0%, 70%)',
      icon: Shield,
      description: 'High-yield savings for 3–6 months of expenses',
    },
    {
      label: 'Conservative',
      amount: surplus * conservative,
      percentage: conservative * 100,
      color: 'hsl(0, 0%, 55%)',
      icon: Landmark,
      description: 'Bonds, index funds, low-volatility ETFs',
    },
    {
      label: 'Growth',
      amount: surplus * growth,
      percentage: growth * 100,
      color: 'hsl(0, 0%, 40%)',
      icon: TrendingUp,
      description: 'Diversified equity funds, S&P 500, tech ETFs',
    },
    {
      label: 'Aggressive',
      amount: surplus * aggressive,
      percentage: aggressive * 100,
      color: 'hsl(0, 0%, 25%)',
      icon: Wallet,
      description: 'Individual stocks, crypto, venture exposure',
    },
  ].filter((a) => a.amount > 0);
}

interface SliderFieldProps {
  label: string;
  value: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function SliderField({ label, value, max, step, onChange }: SliderFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">{label}</span>
        <span className="text-sm font-medium tabular-nums">{formatCurrency(value)}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
}

export function PlanningSection() {
  const [inputs, setInputs] = useState<PlanningInputs>(defaultInputs);

  const update = (key: keyof PlanningInputs, value: number) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const totalSpending = useMemo(
    () => inputs.housing + inputs.food + inputs.transport + inputs.entertainment + inputs.utilities + inputs.other,
    [inputs]
  );

  const surplus = inputs.monthlyIncome - totalSpending;
  const allocations = useMemo(() => getAllocations(surplus, inputs.monthlyIncome), [surplus, inputs.monthlyIncome]);

  const spendingBreakdown = [
    { name: 'Housing', value: inputs.housing, color: 'hsl(0, 0%, 65%)' },
    { name: 'Food', value: inputs.food, color: 'hsl(0, 0%, 55%)' },
    { name: 'Transport', value: inputs.transport, color: 'hsl(0, 0%, 45%)' },
    { name: 'Entertainment', value: inputs.entertainment, color: 'hsl(0, 0%, 35%)' },
    { name: 'Utilities', value: inputs.utilities, color: 'hsl(0, 0%, 28%)' },
    { name: 'Other', value: inputs.other, color: 'hsl(0, 0%, 20%)' },
  ];

  return (
    <section id="planning" className="py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Planning</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Personalized allocation
            </h2>
            <p className="text-white/40 max-w-md mx-auto">
              Input your monthly income and spending to get tailored investment recommendations.
            </p>
          </div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            {/* Input Panel */}
            <aside>
              <Card className="bg-white/[0.02] border-white/5">
                <CardContent className="p-6 space-y-5">
                  <SliderField label="Monthly Income" value={inputs.monthlyIncome} max={30000} step={100} onChange={(v) => update('monthlyIncome', v)} />
                  
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-4">Monthly Expenses</p>
                    <div className="space-y-4">
                      <SliderField label="Housing" value={inputs.housing} max={10000} step={50} onChange={(v) => update('housing', v)} />
                      <SliderField label="Food" value={inputs.food} max={3000} step={25} onChange={(v) => update('food', v)} />
                      <SliderField label="Transport" value={inputs.transport} max={2000} step={25} onChange={(v) => update('transport', v)} />
                      <SliderField label="Entertainment" value={inputs.entertainment} max={2000} step={25} onChange={(v) => update('entertainment', v)} />
                      <SliderField label="Utilities" value={inputs.utilities} max={1500} step={25} onChange={(v) => update('utilities', v)} />
                      <SliderField label="Other" value={inputs.other} max={3000} step={25} onChange={(v) => update('other', v)} />
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <span className="text-sm text-white/50">Monthly Surplus</span>
                    <span className={`text-lg font-semibold tabular-nums ${surplus >= 0 ? 'text-foreground' : 'text-destructive'}`}>
                      {formatCurrency(surplus)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Results */}
            <div className="space-y-6">
              {surplus <= 0 ? (
                <Card className="bg-white/[0.02] border-white/5">
                  <CardContent className="p-10 text-center">
                    <AlertTriangle className="h-10 w-10 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No surplus to invest</h3>
                    <p className="text-sm text-white/40 max-w-sm mx-auto">
                      Your expenses exceed your income. Try reducing spending categories to free up funds for investment.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Spending Pie + Allocation Pie */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white/[0.02] border-white/5">
                      <CardContent className="p-6">
                        <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-4">Spending Breakdown</p>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={spendingBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} strokeWidth={0}>
                                {spendingBreakdown.map((entry, i) => (
                                  <Cell key={i} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value: number) => formatCurrency(value)}
                                contentStyle={{ background: 'hsl(0,0%,8%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {spendingBreakdown.map((s) => (
                            <div key={s.name} className="flex items-center gap-2 text-xs text-white/50">
                              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                              {s.name}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/[0.02] border-white/5">
                      <CardContent className="p-6">
                        <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-4">Recommended Allocation</p>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={allocations} dataKey="amount" nameKey="label" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} strokeWidth={0}>
                                {allocations.map((entry, i) => (
                                  <Cell key={i} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value: number) => formatCurrency(value)}
                                contentStyle={{ background: 'hsl(0,0%,8%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {allocations.map((a) => (
                            <div key={a.label} className="flex items-center gap-2 text-xs text-white/50">
                              <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                              {a.label}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Allocation Cards */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {allocations.map((a) => (
                      <Card key={a.label} className="bg-white/[0.02] border-white/5 hover:border-white/10 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                              <a.icon className="h-5 w-5 text-white/70" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-semibold">{a.label}</h4>
                                <span className="text-sm font-medium tabular-nums">{formatCurrency(a.amount)}<span className="text-white/30">/mo</span></span>
                              </div>
                              <p className="text-xs text-white/30 mb-2">{Math.round(a.percentage)}% of investable surplus</p>
                              <p className="text-xs text-white/50 leading-relaxed">{a.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Annual projection */}
                  <Card className="bg-white/[0.02] border-white/5">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <p className="text-xs text-white/30 mb-1">Monthly Investable</p>
                          <p className="text-xl font-semibold tabular-nums">{formatCurrency(surplus)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-white/30 mb-1">Annual Investment</p>
                          <p className="text-xl font-semibold tabular-nums">{formatCurrency(surplus * 12)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-white/30 mb-1">Savings Rate</p>
                          <p className="text-xl font-semibold tabular-nums">{Math.round((surplus / inputs.monthlyIncome) * 100)}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
