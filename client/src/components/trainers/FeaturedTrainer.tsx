"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Dumbbell,
  Star,
  Users,
} from "lucide-react";

import { trainers } from "@/lib/data/home";

export default function FeaturedTrainer() {
  const trainer = trainers[0];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
        >

          <div className="mb-14">

            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
              Featured Coach
            </span>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Meet Our Head Trainer
            </h2>

            <p className="mt-4 max-w-2xl text-gray-400">
              Learn from our most experienced fitness coach with years of
              helping thousands transform their lives.
            </p>

          </div>

          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* IMAGE */}

            <div className="relative">

              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5">

                <Image
                  src={trainer.imageUrl}
                  alt={trainer.name}
                  width={700}
                  height={800}
                  className="h-[650px] w-full object-cover transition duration-700 hover:scale-105"
                />

              </div>

              {/* Floating Rating */}

              <div className="absolute bottom-8 left-8 rounded-2xl border border-white/10 bg-black/70 px-6 py-4 backdrop-blur-xl">

                <div className="flex items-center gap-2">

                  <Star
                    className="fill-yellow-400 text-yellow-400"
                    size={18}
                  />

                  <span className="font-semibold">
                    4.9 Rating
                  </span>

                </div>

              </div>

            </div>

            {/* CONTENT */}

            <div>

              <h3 className="text-4xl font-bold">
                {trainer.name}
              </h3>

              <p className="mt-3 text-xl text-emerald-400">
                {trainer.role}
              </p>

              <p className="mt-8 leading-8 text-gray-300">
                {trainer.bio}
              </p>

              {/* INFO */}

              <div className="mt-10 grid grid-cols-2 gap-5">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                  <Award className="mb-3 text-emerald-400" />

                  <h4 className="font-semibold">
                    Experience
                  </h4>

                  <p className="mt-2 text-gray-400">
                    15+ Years
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                  <Users className="mb-3 text-emerald-400" />

                  <h4 className="font-semibold">
                    Members Trained
                  </h4>

                  <p className="mt-2 text-gray-400">
                    12,500+
                  </p>

                </div>

              </div>

              {/* SPECIALTIES */}

              <div className="mt-10">

                <h4 className="mb-4 text-lg font-semibold">
                  Specialties
                </h4>

                <div className="flex flex-wrap gap-3">

                  {trainer.specialties.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300"
                    >
                      {item}
                    </span>
                  ))}

                </div>

              </div>

              {/* BUTTONS */}

              <div className="mt-12 flex flex-wrap gap-4">

                <Link
                  href={`/trainers/${trainer.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-4 font-semibold transition hover:bg-emerald-400"
                >
                  View Profile
                  <ArrowRight size={18} />
                </Link>

                <button className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold backdrop-blur-xl transition hover:bg-white/10">
                  Book Session
                </button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}