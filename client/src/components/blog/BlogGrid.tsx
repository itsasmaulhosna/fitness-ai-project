"use client";

import { motion } from "framer-motion";

import { blogPosts } from "@/lib/data/home";
import BlogCard from "./BlogCard";

export default function BlogGrid() {
  return (
    <section id="articles" className="pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            Latest Articles
          </span>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            Discover Our Latest Insights
          </h2>

          <p className="mt-5 max-w-2xl text-lg text-gray-400">
            Stay updated with expert fitness advice, nutrition tips,
            workout guides and recovery strategies.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
              }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}