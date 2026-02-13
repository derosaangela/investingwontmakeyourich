import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Lock, ArrowRight, RotateCcw } from 'lucide-react';
import { PhaseResult } from './types';

interface Props {
  result: PhaseResult;
  onReset: () => void;
}

export function PlanResults({ result, onReset }: Props) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Hero card */}
      <Card className="bg-white/[0.02] border-white/5">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-xs text-muted-foreground mb-4">
            Phase {result.currentPhase} of 4
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {result.phases[result.currentPhase - 1].title}
          </h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            {result.phases[result.currentPhase - 1].summary}
          </p>
        </CardContent>
      </Card>

      {/* Phase cards */}
      <div className="space-y-4">
        {result.phases.map((phase) => (
          <Card
            key={phase.phase}
            className={`border transition-colors ${
              phase.status === 'current'
                ? 'bg-white/[0.04] border-white/15'
                : phase.status === 'complete'
                ? 'bg-white/[0.02] border-white/5'
                : 'bg-white/[0.01] border-white/5 opacity-50'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    phase.status === 'complete'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : phase.status === 'current'
                      ? 'bg-white/10 text-foreground'
                      : 'bg-white/5 text-muted-foreground'
                  }`}
                >
                  {phase.status === 'complete' ? (
                    <Check className="h-4 w-4" />
                  ) : phase.status === 'locked' ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-bold">{phase.phase}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{phase.title}</h4>
                    {phase.status === 'current' && (
                      <span className="text-[10px] uppercase tracking-widest text-foreground/50 bg-white/5 px-2 py-0.5 rounded-full">
                        You are here
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{phase.summary}</p>

                  {phase.status !== 'locked' && phase.actions[0] !== '✓ Completed' && (
                    <ul className="space-y-2">
                      {phase.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground/60">
                          <ArrowRight className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-4">
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-2 text-muted-foreground">
          <RotateCcw className="h-4 w-4" />
          Retake Survey
        </Button>
      </div>
    </div>
  );
}
