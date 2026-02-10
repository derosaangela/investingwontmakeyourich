import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalculationResult, GoalBasedResult } from '@/types/calculator';
import { formatCurrency, formatCurrencyCompact } from '@/utils/calculations';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { RefreshCw, Landmark, Target } from 'lucide-react';

interface CompareViewProps {
  recurringResult: CalculationResult;
  lumpSumResult: CalculationResult;
  goalResult: GoalBasedResult;
}

const modeColors = {
  recurring: 'rgba(255,255,255,0.7)',
  lumpsum: 'rgba(255,255,255,0.45)',
  goal: 'rgba(255,255,255,0.25)',
};

export function CompareView({ recurringResult, lumpSumResult, goalResult }: CompareViewProps) {
  const modes = useMemo(() => [
    {
      key: 'recurring',
      label: 'Recurring',
      icon: RefreshCw,
      invested: recurringResult.totalInvested,
      interest: recurringResult.totalInterest,
      total: recurringResult.finalBalance,
      color: modeColors.recurring,
    },
    {
      key: 'lumpsum',
      label: 'Lump Sum',
      icon: Landmark,
      invested: lumpSumResult.totalInvested,
      interest: lumpSumResult.totalInterest,
      total: lumpSumResult.finalBalance,
      color: modeColors.lumpsum,
    },
    {
      key: 'goal',
      label: 'Goal',
      icon: Target,
      invested: goalResult.totalInvested,
      interest: goalResult.totalInterest,
      total: goalResult.finalBalance,
      color: modeColors.goal,
    },
  ], [recurringResult, lumpSumResult, goalResult]);

  const barData = useMemo(() => modes.map((m) => ({
    name: m.label,
    invested: m.invested,
    interest: m.interest,
    total: m.total,
    color: m.color,
  })), [modes]);

  const maxTotal = Math.max(...modes.map((m) => m.total));

  return (
    <div className="space-y-6">
      {/* Bar Chart Comparison */}
      <Card className="rounded-2xl border-white/5 bg-white/[0.02]">
        <CardContent className="p-6">
          <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-6">Final Balance Comparison</p>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.6)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => formatCurrencyCompact(v)} />
                <Tooltip
                  formatter={(value: number, name: string) => [formatCurrency(value), name === 'invested' ? 'Invested' : 'Interest']}
                  contentStyle={{ background: 'hsl(0,0%,8%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px' }}
                />
                <Bar dataKey="invested" stackId="a" radius={[0, 0, 0, 0]} fill="rgba(255,255,255,0.2)" />
                <Bar dataKey="interest" stackId="a" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-xs text-white/40">Invested</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/50" />
              <span className="text-xs text-white/40">Interest</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side-by-Side Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {modes.map((m) => (
          <Card key={m.key} className="rounded-2xl border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                  <m.icon className="h-4 w-4 text-white/70" />
                </div>
                <h3 className="text-sm font-semibold">{m.label}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-white/30 mb-1">Total Invested</p>
                  <p className="text-lg font-semibold tabular-nums text-white/60">{formatCurrency(m.invested)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-1">Interest Earned</p>
                  <p className="text-lg font-semibold tabular-nums text-white/80">{formatCurrency(m.interest)}</p>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-xs text-white/30 mb-1">Final Balance</p>
                  <p className="text-xl font-semibold tabular-nums">{formatCurrency(m.total)}</p>
                </div>

                {/* Relative bar */}
                <div className="pt-2">
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(m.total / maxTotal) * 100}%`,
                        background: m.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
