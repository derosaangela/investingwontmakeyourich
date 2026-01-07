export interface CalculatorInputs {
  initialCapital: number;
  monthlyDeposit: number;
  investmentPeriod: number;
  periodType: 'months' | 'years';
  yearlyRate: number;
  taxRate: number;
}

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
