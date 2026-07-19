"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

import { blogPosts } from "@/lib/data/home";

export default function FeaturedPost() {
  const post = blogPosts[0];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="grid items-center gap-14 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl lg:grid-cols-2"
        >
          {/* Image */}

          <div className="relative h-[500px] overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover transition duration-700 hover:scale-110"
            />

            <div className="absolute left-6 top-6 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold">
              Featured
            </div>
          </div>

          {/* Content */}

          <div className="p-10 lg:p-14">
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
              {post.category}
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight">
              {post.title}
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                {post.publishedAt}
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={18} />
                {post.readTime}
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 font-semibold transition hover:bg-emerald-400"
            >
              Read Article
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}