import Link from "next/link";
import {
  Apple,
  ArrowRight,
  Dumbbell,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { categories } from "@/lib/data/home";
import { cn } from "@/lib/utils/cn";

const iconMap = {
  dumbbell: Dumbbell,
  "heart-pulse": HeartPulse,
  sparkles: Sparkles,
  apple: Apple,
} as const;

export function FitnessCategories() {
  return (
    <section id="categories" className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Explore"
          title="Fitness Categories"
          description="Find the perfect training style for your goals. From strength building to mindful movement."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Dumbbell;

            return (
              <Link key={category.id} href="/programs" className="group block">
                <Card
                  hover
                  className="h-full overflow-hidden opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div
                    className={cn(
                      "relative flex h-32 items-center justify-center bg-gradient-to-br",
                      category.color
                    )}
                  >
                    <Icon className="h-12 w-12 text-white/90 transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {category.description}
                    </p>
                    <p className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                      {category.programCount} programs
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
