export interface SurveyAnswers {
  hasHighInterestDebt: 'yes' | 'no' | null;
  debtTypes: string[];
  monthlyEssentials: number;
  currentSavings: number;
  incomeStability: 'stable' | 'variable' | null;
  savingsAccountType: 'standard' | 'hysa' | 'none' | null;
  hasISA: 'yes' | 'no' | null;
  investmentExperience: 'none' | 'beginner' | 'intermediate' | null;
  riskTolerance: 'conservative' | 'balanced' | 'aggressive' | null;
}

export const defaultAnswers: SurveyAnswers = {
  hasHighInterestDebt: null,
  debtTypes: [],
  monthlyEssentials: 1500,
  currentSavings: 0,
  incomeStability: null,
  savingsAccountType: null,
  hasISA: null,
  investmentExperience: null,
  riskTolerance: null,
};

export interface PhaseResult {
  currentPhase: number;
  phases: {
    phase: number;
    title: string;
    status: 'complete' | 'current' | 'locked';
    summary: string;
    actions: string[];
  }[];
  emergencyTarget: number;
  emergencyMonths: number;
  savingsGap: number;
  monthlyEssentials: number;
  currentSavings: number;
  incomeStability: 'stable' | 'variable' | null;
  riskTolerance: 'conservative' | 'balanced' | 'aggressive' | null;
}

function getPhase4Actions(answers: SurveyAnswers): string[] {
  const base = ['Open a Stocks & Shares ISA (£20,000/year tax-free allowance)'];

  if (answers.riskTolerance === 'conservative') {
    base.push(
      'Focus on bond-heavy funds or multi-asset funds with 60–80% bonds (e.g. Vanguard LifeStrategy 20% Equity)',
      'Consider a global bond index fund alongside a small equity allocation for growth',
      'Choose a zero/low-fee platform: Trading 212, InvestEngine, or Freetrade for smaller balances',
      'Keep total fees under 0.5% — lower turnover funds have lower costs',
      'Set up a regular monthly investment and avoid checking daily — volatility will be low',
    );
  } else if (answers.riskTolerance === 'aggressive') {
    base.push(
      'Invest primarily in 100% equity global index funds (e.g. FTSE Global All Cap, S&P 500 ETF)',
      'Consider adding a small-cap or emerging markets ETF for higher growth potential (10–20% of portfolio)',
      'Choose a zero/low-fee platform: Trading 212, InvestEngine, or Freetrade for smaller balances',
      'For larger portfolios (£50k+), consider flat-fee platforms like Interactive Investor (£5.99/mo)',
      'Keep total fees under 1% — accept higher volatility for potentially higher long-term returns',
      'Set up a regular monthly investment to benefit from pound-cost averaging through market dips',
    );
  } else {
    // balanced (default)
    base.push(
      'Buy a balanced global index fund or ETF (e.g. Vanguard LifeStrategy 60% Equity, FTSE Global All Cap)',
      'Choose a zero/low-fee platform: Trading 212, InvestEngine, or Freetrade for smaller balances',
      'For larger portfolios (£50k+), consider flat-fee platforms like Interactive Investor (£5.99/mo)',
      'Keep total fees under 1% (platform + fund fees combined)',
      'Set up a regular monthly investment to benefit from pound-cost averaging',
      'Rebalance once a year to maintain your target equity/bond split',
    );
  }

  return base;
}

export function evaluatePhase(answers: SurveyAnswers): PhaseResult {
  const monthsNeeded = answers.incomeStability === 'variable' ? 6 : 3;
  const emergencyTarget = answers.monthlyEssentials * monthsNeeded;
  const savingsGap = Math.max(0, emergencyTarget - answers.currentSavings);

  let currentPhase = 1;

  if (answers.hasHighInterestDebt === 'no') {
    currentPhase = 2;
  } else {
    return buildResult(1, answers, emergencyTarget, monthsNeeded, savingsGap);
  }

  if (answers.currentSavings >= emergencyTarget) {
    currentPhase = 3;
  } else {
    return buildResult(2, answers, emergencyTarget, monthsNeeded, savingsGap);
  }

  if (answers.savingsAccountType === 'hysa') {
    currentPhase = 4;
  } else {
    return buildResult(3, answers, emergencyTarget, monthsNeeded, savingsGap);
  }

  return buildResult(4, answers, emergencyTarget, monthsNeeded, savingsGap);
}

function buildResult(
  current: number,
  answers: SurveyAnswers,
  emergencyTarget: number,
  emergencyMonths: number,
  savingsGap: number
): PhaseResult {
  const phaseData = [
    {
      phase: 1,
      title: 'Clear High-Interest Debt',
      summary:
        current === 1
          ? 'You have high-interest debt that should be cleared before investing. Debt at 20%+ APR outpaces average market returns.'
          : 'No high-interest debt - you are clear to move forward.',
      actions:
        current === 1
          ? [
              'List all debts with interest rates above 10%',
              'Use the avalanche method: pay minimums on all, then throw extra at the highest-rate debt',
              'Mortgages and government student loans are exceptions - keep making standard payments',
              'Once cleared, redirect those payments into savings',
            ]
          : ['Completed'],
    },
    {
      phase: 2,
      title: 'Fund Your Emergency Savings',
      summary:
        current === 2
          ? savingsGap <= 0
            ? `Your emergency fund (${formatGBP(emergencyTarget)}) is fully funded. Stop contributing to emergency savings and invest the rest.`
            : `You need ${emergencyMonths} months of essential expenses (${formatGBP(emergencyTarget)}) saved. You are ${formatGBP(savingsGap)} short.`
          : current > 2
          ? `Emergency fund of ${formatGBP(emergencyTarget)} is fully funded.`
          : 'Complete Phase 1 first.',
      actions:
        current === 2
          ? savingsGap <= 0
            ? [
                `You have ${formatGBP(answers.currentSavings)} saved - enough to cover ${emergencyMonths} months of expenses.`,
                'Set this amount aside in an easy-access account (Phase 3).',
                'Going forward, contribute £0 per month to emergency savings.',
                'Redirect all new surplus income to investing (Phase 4).',
              ]
            : [
                `Target: ${formatGBP(emergencyTarget)} (${emergencyMonths} months x ${formatGBP(answers.monthlyEssentials)}/mo)`,
                `You still need ${formatGBP(savingsGap)} - start with a ${formatGBP(1000)} mini-goal if the full amount feels far off`,
                'Set up an automatic monthly transfer on payday.',
                'Only count essential expenses: rent, utilities, groceries, transport.',
              ]
          : current > 2
          ? ['Completed']
          : ['Complete Phase 1 first'],
    },
    {
      phase: 3,
      title: 'Optimize Your Cash Storage',
      summary:
        current === 3
          ? 'Your savings are not in a high-yield account. You are losing money to inflation.'
          : current > 3
          ? 'Cash is optimized in a high-yield account.'
          : 'Complete earlier phases first.',
      actions:
        current === 3
          ? [
              'Move emergency fund to a high-yield savings account (3.5-4.0% easy-access)',
              'Consider regular savers for monthly contributions (up to 7.0-7.5% on small amounts)',
              'Some platforms like Trading 212 pay 4.5% on uninvested cash',
              'Keep the account easy-access - never lock up your emergency fund',
            ]
          : current > 3
          ? ['Completed']
          : ['Complete earlier phases first'],
    },
    {
      phase: 4,
      title: 'Begin Investing via Low-Fee Platforms',
      summary:
        current === 4
          ? `You are ready to invest. Your risk profile is ${answers.riskTolerance ?? 'balanced'} — recommendations are tailored accordingly.`
          : 'Complete earlier phases first.',
      actions:
        current === 4
          ? getPhase4Actions(answers)
          : ['Complete earlier phases first'],
    },
  ];

  return {
    currentPhase: current,
    phases: phaseData.map((p) => ({
      ...p,
      status: (p.phase < current ? 'complete' : p.phase === current ? 'current' : 'locked') as 'complete' | 'current' | 'locked',
    })),
    emergencyTarget,
    emergencyMonths,
    savingsGap,
    monthlyEssentials: answers.monthlyEssentials,
    currentSavings: answers.currentSavings,
    incomeStability: answers.incomeStability,
    riskTolerance: answers.riskTolerance,
  };
}

function formatGBP(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
