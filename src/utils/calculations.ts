import { CalculatorInputs, CalculationResult, MonthlyBreakdown } from '@/types/calculator';

export function calculateCompoundInterest(inputs: CalculatorInputs): CalculationResult {
  const totalMonths = inputs.periodType === 'years' 
    ? inputs.investmentPeriod * 12 
    : inputs.investmentPeriod;
  
  const P = inputs.initialCapital; // Initial Principal
  const D = inputs.monthlyDeposit; // Monthly Deposit
  const r = inputs.yearlyRate / 100; // Annual Equivalent Rate as decimal
  const N = totalMonths; // Total number of months
  
  // Monthly interest rate from AER: i = ((1 + r)^(1/12)) - 1
  const i = Math.pow(1 + r, 1 / 12) - 1;
  
  const monthlyData: MonthlyBreakdown[] = [];
  let currentBalance = P;
  let cumulativeInterest = 0;
  let totalDeposits = P;
  
  for (let month = 1; month <= N; month++) {
    const openingBalance = currentBalance;
    const interestEarned = openingBalance * i;
    const depositAmount = D;
    const closingBalance = openingBalance + interestEarned + depositAmount;
    
    cumulativeInterest += interestEarned;
    totalDeposits += depositAmount;
    
    monthlyData.push({
      month,
      openingBalance,
      interestEarned,
      depositAmount,
      closingBalance,
      cumulativeInterest,
      totalDeposits,
    });
    
    currentBalance = closingBalance;
  }
  
  // Final calculation using the precise formula
  // Ending_Balance = (P * ((1 + i)^N)) + (D * (((1 + i)^N) - 1) / i)
  const compoundFactor = Math.pow(1 + i, N);
  const finalBalance = i > 0 
    ? (P * compoundFactor) + (D * ((compoundFactor - 1) / i))
    : P + (D * N);
  
  const totalInvested = P + (D * N);
  // Total_Interest = Ending_Balance - (P + (D * N))
  const totalInterest = finalBalance - totalInvested;
  const taxAmount = totalInterest * (inputs.taxRate / 100);
  const netBalance = finalBalance - taxAmount;
  
  return {
    monthlyData,
    totalInvested,
    totalInterest,
    finalBalance,
    taxAmount,
    taxRate: inputs.taxRate,
    netBalance,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyCompact(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return formatCurrency(value);
}
