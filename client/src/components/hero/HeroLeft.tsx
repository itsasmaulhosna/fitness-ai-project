"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

export default function HeroLeft() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-xl"
    >
      {/* Top Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl">
        <BookOpen className="h-4 w-4 text-emerald-400" />

        <span className="text-sm text-gray-200">
          Fitness Knowledge Hub
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
        Learn.
        <br />

        <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
          Improve.
        </span>

        <br />

        Perform.
      </h1>

      {/* Description */}
      <p className="mt-8 text-lg leading-8 text-gray-300">
        Discover science-backed fitness articles, nutrition guides,
        workout strategies and recovery tips written by certified
        coaches.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap gap-4">

        <Link
          href="#articles"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-4 font-semibold text-white transition hover:bg-emerald-400"
        >
          Explore Articles

          <ArrowRight size={18} />
        </Link>

        <Link
          href="/programs"
          className="rounded-xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
        >
          Explore Programs
        </Link>

      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-3 gap-6">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="text-3xl font-bold text-white">
            150+
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Articles
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="text-3xl font-bold text-white">
            25K+
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Readers
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="text-3xl font-bold text-white">
            4.9★
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Rating
          </p>
        </div>

      </div>
    </motion.div>
  );
}