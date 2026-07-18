import Image from "next/image";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[65vh] items-center overflow-hidden md:min-h-[70vh]">
      <Image
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
        alt="Athletes training in a modern gym"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/80 to-gray-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />

      <Container className="relative z-10 py-24 md:py-32">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>Trusted by 50,000+ fitness enthusiasts</span>
          </div>

          <h1 className="animate-fade-in-up animation-delay-100 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Fitness Journey
            </span>
          </h1>

          <p className="animate-fade-in-up animation-delay-200 mt-6 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
            Discover expert-designed programs, track every workout and meal, and
            achieve your goals with personalized guidance — all in one powerful
            platform.
          </p>

          <div className="animate-fade-in-up animation-delay-300 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/programs" size="lg">
              Browse Programs
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="#programs" variant="outline" size="lg">
              <Play className="h-5 w-5" />
              View Featured
            </Button>
          </div>

          <div className="animate-fade-in-up animation-delay-400 mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:max-w-md">
            {[
              { value: "120+", label: "Programs" },
              { value: "85+", label: "Trainers" },
              { value: "98%", label: "Success Rate" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-bold text-white md:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
