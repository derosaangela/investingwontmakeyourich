import { DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalculatorInputs } from '@/types/calculator';

interface ConfigurationPanelProps {
  inputs: CalculatorInputs;
  onInputChange: (inputs: CalculatorInputs) => void;
}

export function ConfigurationPanel({ inputs, onInputChange }: ConfigurationPanelProps) {
  const handleChange = (key: keyof CalculatorInputs, value: number | string) => {
    onInputChange({
      ...inputs,
      [key]: value,
    });
  };

  const handleNumericChange = (key: keyof CalculatorInputs, stringValue: string) => {
    const cleanedValue = stringValue.replace(/^0+(?=\d)/, '');
    const numericValue = cleanedValue === '' ? 0 : Number(cleanedValue);
    handleChange(key, numericValue);
  };

  return (
    <Card className="h-fit rounded-2xl border-white/5 bg-white/[0.02]">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <TrendingUp className="h-4 w-4 text-white/50" />
          Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Initial Capital */}
        <div className="space-y-2">
          <Label htmlFor="initialCapital" className="flex items-center gap-2 text-sm font-medium text-white/60">
            <DollarSign className="h-3 w-3" />
            Initial Capital
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
            <Input
              id="initialCapital"
              type="text"
              inputMode="numeric"
              value={inputs.initialCapital === 0 ? '' : inputs.initialCapital}
              onChange={(e) => handleNumericChange('initialCapital', e.target.value.replace(/[^0-9]/g, ''))}
              className="pl-7 h-10 bg-white/[0.03] border-white/10 rounded-xl text-sm"
              placeholder="10,000"
            />
          </div>
        </div>

        {/* Monthly Deposit */}
        <div className="space-y-2">
          <Label htmlFor="monthlyDeposit" className="flex items-center gap-2 text-sm font-medium text-white/60">
            <DollarSign className="h-3 w-3" />
            Monthly Deposit
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
            <Input
              id="monthlyDeposit"
              type="text"
              inputMode="numeric"
              value={inputs.monthlyDeposit === 0 ? '' : inputs.monthlyDeposit}
              onChange={(e) => handleNumericChange('monthlyDeposit', e.target.value.replace(/[^0-9]/g, ''))}
              className="pl-7 h-10 bg-white/[0.03] border-white/10 rounded-xl text-sm"
              placeholder="500"
            />
          </div>
        </div>

        {/* Investment Period */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium text-white/60">
            <Calendar className="h-3 w-3" />
            Investment Period
          </Label>
          <div className="flex gap-2">
            <Input
              type="text"
              inputMode="numeric"
              value={inputs.investmentPeriod === 0 ? '' : inputs.investmentPeriod}
              onChange={(e) => handleNumericChange('investmentPeriod', e.target.value.replace(/[^0-9]/g, ''))}
              className="h-10 bg-white/[0.03] border-white/10 rounded-xl text-sm flex-1"
              placeholder="10"
            />
            <Select
              value={inputs.periodType}
              onValueChange={(value) => handleChange('periodType', value)}
            >
              <SelectTrigger className="w-24 h-10 bg-white/[0.03] border-white/10 rounded-xl text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10">
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
              <Percent className="h-3 w-3" />
              Interest Rate (AER)
            </span>
            <span className="text-white font-medium">{inputs.yearlyRate}%</span>
          </Label>
          <Slider
            value={[inputs.yearlyRate]}
            onValueChange={([value]) => handleChange('yearlyRate', value)}
            max={30}
            min={0}
            step={0.5}
            className="py-2"
          />
          <div className="flex justify-between text-[10px] text-white/30">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Tax Rate */}
        <div className="space-y-3">
          <Label className="flex items-center justify-between text-sm font-medium text-white/60">
            <span className="flex items-center gap-2">
              <Percent className="h-3 w-3" />
              Tax Rate
            </span>
            <span className="text-white/60">{inputs.taxRate}%</span>
          </Label>
          <Slider
            value={[inputs.taxRate]}
            onValueChange={([value]) => handleChange('taxRate', value)}
            max={50}
            min={0}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-[10px] text-white/30">
            <span>0%</span>
            <span>50%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}