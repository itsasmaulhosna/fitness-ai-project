"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { featuredPrograms } from "@/lib/data/home";
import ProgramCard from "./ProgramCard";

export default function FeaturedPrograms() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
              Featured Programs
            </span>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Start Your Fitness Journey
            </h2>

            <p className="mt-5 max-w-2xl text-lg text-gray-400">
              Professionally designed workout programs for every fitness
              level. Whether you're building muscle, losing weight or
              improving endurance, we've got a plan for you.
            </p>
          </div>

          <Link
            href="/programs"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold backdrop-blur-xl transition hover:bg-white/10"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {featuredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * .15,
              }}
            >
              <ProgramCard program={program} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}