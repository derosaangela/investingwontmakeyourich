import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { MonthlyBreakdown } from '@/types/calculator';
import { formatCurrency, formatCurrencyCompact } from '@/utils/calculations';

interface GrowthChartProps {
  data: MonthlyBreakdown[];
  initialCapital: number;
  periodType: 'months' | 'years';
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0]?.payload as MonthlyBreakdown;
  if (!data) return null;

  return (
    <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 min-w-[180px]">
      <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
        {data.month % 12 === 0 ? `Year ${data.month / 12}` : `Month ${data.month}`}
      </p>
      <div className="space-y-2">
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-white/50">Balance</span>
          <span className="font-medium">{formatCurrency(data.closingBalance)}</span>
        </div>
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-white/50">Interest</span>
          <span className="font-medium text-white/70">{formatCurrency(data.interestEarned)}</span>
        </div>
      </div>
    </div>
  );
}

export function GrowthChart({ data, initialCapital, periodType }: GrowthChartProps) {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      startingCapital: initialCapital,
      depositsOnTop: item.totalDeposits - initialCapital,
      interestOnTop: item.cumulativeInterest,
    }));
  }, [data, initialCapital]);

  const maxValue = useMemo(() => {
    if (data.length === 0) return 10000;
    return Math.max(...data.map((d) => d.closingBalance));
  }, [data]);

  return (
    <Card className="rounded-2xl border-white/5 bg-white/[0.02]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <TrendingUp className="h-4 w-4 text-white/50" />
          Growth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(255,255,255,0.15)" stopOpacity={1} />
                  <stop offset="95%" stopColor="rgba(255,255,255,0)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(255,255,255,0.25)" stopOpacity={1} />
                  <stop offset="95%" stopColor="rgba(255,255,255,0.05)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(255,255,255,0.5)" stopOpacity={1} />
                  <stop offset="95%" stopColor="rgba(255,255,255,0.1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.2)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  if (periodType === 'years') {
                    if (value % 12 === 0) return `${value / 12}y`;
                    return '';
                  }
                  return `${value}`;
                }}
                interval={periodType === 'years' ? 11 : 'preserveStartEnd'}
              />
              <YAxis
                stroke="rgba(255,255,255,0.2)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrencyCompact(value)}
                domain={[0, maxValue * 1.1]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="startingCapital"
                stackId="1"
                stroke="transparent"
                fill="url(#colorCapital)"
                animationDuration={800}
                animationBegin={0}
              />
              <Area
                type="monotone"
                dataKey="depositsOnTop"
                stackId="1"
                stroke="transparent"
                fill="url(#colorDeposits)"
                animationDuration={800}
                animationBegin={200}
              />
              <Area
                type="monotone"
                dataKey="interestOnTop"
                stackId="1"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={1.5}
                fill="url(#colorInterest)"
                animationDuration={800}
                animationBegin={400}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <span className="text-xs text-white/40">Capital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/40" />
            <span className="text-xs text-white/40">Deposits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/70" />
            <span className="text-xs text-white/40">Interest</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}