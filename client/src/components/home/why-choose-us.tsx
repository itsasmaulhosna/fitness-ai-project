import {
  Award,
  Calendar,
  FlaskConical,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { features } from "@/lib/data/home";

const iconMap = {
  target: Target,
  award: Award,
  "trending-up": TrendingUp,
  calendar: Calendar,
  users: Users,
  "flask-conical": FlaskConical,
} as const;

export function WhyChooseUs() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Why FitTrack"
          title="Why Choose Us"
          description="We combine cutting-edge technology with proven fitness science to deliver results that last."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon =
              iconMap[feature.icon as keyof typeof iconMap] ?? Target;

            return (
              <div
                key={feature.id}
                className="group rounded-2xl border border-border bg-white p-8 opacity-0 transition-all duration-300 animate-fade-in-up hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
