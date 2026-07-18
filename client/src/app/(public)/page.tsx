import { HeroSection } from "@/components/home/hero-section";
import { FeaturedPrograms } from "@/components/home/featured-programs";
import { FitnessCategories } from "@/components/home/fitness-categories";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FitnessStats } from "@/components/home/fitness-stats";
import { ExpertTrainers } from "@/components/home/expert-trainers";
import { Testimonials } from "@/components/home/testimonials";
import { BlogPreview } from "@/components/home/blog-preview";
import { Newsletter } from "@/components/home/newsletter";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPrograms />
      <FitnessCategories />
      <WhyChooseUs />
      <FitnessStats />
      <ExpertTrainers />
      <Testimonials />
      <BlogPreview />
      <Newsletter />
      <CtaSection />
    </>
  );
}
