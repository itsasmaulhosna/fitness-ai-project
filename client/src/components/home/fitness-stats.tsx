import { Container } from "@/components/ui/container";
import { stats } from "@/lib/data/home";

export function FitnessStats() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="text-center opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <p className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-gray-400 md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
