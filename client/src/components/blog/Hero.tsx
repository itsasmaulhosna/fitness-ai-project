import FeaturedCard from "../hero/FeaturedCard";
import HeroBackground from "../hero/HeroBackground";
import HeroLeft from "../hero/HeroLeft";


export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-20 px-6 py-24 lg:grid-cols-2">
        <HeroLeft />
        <FeaturedCard />
      </div>
    </section>
  );
}