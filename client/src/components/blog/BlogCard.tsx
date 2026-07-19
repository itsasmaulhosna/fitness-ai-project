"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import type { BlogPost } from "@/types/home.types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      {/* Image */}

      <div className="relative h-64 overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute left-5 top-5 rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-white">
          {post.category}
        </div>
      </div>

      {/* Content */}

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {post.publishedAt}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            {post.readTime}
          </div>
        </div>

        <h3 className="mt-5 text-2xl font-bold transition group-hover:text-emerald-400">
          {post.title}
        </h3>

        <p className="mt-4 line-clamp-3 leading-7 text-gray-400">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-8 inline-flex items-center gap-2 font-semibold text-emerald-400 transition hover:gap-3"
        >
          Read Article
          <ArrowRight size={18} />
        </Link>
      </div>
    </motion.article>
  );
}