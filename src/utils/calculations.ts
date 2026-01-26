import { CalculatorInputs, CalculationResult, MonthlyBreakdown } from '@/types/calculator';

export function calculateCompoundInterest(inputs: CalculatorInputs): CalculationResult {
  // Convert period to years for the formula
  const t = inputs.periodType === 'years' 
    ? inputs.investmentPeriod 
    : inputs.investmentPeriod / 12;
  
  const totalMonths = inputs.periodType === 'years' 
    ? inputs.investmentPeriod * 12 
    : inputs.investmentPeriod;
  
  const P = inputs.initialCapital; // Starting Capital
  const PMT = inputs.monthlyDeposit; // Monthly Contribution
  const r = inputs.yearlyRate / 100; // AER as decimal
  
  // Monthly interest rate from AER: i = ((1 + r)^(1/12)) - 1
  const i = Math.pow(1 + r, 1 / 12) - 1;
  
  const monthlyData: MonthlyBreakdown[] = [];
  let currentBalance = P;
  let cumulativeInterest = 0;
  let totalDeposits = P;
  
  for (let month = 1; month <= totalMonths; month++) {
    const openingBalance = currentBalance;
    const interestEarned = openingBalance * i;
    const depositAmount = PMT;
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
  
  // Final calculation using the precise formula:
  // Total = P * (1 + r)^t + PMT * ((1 + r)^t - 1) / ((1 + r)^(1/12) - 1)
  const compoundFactor = Math.pow(1 + r, t);
  const finalBalance = r > 0 && i > 0
    ? (P * compoundFactor) + (PMT * ((compoundFactor - 1) / i))
    : P + (PMT * totalMonths);
  
  const totalInvested = P + (PMT * totalMonths);
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
