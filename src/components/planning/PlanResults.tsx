import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Lock, ArrowRight, RotateCcw, Download } from 'lucide-react';
import { PhaseResult } from './types';
import jsPDF from 'jspdf';

interface Props {
  result: PhaseResult;
  onReset: () => void;
}

function exportToPDF(result: PhaseResult) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 25;

  // Title
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Investment Roadmap', margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120);
  doc.text(`Generated ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`, margin, y);
  y += 6;
  doc.text(`Current Phase: ${result.currentPhase} of 4 — ${result.phases[result.currentPhase - 1].title}`, margin, y);
  doc.setTextColor(0);
  y += 12;

  // Summary box
  doc.setFillColor(245, 245, 245);
  const summaryText = doc.splitTextToSize(result.phases[result.currentPhase - 1].summary, contentWidth - 16);
  const boxHeight = summaryText.length * 5 + 12;
  doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, 'F');
  doc.setFontSize(9);
  doc.text(summaryText, margin + 8, y + 8);
  y += boxHeight + 10;

  // Phases
  for (const phase of result.phases) {
    // Check if we need a new page
    if (y > 250) {
      doc.addPage();
      y = 25;
    }

    const statusLabel = phase.status === 'complete' ? 'DONE' : phase.status === 'current' ? 'CURRENT' : 'LOCKED';

    // Phase header
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text(`Phase ${phase.phase}: ${phase.title}`, margin, y);

    // Status badge
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    const badgeX = margin + doc.getTextWidth(`Phase ${phase.phase}: ${phase.title}  `) + 8;
    if (phase.status === 'complete') {
      doc.setTextColor(34, 139, 34);
    } else if (phase.status === 'current') {
      doc.setTextColor(30, 30, 30);
    } else {
      doc.setTextColor(160);
    }
    doc.text(statusLabel, Math.min(badgeX, pageWidth - margin - 20), y);
    doc.setTextColor(0);
    y += 6;

    // Summary
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80);
    const phaseSummary = doc.splitTextToSize(phase.summary, contentWidth - 4);
    doc.text(phaseSummary, margin + 4, y);
    y += phaseSummary.length * 4.5 + 4;

    // Actions
    if (phase.status !== 'locked' && phase.actions[0] !== 'Completed') {
      doc.setTextColor(50);
      for (const action of phase.actions) {
        if (y > 275) {
          doc.addPage();
          y = 25;
        }
        const lines = doc.splitTextToSize(`•  ${action}`, contentWidth - 12);
        doc.text(lines, margin + 8, y);
        y += lines.length * 4.5 + 2;
      }
    }

    doc.setTextColor(0);
    y += 8;
  }

  // Key numbers
  if (y > 250) {
    doc.addPage();
    y = 25;
  }
  y += 4;
  doc.setDrawColor(220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Numbers', margin, y);
  y += 7;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60);
  doc.text(`Monthly essential expenses: ${formatGBP(result.monthlyEssentials)}`, margin + 4, y);
  y += 5;
  doc.text(`Current savings: ${formatGBP(result.currentSavings)}`, margin + 4, y);
  y += 5;
  doc.text(`Income type: ${result.incomeStability === 'variable' ? 'Variable' : 'Stable'}`, margin + 4, y);
  y += 5;
  doc.text(`Risk tolerance: ${(result.riskTolerance ?? 'balanced').charAt(0).toUpperCase() + (result.riskTolerance ?? 'balanced').slice(1)}`, margin + 4, y);
  y += 5;
  doc.text(`Emergency fund target: ${formatGBP(result.emergencyTarget)} (${result.emergencyMonths} months)`, margin + 4, y);
  y += 5;
  if (result.savingsGap > 0) {
    doc.text(`Remaining gap: ${formatGBP(result.savingsGap)}`, margin + 4, y);
  } else {
    doc.text('Emergency fund: Fully funded ✓', margin + 4, y);
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(160);
    doc.text('Nexus Capital — Investment Readiness Assessment', margin, doc.internal.pageSize.getHeight() - 10);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, doc.internal.pageSize.getHeight() - 10);
  }

  doc.save('investment-roadmap.pdf');
}

function formatGBP(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
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

                  {phase.status !== 'locked' && phase.actions[0] !== 'Completed' && (
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

      {/* Emergency Fund Summary */}
      <Card className="bg-white/[0.02] border-white/5">
        <CardContent className="p-6">
          <h4 className="text-sm font-semibold mb-4">Emergency Fund Overview</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Monthly Essentials</p>
              <p className="text-sm font-semibold tabular-nums">{formatGBP(result.monthlyEssentials)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Savings</p>
              <p className="text-sm font-semibold tabular-nums">{formatGBP(result.currentSavings)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Target ({result.emergencyMonths}mo)</p>
              <p className="text-sm font-semibold tabular-nums">{formatGBP(result.emergencyTarget)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {result.savingsGap > 0 ? 'Gap Remaining' : 'Status'}
              </p>
              <p className={`text-sm font-semibold tabular-nums ${result.savingsGap <= 0 ? 'text-emerald-400' : ''}`}>
                {result.savingsGap > 0 ? formatGBP(result.savingsGap) : 'Fully Funded'}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Income type: {result.incomeStability === 'variable' ? 'Variable — 6 months recommended' : 'Stable — 3 months recommended'}
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-2 text-muted-foreground">
          <RotateCcw className="h-4 w-4" />
          Retake Survey
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportToPDF(result)}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export as PDF
        </Button>
      </div>
    </div>
  );
}
