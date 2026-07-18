import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CtaSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-blue-600 to-emerald-600 px-8 py-16 text-center md:px-16 md:py-20">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Ready to Start Your Transformation?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-blue-100 md:text-lg">
              Join thousands of members who are already crushing their fitness
              goals. Your journey starts with a single step.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="/programs"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 hover:text-primary-hover shadow-lg"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                href="/login"
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
              >
                Sign In to Your Account
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
