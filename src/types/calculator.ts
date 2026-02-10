export type CalculatorMode = 'recurring' | 'lumpsum' | 'goal' | 'compare';

export interface RecurringInputs {
  initialCapital: number;
  monthlyDeposit: number;
  investmentPeriod: number;
  periodType: 'months' | 'years';
  yearlyRate: number;
  taxRate: number;
}

export interface LumpSumInputs {
  initialCapital: number;
  investmentPeriod: number;
  periodType: 'months' | 'years';
  yearlyRate: number;
  taxRate: number;
}

export interface GoalBasedInputs {
  targetAmount: number;
  investmentPeriod: number;
  periodType: 'months' | 'years';
  yearlyRate: number;
  initialCapital: number;
}

// Keep backward compat alias
export type CalculatorInputs = RecurringInputs;

export interface MonthlyBreakdown {
  month: number;
  openingBalance: number;
  interestEarned: number;
  depositAmount: number;
  closingBalance: number;
  cumulativeInterest: number;
  totalDeposits: number;
}

export interface CalculationResult {
  monthlyData: MonthlyBreakdown[];
  totalInvested: number;
  totalInterest: number;
  finalBalance: number;
  taxAmount: number;
  taxRate: number;
  netBalance: number;
}

export interface GoalBasedResult {
  requiredMonthlyDeposit: number;
  totalInvested: number;
  totalInterest: number;
  finalBalance: number;
  monthlyData: MonthlyBreakdown[];
}
