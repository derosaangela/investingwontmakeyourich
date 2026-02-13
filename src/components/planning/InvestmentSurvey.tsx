import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, CreditCard, PiggyBank, Landmark, TrendingUp, Shield } from 'lucide-react';
import { SurveyAnswers, defaultAnswers } from './types';

interface Props {
  onComplete: (answers: SurveyAnswers) => void;
}

const STEPS = [
  { icon: CreditCard, label: 'Debt' },
  { icon: PiggyBank, label: 'Savings' },
  { icon: Landmark, label: 'Cash' },
  { icon: TrendingUp, label: 'Investing' },
  { icon: Shield, label: 'Risk' },
];

export function InvestmentSurvey({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>(defaultAnswers);

  const update = <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return answers.hasHighInterestDebt !== null;
      case 1:
        return answers.incomeStability !== null;
      case 2:
        return answers.savingsAccountType !== null;
      case 3:
        return answers.investmentExperience !== null;
      case 4:
        return answers.riskTolerance !== null;
      default:
        return false;
    }
  };

  const next = () => {
    if (step < 4) setStep(step + 1);
    else onComplete(answers);
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const progress = ((step + 1) / 5) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                i <= step ? 'bg-white/10 text-foreground' : 'bg-white/[0.03] text-muted-foreground'
              }`}
            >
              <s.icon className="h-5 w-5" />
            </div>
            <span className={`text-xs ${i <= step ? 'text-foreground/70' : 'text-muted-foreground'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <Progress value={progress} className="h-1 mb-8 bg-white/5" />

      <Card className="bg-white/[0.02] border-white/5">
        <CardContent className="p-8">
          {step === 0 && <DebtStep answers={answers} update={update} />}
          {step === 1 && <SavingsStep answers={answers} update={update} />}
          {step === 2 && <CashStep answers={answers} update={update} />}
          {step === 3 && <InvestingStep answers={answers} update={update} />}
          {step === 4 && <RiskStep answers={answers} update={update} />}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
            <Button
              variant="ghost"
              size="sm"
              onClick={back}
              disabled={step === 0}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              size="sm"
              onClick={next}
              disabled={!canProceed()}
              className="gap-2"
            >
              {step === 4 ? 'See My Plan' : 'Continue'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---- Option button ---- */
function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        selected
          ? 'border-white/20 bg-white/[0.06] text-foreground'
          : 'border-white/5 bg-white/[0.02] text-muted-foreground hover:border-white/10 hover:bg-white/[0.04]'
      }`}
    >
      {children}
    </button>
  );
}

/* ---- Step 1: Debt ---- */
function DebtStep({
  answers,
  update,
}: {
  answers: SurveyAnswers;
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Do you have high-interest debt?</h3>
        <p className="text-sm text-muted-foreground">
          This includes credit cards, unauthorized overdrafts, or personal loans with rates above 10%.
          Mortgages and government student loans don't count.
        </p>
      </div>
      <div className="space-y-3">
        <OptionButton
          selected={answers.hasHighInterestDebt === 'yes'}
          onClick={() => update('hasHighInterestDebt', 'yes')}
        >
          <p className="font-medium">Yes, I have high-interest debt</p>
          <p className="text-xs text-muted-foreground mt-1">
            Credit cards, overdrafts, or loans above 10% APR
          </p>
        </OptionButton>
        <OptionButton
          selected={answers.hasHighInterestDebt === 'no'}
          onClick={() => update('hasHighInterestDebt', 'no')}
        >
          <p className="font-medium">No, I'm debt-free (or only have mortgage/student loans)</p>
          <p className="text-xs text-muted-foreground mt-1">
            Only structured, low-interest obligations
          </p>
        </OptionButton>
      </div>
    </div>
  );
}

/* ---- Step 2: Emergency Savings ---- */
function SavingsStep({
  answers,
  update,
}: {
  answers: SurveyAnswers;
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void;
}) {
  const months = answers.incomeStability === 'variable' ? 6 : 3;
  const target = answers.monthlyEssentials * months;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Emergency fund assessment</h3>
        <p className="text-sm text-muted-foreground">
          You need cash to cover 3–6 months of essential expenses. Let's calculate your target.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Monthly essential expenses</span>
          <span className="font-medium tabular-nums">
            £{answers.monthlyEssentials.toLocaleString()}
          </span>
        </div>
        <Slider
          value={[answers.monthlyEssentials]}
          onValueChange={([v]) => update('monthlyEssentials', v)}
          max={8000}
          step={50}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Rent, utilities, groceries, transport — no discretionary spending
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Current savings</span>
          <span className="font-medium tabular-nums">
            £{answers.currentSavings.toLocaleString()}
          </span>
        </div>
        <Slider
          value={[answers.currentSavings]}
          onValueChange={([v]) => update('currentSavings', v)}
          max={50000}
          step={100}
          className="w-full"
        />
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3">Is your income stable or variable?</p>
        <div className="grid grid-cols-2 gap-3">
          <OptionButton
            selected={answers.incomeStability === 'stable'}
            onClick={() => update('incomeStability', 'stable')}
          >
            <p className="font-medium text-sm">Stable</p>
            <p className="text-xs text-muted-foreground mt-1">Salaried, consistent pay</p>
          </OptionButton>
          <OptionButton
            selected={answers.incomeStability === 'variable'}
            onClick={() => update('incomeStability', 'variable')}
          >
            <p className="font-medium text-sm">Variable</p>
            <p className="text-xs text-muted-foreground mt-1">Freelance, commission, gig</p>
          </OptionButton>
        </div>
      </div>

      {answers.incomeStability && (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
          <p className="text-sm">
            <span className="text-muted-foreground">Your target: </span>
            <span className="font-semibold">£{target.toLocaleString()}</span>
            <span className="text-muted-foreground"> ({months} months)</span>
          </p>
          {answers.currentSavings < target && (
            <p className="text-xs text-muted-foreground mt-1">
              Gap: £{(target - answers.currentSavings).toLocaleString()} remaining
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ---- Step 3: Cash Storage ---- */
function CashStep({
  answers,
  update,
}: {
  answers: SurveyAnswers;
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Where do you keep your savings?</h3>
        <p className="text-sm text-muted-foreground">
          Standard current accounts pay near-zero interest. Moving to a high-yield account can earn 3.5–4.0% with easy access.
        </p>
      </div>
      <div className="space-y-3">
        <OptionButton
          selected={answers.savingsAccountType === 'hysa'}
          onClick={() => update('savingsAccountType', 'hysa')}
        >
          <p className="font-medium">High-yield savings account</p>
          <p className="text-xs text-muted-foreground mt-1">
            Earning 3%+ interest with easy access
          </p>
        </OptionButton>
        <OptionButton
          selected={answers.savingsAccountType === 'standard'}
          onClick={() => update('savingsAccountType', 'standard')}
        >
          <p className="font-medium">Standard current/savings account</p>
          <p className="text-xs text-muted-foreground mt-1">
            Little to no interest being earned
          </p>
        </OptionButton>
        <OptionButton
          selected={answers.savingsAccountType === 'none'}
          onClick={() => update('savingsAccountType', 'none')}
        >
          <p className="font-medium">I don't have dedicated savings yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Still building up from Phase 2
          </p>
        </OptionButton>
      </div>
    </div>
  );
}

/* ---- Step 4: Investing Experience ---- */
function InvestingStep({
  answers,
  update,
}: {
  answers: SurveyAnswers;
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">What's your investment experience?</h3>
        <p className="text-sm text-muted-foreground">
          This helps us tailor recommendations to your comfort level.
        </p>
      </div>
      <div className="space-y-3">
        <OptionButton
          selected={answers.investmentExperience === 'none'}
          onClick={() => update('investmentExperience', 'none')}
        >
          <p className="font-medium">Complete beginner</p>
          <p className="text-xs text-muted-foreground mt-1">
            I haven't invested before
          </p>
        </OptionButton>
        <OptionButton
          selected={answers.investmentExperience === 'beginner'}
          onClick={() => update('investmentExperience', 'beginner')}
        >
          <p className="font-medium">Some experience</p>
          <p className="text-xs text-muted-foreground mt-1">
            I've used an ISA or bought a few funds/stocks
          </p>
        </OptionButton>
        <OptionButton
          selected={answers.investmentExperience === 'intermediate'}
          onClick={() => update('investmentExperience', 'intermediate')}
        >
          <p className="font-medium">Intermediate</p>
          <p className="text-xs text-muted-foreground mt-1">
            I actively manage a portfolio with ETFs, funds, or individual stocks
          </p>
        </OptionButton>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3">Do you have a Stocks & Shares ISA?</p>
        <div className="grid grid-cols-2 gap-3">
          <OptionButton selected={answers.hasISA === 'yes'} onClick={() => update('hasISA', 'yes')}>
            <p className="font-medium text-sm">Yes</p>
          </OptionButton>
          <OptionButton selected={answers.hasISA === 'no'} onClick={() => update('hasISA', 'no')}>
            <p className="font-medium text-sm">No</p>
          </OptionButton>
        </div>
      </div>
    </div>
  );
}

/* ---- Step 5: Risk Tolerance ---- */
function RiskStep({
  answers,
  update,
}: {
  answers: SurveyAnswers;
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">What's your risk tolerance?</h3>
        <p className="text-sm text-muted-foreground">
          This determines the balance between stability and growth in your investment recommendations.
        </p>
      </div>
      <div className="space-y-3">
        <OptionButton
          selected={answers.riskTolerance === 'conservative'}
          onClick={() => update('riskTolerance', 'conservative')}
        >
          <p className="font-medium">Conservative</p>
          <p className="text-xs text-muted-foreground mt-1">
            Prioritise capital preservation. Lower returns but much less volatility. Mostly bonds with some equity.
          </p>
        </OptionButton>
        <OptionButton
          selected={answers.riskTolerance === 'balanced'}
          onClick={() => update('riskTolerance', 'balanced')}
        >
          <p className="font-medium">Balanced</p>
          <p className="text-xs text-muted-foreground mt-1">
            A mix of equities and bonds. Moderate growth with manageable ups and downs.
          </p>
        </OptionButton>
        <OptionButton
          selected={answers.riskTolerance === 'aggressive'}
          onClick={() => update('riskTolerance', 'aggressive')}
        >
          <p className="font-medium">Aggressive</p>
          <p className="text-xs text-muted-foreground mt-1">
            Maximise long-term growth. Mostly or entirely equities. Higher volatility but historically higher returns.
          </p>
        </OptionButton>
      </div>
    </div>
  );
}
