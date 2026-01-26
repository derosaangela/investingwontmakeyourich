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
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0]?.payload as MonthlyBreakdown;
  if (!data) return null;

  return (
    <div className="bg-card border border-border rounded-lg shadow-xl p-4 min-w-[200px]">
      <p className="font-semibold text-foreground mb-3 pb-2 border-b border-border">
        Month {data.month}
      </p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Opening Balance</span>
          <span className="font-medium">{formatCurrency(data.openingBalance)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Monthly Deposit</span>
          <span className="font-medium">{formatCurrency(data.depositAmount)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Interest Earned</span>
          <span className="font-medium text-emerald">{formatCurrency(data.interestEarned)}</span>
        </div>
        <div className="flex justify-between gap-4 pt-2 border-t border-border">
          <span className="text-foreground font-medium">Ending Balance</span>
          <span className="font-semibold">{formatCurrency(data.closingBalance)}</span>
        </div>
      </div>
    </div>
  );
}

export function GrowthChart({ data, initialCapital }: GrowthChartProps) {
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
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <TrendingUp className="h-5 w-5" />
          Growth Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-capital))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-capital))" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-deposits))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--chart-deposits))" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-interest))" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="hsl(var(--chart-interest))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `M${value}`}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
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
                stroke="hsl(var(--chart-capital))"
                fill="url(#colorCapital)"
                strokeWidth={0}
                animationDuration={800}
                animationBegin={0}
              />
              <Area
                type="monotone"
                dataKey="depositsOnTop"
                stackId="1"
                stroke="hsl(var(--chart-deposits))"
                fill="url(#colorDeposits)"
                strokeWidth={0}
                animationDuration={800}
                animationBegin={200}
              />
              <Area
                type="monotone"
                dataKey="interestOnTop"
                stackId="1"
                stroke="hsl(var(--chart-interest))"
                fill="url(#colorInterest)"
                strokeWidth={2}
                animationDuration={800}
                animationBegin={400}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-chart-capital" />
            <span className="text-sm text-muted-foreground">Initial Capital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-chart-deposits" />
            <span className="text-sm text-muted-foreground">Deposits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-chart-interest" />
            <span className="text-sm text-muted-foreground">Interest</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
