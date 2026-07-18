import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { trainers } from "@/lib/data/home";

export function ExpertTrainers() {
  return (
    <section id="trainers" className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Our Team"
          title="Expert Trainers"
          description="Learn from certified professionals dedicated to helping you reach your full potential."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer, index) => (
            <article
              key={trainer.id}
              className="group opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="relative mb-5 aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={trainer.imageUrl}
                  alt={trainer.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground">{trainer.name}</h3>
              <p className="text-sm font-medium text-primary">{trainer.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {trainer.bio}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
