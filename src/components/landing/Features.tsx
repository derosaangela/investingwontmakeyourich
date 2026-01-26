import { TrendingUp, Calculator, Clock } from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'Compound Interest',
    description: 'Calculate growth with monthly compounding and regular contributions.',
  },
  {
    icon: TrendingUp,
    title: 'Visual Analytics',
    description: 'Interactive charts showing capital, deposits, and interest breakdown.',
  },
  {
    icon: Clock,
    title: 'Flexible Planning',
    description: 'Model any investment horizon from months to decades.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Built for precision
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  <feature.icon className="h-5 w-5 text-white/70" />
                </div>
                <h3 className="text-lg font-semibold mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}