"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock3 } from "lucide-react";

export default function FeaturedCard() {
  return (
    <div className="relative z-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

      {/* Featured Image */}
      <div className="relative h-[420px] overflow-hidden">

        <Image
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80"
          alt="Featured Article"
          fill
          priority
          className="object-cover transition duration-700 hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />

      </div>

      {/* Content */}
      <div className="p-8">

        <span className="inline-flex rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold text-white">
          Featured
        </span>

        <h2 className="mt-5 text-3xl font-bold leading-snug text-white">
          The Science of Progressive Overload
        </h2>

        <p className="mt-5 leading-7 text-gray-400">
          Learn how structured progression helps build muscle,
          improve strength, increase endurance and reduce injuries
          through evidence-based training methods.
        </p>

        {/* Meta */}
        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-400">

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            Jul 10, 2026
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            5 min read
          </div>

        </div>
                {/* CTA */}
        <div className="mt-8">
          <Link
            href="/blog/science-of-progressive-overload"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            Read Article

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-white/10 pt-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Category
              </p>

              <h4 className="mt-1 font-semibold text-white">
                Strength Training
              </h4>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">
                Difficulty
              </p>

              <h4 className="mt-1 font-semibold text-emerald-400">
                Beginner
              </h4>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}