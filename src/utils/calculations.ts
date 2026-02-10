import { RecurringInputs, LumpSumInputs, GoalBasedInputs, CalculationResult, GoalBasedResult, MonthlyBreakdown } from '@/types/calculator';

export function calculateRecurring(inputs: RecurringInputs): CalculationResult {
  const t = inputs.periodType === 'years' ? inputs.investmentPeriod : inputs.investmentPeriod / 12;
  const totalMonths = inputs.periodType === 'years' ? inputs.investmentPeriod * 12 : inputs.investmentPeriod;
  
  const P = inputs.initialCapital;
  const PMT = inputs.monthlyDeposit;
  const r = inputs.yearlyRate / 100;
  const n = 12;
  const rn = r / n;
  
  const monthlyData: MonthlyBreakdown[] = [];
  let currentBalance = P;
  let cumulativeInterest = 0;
  let totalDeposits = P;
  
  for (let month = 1; month <= totalMonths; month++) {
    const openingBalance = currentBalance;
    const interestEarned = openingBalance * rn;
    const depositAmount = PMT;
    const closingBalance = openingBalance + interestEarned + depositAmount;
    
    cumulativeInterest += interestEarned;
    totalDeposits += depositAmount;
    
    monthlyData.push({
      month, openingBalance, interestEarned, depositAmount, closingBalance, cumulativeInterest, totalDeposits,
    });
    
    currentBalance = closingBalance;
  }
  
  const compoundFactor = Math.pow(1 + rn, n * t);
  const finalBalance = rn > 0
    ? (P * compoundFactor) + (PMT * ((compoundFactor - 1) / rn))
    : P + (PMT * totalMonths);
  
  const totalInvested = P + (PMT * totalMonths);
  const totalInterest = finalBalance - totalInvested;
  const taxAmount = totalInterest * (inputs.taxRate / 100);
  const netBalance = finalBalance - taxAmount;
  
  return { monthlyData, totalInvested, totalInterest, finalBalance, taxAmount, taxRate: inputs.taxRate, netBalance };
}

export function calculateLumpSum(inputs: LumpSumInputs): CalculationResult {
  const t = inputs.periodType === 'years' ? inputs.investmentPeriod : inputs.investmentPeriod / 12;
  const totalMonths = inputs.periodType === 'years' ? inputs.investmentPeriod * 12 : inputs.investmentPeriod;
  
  const P = inputs.initialCapital;
  const r = inputs.yearlyRate / 100;
  const n = 12;
  const rn = r / n;
  
  const monthlyData: MonthlyBreakdown[] = [];
  let currentBalance = P;
  let cumulativeInterest = 0;
  
  for (let month = 1; month <= totalMonths; month++) {
    const openingBalance = currentBalance;
    const interestEarned = openingBalance * rn;
    const closingBalance = openingBalance + interestEarned;
    
    cumulativeInterest += interestEarned;
    
    monthlyData.push({
      month, openingBalance, interestEarned, depositAmount: 0, closingBalance, cumulativeInterest, totalDeposits: P,
    });
    
    currentBalance = closingBalance;
  }
  
  const compoundFactor = Math.pow(1 + rn, n * t);
  const finalBalance = rn > 0 ? P * compoundFactor : P;
  
  const totalInterest = finalBalance - P;
  const taxAmount = totalInterest * (inputs.taxRate / 100);
  const netBalance = finalBalance - taxAmount;
  
  return { monthlyData, totalInvested: P, totalInterest, finalBalance, taxAmount, taxRate: inputs.taxRate, netBalance };
}

export function calculateGoalBased(inputs: GoalBasedInputs): GoalBasedResult {
  const t = inputs.periodType === 'years' ? inputs.investmentPeriod : inputs.investmentPeriod / 12;
  const totalMonths = inputs.periodType === 'years' ? inputs.investmentPeriod * 12 : inputs.investmentPeriod;
  
  const P = inputs.initialCapital;
  const FV = inputs.targetAmount;
  const r = inputs.yearlyRate / 100;
  const n = 12;
  const rn = r / n;
  
  // PMT = (FV - P*(1+r/n)^(n*t)) / (((1+r/n)^(n*t) - 1) / (r/n))
  let requiredMonthlyDeposit: number;
  if (rn > 0) {
    const compoundFactor = Math.pow(1 + rn, n * t);
    const futureValueOfPrincipal = P * compoundFactor;
    const annuityFactor = (compoundFactor - 1) / rn;
    requiredMonthlyDeposit = Math.max(0, (FV - futureValueOfPrincipal) / annuityFactor);
  } else {
    requiredMonthlyDeposit = Math.max(0, (FV - P) / totalMonths);
  }
  
  const monthlyData: MonthlyBreakdown[] = [];
  let currentBalance = P;
  let cumulativeInterest = 0;
  let totalDeposits = P;
  
  for (let month = 1; month <= totalMonths; month++) {
    const openingBalance = currentBalance;
    const interestEarned = openingBalance * rn;
    const closingBalance = openingBalance + interestEarned + requiredMonthlyDeposit;
    
    cumulativeInterest += interestEarned;
    totalDeposits += requiredMonthlyDeposit;
    
    monthlyData.push({
      month, openingBalance, interestEarned, depositAmount: requiredMonthlyDeposit, closingBalance, cumulativeInterest, totalDeposits,
    });
    
    currentBalance = closingBalance;
  }
  
  const totalInvested = P + requiredMonthlyDeposit * totalMonths;
  const totalInterest = FV - totalInvested;
  
  return { requiredMonthlyDeposit, totalInvested, totalInterest, finalBalance: FV, monthlyData };
}

// Keep backward compat
export const calculateCompoundInterest = calculateRecurring;

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
