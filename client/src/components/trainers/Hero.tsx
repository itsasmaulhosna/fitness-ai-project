"use client";

import Link from "next/link";
import Image from "next/image";
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
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&q=80"
          alt="Fitness Trainers"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="relative mx-auto grid min-h-[75vh] max-w-7xl items-center gap-16 px-6 py-32 lg:grid-cols-2">

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
            Achieve your fitness goals with certified professionals
            specializing in strength, fat loss, mobility, nutrition and
            functional training. Whether you're a beginner or an advanced
            athlete, our expert coaches are here to guide every step of
            your fitness journey.
          </p>
                    {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="#trainers"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30"
            >
              Explore Trainers

              <ArrowRight size={18} />
            </Link>

            <Link
              href="/programs"
              className="rounded-xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
            >
              View Programs
            </Link>

          </div>

          {/* Community */}
          <div className="mt-10 flex flex-wrap items-center gap-6">

            {/* Trainer Avatars */}
            <div className="flex -space-x-4">

              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Trainer"
                className="h-12 w-12 rounded-full border-2 border-[#111827] object-cover"
              />

              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Trainer"
                className="h-12 w-12 rounded-full border-2 border-[#111827] object-cover"
              />

              <img
                src="https://randomuser.me/api/portraits/men/51.jpg"
                alt="Trainer"
                className="h-12 w-12 rounded-full border-2 border-[#111827] object-cover"
              />

              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Trainer"
                className="h-12 w-12 rounded-full border-2 border-[#111827] object-cover"
              />

            </div>

            {/* Rating */}
            <div>

              <h3 className="text-lg font-semibold text-white">
                Trusted by 50,000+ Members
              </h3>

              <div className="mt-1 flex items-center gap-2">

                <div className="flex text-yellow-400">
                  ★★★★★
                </div>

                <span className="text-sm text-gray-400">
                  4.9/5 Average Rating
                </span>

              </div>

            </div>

          </div>

          {/* Feature Chips */}
          <div className="mt-8 flex flex-wrap gap-3">

            {[
              "Certified Trainers",
              "Nutrition Plans",
              "1-on-1 Coaching",
              "Workout Tracking",
            ].map((item) => (

              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl"
              >
                {item}
              </span>

            ))}

          </div>
                    {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <h3 className="text-3xl font-black text-white">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>

        <motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="relative hidden lg:flex items-center justify-center"
>
  {/* Main Trainer Card */}
  <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl">

    <div className="relative h-[600px]">

      <Image
        src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=80"
        alt="Trainer"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />

      {/* Top Badge */}
      <div className="absolute left-6 top-6 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
        ⭐ Top Coach
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-8">

        <h3 className="text-3xl font-bold text-white">
          Alex Morgan
        </h3>

        <p className="mt-2 text-emerald-400">
          Certified Strength Coach
        </p>

        <div className="mt-6 flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-400">
              Experience
            </p>

            <h4 className="font-semibold text-white">
              12+ Years
            </h4>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Rating
            </p>

            <h4 className="font-semibold text-yellow-400">
              ★ 4.9
            </h4>
          </div>

        </div>

        <button className="mt-8 w-full rounded-xl bg-emerald-500 py-4 font-semibold text-white transition hover:bg-emerald-400">
          View Profile
        </button>

      </div>

    </div>

  </div>

  {/* Floating Members Card */}
  <motion.div
    animate={{
      y: [-10, 10, -10],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
    }}
    className="absolute -left-6 top-20 rounded-2xl border border-white/10 bg-black/70 px-5 py-4 backdrop-blur-xl"
  >
    <h4 className="text-xl font-bold text-white">
      50K+
    </h4>

    <p className="text-sm text-gray-400">
      Active Members
    </p>
  </motion.div>

  {/* Floating Rating Card */}
  <motion.div
    animate={{
      y: [10, -10, 10],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
    }}
    className="absolute -right-6 bottom-20 rounded-2xl border border-white/10 bg-black/70 px-5 py-4 backdrop-blur-xl"
  >
    <h4 className="text-2xl font-bold text-yellow-400">
      ★ 4.9
    </h4>

    <p className="text-sm text-gray-400">
      Trainer Rating
    </p>
  </motion.div>

</motion.div>

      </div>

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[150px]" />

      {/* Left Glow */}
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Right Glow */}
      <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[140px]" />

    </section>
  );
}