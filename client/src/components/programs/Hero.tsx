"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Dumbbell,
  Star,
  Users,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80')",
        }}
      />

      <div className="absolute inset-0 bg-black/75" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/80 to-transparent" />

      <div className="relative mx-auto grid min-h-[90vh] max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 backdrop-blur-xl">
            <Dumbbell className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-emerald-300">
              120+ Premium Programs
            </span>
          </div>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            Unlock Your
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
              Strongest Version
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300">
            Transform your fitness journey with expertly designed workout
            programs tailored for muscle gain, fat loss, endurance and total
            body performance.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#programs"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-4 font-semibold transition hover:bg-emerald-400"
            >
              Explore Programs
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/trainers"
              className="rounded-xl border border-white/10 bg-white/10 px-7 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/20"
            >
              Meet Trainers
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap gap-8">
            <div>
              <h3 className="text-3xl font-bold">120+</h3>
              <p className="text-gray-400">Programs</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">50K+</h3>
              <p className="text-gray-400">Members</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">98%</h3>
              <p className="text-gray-400">Success Rate</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="relative"
        >
          {/* Floating Badge */}
          <motion.div
            animate={{
              y: [-8, 8, -8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -left-6 top-10 z-20 rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl"
          >
            <p className="text-sm text-gray-400">
              Most Popular
            </p>

            <h4 className="font-bold">
              Strength Foundation
            </h4>
          </motion.div>

          {/* Card */}
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="relative h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80"
                alt="Program"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold">
                  Strength Foundation
                </h3>

                <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm">
                  Beginner
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  8 Weeks
                </div>

                <div className="flex items-center gap-2">
                  <Users size={18} />
                  12K Members
                </div>

                <div className="flex items-center gap-2">
                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  4.9
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="text-gray-400">
                    Starting From
                  </p>

                  <h2 className="text-4xl font-bold text-emerald-400">
                    $49
                  </h2>
                </div>

                <Link
                  href="/programs/strength-foundation"
                  className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold transition hover:bg-emerald-400"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>

          
        </motion.div>
      </div>
    </section>
  );
}