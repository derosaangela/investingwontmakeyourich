import { Card, CardContent } from '@/components/ui/card';
import { GoalBasedResult } from '@/types/calculator';
import { formatCurrency } from '@/utils/calculations';

interface GoalSummaryCardProps {
  result: GoalBasedResult;
}

export function GoalSummaryCard({ result }: GoalSummaryCardProps) {
  return (
    <Card className="rounded-2xl glass liquid-shine">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-white/35 uppercase tracking-wider">Monthly Needed</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.08)]">
              {formatCurrency(result.requiredMonthlyDeposit)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white/35 uppercase tracking-wider">Total Invested</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-white/60">
              {formatCurrency(result.totalInvested)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white/35 uppercase tracking-wider">Interest Earned</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-white/80">
              {formatCurrency(result.totalInterest)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white/35 uppercase tracking-wider">Goal</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.08)]">
              {formatCurrency(result.finalBalance)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
