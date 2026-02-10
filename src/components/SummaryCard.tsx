import { Card, CardContent } from '@/components/ui/card';
import { CalculationResult } from '@/types/calculator';
import { formatCurrency } from '@/utils/calculations';

interface SummaryCardProps {
  result: CalculationResult;
}

export function SummaryCard({ result }: SummaryCardProps) {
  return (
    <Card className="rounded-2xl glass liquid-shine">
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-white/35 uppercase tracking-wider">Invested</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-white/60">
              {formatCurrency(result.totalInvested)}
            </p>
          </div>
          <div className="space-y-1 border-x border-white/[0.05] px-6">
            <p className="text-xs text-white/35 uppercase tracking-wider">Interest</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-white/80">
              {formatCurrency(result.totalInterest)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white/35 uppercase tracking-wider">Total</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.08)]">
              {formatCurrency(result.finalBalance)}
            </p>
          </div>
        </div>

        {result.taxRate > 0 && (
          <div className="mt-6 pt-6 border-t border-white/[0.05] flex items-center justify-between">
            <div>
              <p className="text-xs text-white/35">After {result.taxRate}% tax</p>
            </div>
            <p className="text-lg font-semibold">{formatCurrency(result.netBalance)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
