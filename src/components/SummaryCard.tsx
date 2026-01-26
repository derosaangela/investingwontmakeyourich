import { DollarSign, TrendingUp, PiggyBank } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculationResult } from '@/types/calculator';
import { formatCurrency } from '@/utils/calculations';

interface SummaryCardProps {
  result: CalculationResult;
}

export function SummaryCard({ result }: SummaryCardProps) {
  const metrics = [
    {
      label: 'Total Invested',
      value: result.totalInvested,
      icon: DollarSign,
      colorClass: 'text-muted-foreground',
      bgClass: 'bg-secondary',
    },
    {
      label: 'Total Interest Gained',
      value: result.totalInterest,
      icon: TrendingUp,
      colorClass: 'text-foreground',
      bgClass: 'bg-secondary',
    },
    {
      label: 'Final Balance',
      value: result.finalBalance,
      icon: PiggyBank,
      colorClass: 'text-foreground',
      bgClass: 'bg-foreground text-background',
    },
  ];

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <PiggyBank className="h-5 w-5" />
          Financial Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 transition-all hover:bg-secondary/80"
            >
              <div className={`p-3 rounded-lg ${metric.bgClass}`}>
                <metric.icon className={`h-5 w-5 ${metric.colorClass}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className={`text-2xl font-bold tracking-tight ${metric.colorClass}`}>
                  {formatCurrency(metric.value)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {result.taxRate > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Tax on Profit</span>
              <span className="text-destructive font-medium">
                -{formatCurrency(result.taxAmount)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium">Net Balance After Tax</span>
              <span className="text-lg font-bold">{formatCurrency(result.netBalance)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
