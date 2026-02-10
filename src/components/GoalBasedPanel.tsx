import { DollarSign, Percent, Calendar, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GoalBasedInputs } from '@/types/calculator';

interface GoalBasedPanelProps {
  inputs: GoalBasedInputs;
  onInputChange: (inputs: GoalBasedInputs) => void;
}

export function GoalBasedPanel({ inputs, onInputChange }: GoalBasedPanelProps) {
  const handleChange = (key: keyof GoalBasedInputs, value: number | string) => {
    onInputChange({ ...inputs, [key]: value });
  };

  const handleNumericChange = (key: keyof GoalBasedInputs, stringValue: string) => {
    const cleanedValue = stringValue.replace(/^0+(?=\d)/, '');
    const numericValue = cleanedValue === '' ? 0 : Number(cleanedValue);
    handleChange(key, numericValue);
  };

  return (
    <Card className="h-fit rounded-2xl glass liquid-shine">
      <CardContent className="pt-6 space-y-6">
        {/* Target Amount */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-white/60">
            <Target className="h-3.5 w-3.5" />
            Target Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
            <Input
              type="text"
              inputMode="numeric"
              value={inputs.targetAmount === 0 ? '' : inputs.targetAmount}
              onChange={(e) => handleNumericChange('targetAmount', e.target.value.replace(/[^0-9]/g, ''))}
              className="pl-7 h-10 glass-subtle border-white/[0.06] rounded-xl text-sm focus:border-white/20"
              placeholder="100,000"
            />
          </div>
        </div>

        {/* Starting Capital */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-white/60">
            <DollarSign className="h-3.5 w-3.5" />
            Starting Capital
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
            <Input
              type="text"
              inputMode="numeric"
              value={inputs.initialCapital === 0 ? '' : inputs.initialCapital}
              onChange={(e) => handleNumericChange('initialCapital', e.target.value.replace(/[^0-9]/g, ''))}
              className="pl-7 h-10 glass-subtle border-white/[0.06] rounded-xl text-sm focus:border-white/20"
              placeholder="5,000"
            />
          </div>
        </div>

        {/* Investment Period */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-white/60">
            <Calendar className="h-3.5 w-3.5" />
            Time Horizon
          </Label>
          <div className="flex gap-2">
            <Input
              type="text"
              inputMode="numeric"
              value={inputs.investmentPeriod === 0 ? '' : inputs.investmentPeriod}
              onChange={(e) => handleNumericChange('investmentPeriod', e.target.value.replace(/[^0-9]/g, ''))}
              className="h-10 glass-subtle border-white/[0.06] rounded-xl text-sm flex-1 focus:border-white/20"
              placeholder="10"
            />
            <Select value={inputs.periodType} onValueChange={(value) => handleChange('periodType', value)}>
              <SelectTrigger className="w-24 h-10 glass-subtle border-white/[0.06] rounded-xl text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-strong border-white/10 z-50 rounded-xl">
                <SelectItem value="years">Years</SelectItem>
                <SelectItem value="months">Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Yearly Interest Rate */}
        <div className="space-y-3">
          <Label className="flex items-center justify-between text-sm font-medium text-white/60">
            <span className="flex items-center gap-2">
              <Percent className="h-3.5 w-3.5" />
              Expected Return (AER)
            </span>
            <span className="text-white font-medium">{inputs.yearlyRate}%</span>
          </Label>
          <Slider
            value={[inputs.yearlyRate]}
            onValueChange={([value]) => handleChange('yearlyRate', value)}
            max={30} min={0} step={0.5}
            className="py-2"
          />
          <div className="flex justify-between text-[10px] text-white/30">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
