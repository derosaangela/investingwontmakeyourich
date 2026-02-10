import { Card, CardContent } from '@/components/ui/card';
import { GoalBasedResult } from '@/types/calculator';
import { formatCurrency } from '@/utils/calculations';

interface GoalSummaryCardProps {
  result: GoalBasedResult;
}

export function GoalSummaryCard({ result }: GoalSummaryCardProps) {
  return (
    <Card className="rounded-2xl border-white/5 bg-white/[0.02]">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-white/40 uppercase tracking-wider">Monthly Needed</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight">
              {formatCurrency(result.requiredMonthlyDeposit)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white/40 uppercase tracking-wider">Total Invested</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-white/60">
              {formatCurrency(result.totalInvested)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white/40 uppercase tracking-wider">Interest Earned</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-white/80">
              {formatCurrency(result.totalInterest)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white/40 uppercase tracking-wider">Goal</p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight">
              {formatCurrency(result.finalBalance)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
