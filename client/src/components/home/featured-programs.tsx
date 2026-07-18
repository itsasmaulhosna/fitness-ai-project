import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { featuredPrograms } from "@/lib/data/home";

export function FeaturedPrograms() {
  return (
    <section id="programs" className="bg-surface py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Featured Programs"
          title="Popular Workout Programs"
          description="Expert-crafted programs designed to help you build strength, burn fat, and achieve lasting results."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPrograms.map((program, index) => (
            <Card
              key={program.id}
              hover
              className="group overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={program.imageUrl}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Badge variant={program.difficulty}>{program.difficulty}</Badge>
                  <Badge variant="category">{program.category}</Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2 flex items-center gap-2 text-sm text-text-secondary">
                  <Clock className="h-4 w-4" />
                  <span>{program.durationWeeks} weeks</span>
                </div>
                <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {program.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                  {program.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    ${program.price.toFixed(2)}
                  </span>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/programs" variant="outline-dark" size="lg">
            View All Programs
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
