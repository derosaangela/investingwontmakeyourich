import { CalculatorInputs, CalculationResult, MonthlyBreakdown } from '@/types/calculator';

export function calculateCompoundInterest(inputs: CalculatorInputs): CalculationResult {
  const totalMonths = inputs.periodType === 'years' 
    ? inputs.investmentPeriod * 12 
    : inputs.investmentPeriod;
  
  const monthlyRate = inputs.yearlyRate / 100 / 12;
  
  const monthlyData: MonthlyBreakdown[] = [];
  let currentBalance = inputs.initialCapital;
  let cumulativeInterest = 0;
  let totalDeposits = inputs.initialCapital;
  
  for (let month = 1; month <= totalMonths; month++) {
    const openingBalance = currentBalance;
    const interestEarned = openingBalance * monthlyRate;
    const depositAmount = inputs.monthlyDeposit;
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
  
  const totalInvested = inputs.initialCapital + (inputs.monthlyDeposit * totalMonths);
  const totalInterest = cumulativeInterest;
  const finalBalance = currentBalance;
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
