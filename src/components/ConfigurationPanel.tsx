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
    // Remove leading zeros and parse the number
    const cleanedValue = stringValue.replace(/^0+(?=\d)/, '');
    const numericValue = cleanedValue === '' ? 0 : Number(cleanedValue);
    handleChange(key, numericValue);
  };

  return (
    <Card className="h-fit shadow-lg border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <TrendingUp className="h-5 w-5" />
          Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Initial Capital */}
        <div className="space-y-2">
          <Label htmlFor="initialCapital" className="flex items-center gap-2 text-sm font-medium">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            Initial Investment Capital
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="initialCapital"
              type="text"
              inputMode="numeric"
              value={inputs.initialCapital === 0 ? '' : inputs.initialCapital}
              onChange={(e) => handleNumericChange('initialCapital', e.target.value.replace(/[^0-9]/g, ''))}
              className="pl-8 h-11"
              placeholder="10,000"
            />
          </div>
        </div>

        {/* Monthly Deposit */}
        <div className="space-y-2">
          <Label htmlFor="monthlyDeposit" className="flex items-center gap-2 text-sm font-medium">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            Monthly Deposit
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="monthlyDeposit"
              type="text"
              inputMode="numeric"
              value={inputs.monthlyDeposit === 0 ? '' : inputs.monthlyDeposit}
              onChange={(e) => handleNumericChange('monthlyDeposit', e.target.value.replace(/[^0-9]/g, ''))}
              className="pl-8 h-11"
              placeholder="500"
            />
          </div>
        </div>

        {/* Investment Period */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Investment Period
          </Label>
          <div className="flex gap-3">
            <Input
              type="text"
              inputMode="numeric"
              value={inputs.investmentPeriod === 0 ? '' : inputs.investmentPeriod}
              onChange={(e) => handleNumericChange('investmentPeriod', e.target.value.replace(/[^0-9]/g, ''))}
              className="h-11 flex-1"
              placeholder="10"
            />
            <Select
              value={inputs.periodType}
              onValueChange={(value) => handleChange('periodType', value)}
            >
              <SelectTrigger className="w-28 h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="years">Years</SelectItem>
                <SelectItem value="months">Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Yearly Interest Rate */}
        <div className="space-y-3">
          <Label className="flex items-center justify-between text-sm font-medium">
            <span className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              Yearly Interest Rate
            </span>
            <span className="text-emerald font-semibold">{inputs.yearlyRate}%</span>
          </Label>
          <Slider
            value={[inputs.yearlyRate]}
            onValueChange={([value]) => handleChange('yearlyRate', value)}
            max={30}
            min={0}
            step={0.5}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Tax Rate */}
        <div className="space-y-3">
          <Label className="flex items-center justify-between text-sm font-medium">
            <span className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              Tax Rate on Profit
            </span>
            <span className="text-muted-foreground">{inputs.taxRate}%</span>
          </Label>
          <Slider
            value={[inputs.taxRate]}
            onValueChange={([value]) => handleChange('taxRate', value)}
            max={50}
            min={0}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
