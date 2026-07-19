"use client";

import { motion } from "framer-motion";
import { Dumbbell, Trophy, Users } from "lucide-react";
import FeatureItem from "./feature-item";

const features = [
  {
    icon: <Users className="text-emerald-400" />,
    title: "15,000+ Active Members",
  },
  {
    icon: <Trophy className="text-yellow-400" />,
    title: "98% Success Rate",
  },
  {
    icon: <Dumbbell className="text-cyan-400" />,
    title: "Personalized Training",
  },
];

export default function AuthBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className=" lg:flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
    >
      <div>
        <h2 className="text-5xl font-bold leading-tight text-white">
          Build Your
          <span className="block text-emerald-400">
            Strongest Version
          </span>
        </h2>

        <p className="mt-6 leading-8 text-slate-300">
          Track workouts, join fitness programs, monitor your progress and stay
          motivated every day.
        </p>
      </div>

      <div className="space-y-5">
        {features.map((feature) => (
          <FeatureItem
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
          />
        ))}
      </div>
    </motion.div>
  );
}