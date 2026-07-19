"use client";

import Image from "next/image";

export default function HeroBackground() {
  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1800&q=80"
          alt="Fitness Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-20 bg-black/75" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070B14] via-[#070B14]/85 to-[#070B14]/40" />
    </>
  );
}