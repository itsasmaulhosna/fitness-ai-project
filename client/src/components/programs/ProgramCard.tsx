"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Dumbbell,
  Signal,
} from "lucide-react";

import type { Program } from "@/types/home.types";

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({
  program,
}: ProgramCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      {/* Image */}

      <div className="relative h-64 overflow-hidden">

        <Image
          src={program.imageUrl}
          alt={program.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute left-5 top-5 rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold">
          {program.category}
        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        <h3 className="text-2xl font-bold text-white">
          {program.title}
        </h3>

        <p className="mt-4 line-clamp-3 leading-7 text-gray-400">
          {program.description}
        </p>

        {/* Info */}

        <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-300">

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {program.durationWeeks} Weeks
          </div>

          <div className="flex items-center gap-2">
            <Signal size={16} />
            {program.difficulty}
          </div>

          <div className="flex items-center gap-2">
            <Dumbbell size={16} />
            Workout Plan
          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-400">
              Starting From
            </p>

            <h4 className="text-3xl font-bold text-emerald-400">
              ${program.price}
            </h4>

          </div>

          <Link
            href={`/programs/${program.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold transition hover:bg-emerald-400"
          >
            Details
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </motion.article>
  );
}