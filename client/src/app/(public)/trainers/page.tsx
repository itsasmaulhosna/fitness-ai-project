import FeaturedTrainer from "@/components/trainers/FeaturedTrainer";
import Hero from "@/components/trainers/Hero";

export default function TrainersPage() {
  return (
    <main className="bg-[#070B14] text-white">
      <Hero />
      <FeaturedTrainer />
    </main>
  );
}