import Hero from "@/components/blog/Hero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid";

export default function BlogPage() {
  return (
    <main className="bg-[#070B14] text-white">
      <Hero />
      <FeaturedPost />
      <BlogGrid />
    </main>
  );
}