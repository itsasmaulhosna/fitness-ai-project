"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const stats = [
  {
    value: "85+",
    label: "Expert Coaches",
  },
  {
    value: "50K+",
    label: "Members",
  },
  {
    value: "15+",
    label: "Years Experience",
  },
  {
    value: "4.9★",
    label: "Average Rating",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="relative mx-auto flex min-h-[75vh] max-w-7xl items-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-xl">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-200">
              Meet Our Certified Trainers
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
            Train With
            <br />

            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              World-Class Coaches
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">
            Achieve your fitness goals with certified professionals specializing
            in strength, fat loss, mobility, nutrition and functional training.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#trainers"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-emerald-400"
            >
              Explore Trainers
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/programs"
              className="rounded-xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/20"
            >
              View Programs
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <h3 className="text-3xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}