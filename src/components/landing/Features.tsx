import { Calculator, LineChart, PiggyBank, Clock, Percent, Wallet } from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'Compound Interest Calculator',
    description: 'Calculate how your investments grow over time with monthly compounding and regular contributions.',
  },
  {
    icon: LineChart,
    title: 'Growth Visualization',
    description: 'Interactive charts showing the breakdown of your capital, deposits, and interest earned.',
  },
  {
    icon: PiggyBank,
    title: 'Monthly Contributions',
    description: 'See how regular monthly deposits accelerate your wealth-building journey.',
  },
  {
    icon: Clock,
    title: 'Flexible Time Periods',
    description: 'Plan for any investment horizon, from months to decades.',
  },
  {
    icon: Percent,
    title: 'Tax Calculations',
    description: 'Factor in capital gains tax to see your realistic net returns.',
  },
  {
    icon: Wallet,
    title: 'Detailed Breakdown',
    description: 'Month-by-month analysis of your investment growth and interest accumulation.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Plan Your Future
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade tools to help you understand and maximize your investment returns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 bg-card rounded-xl border border-border hover:border-foreground/20 transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-secondary w-fit mb-6 group-hover:bg-foreground group-hover:text-background transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}