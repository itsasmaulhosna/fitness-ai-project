"use client";

import { FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 font-medium text-white transition-all duration-300 hover:border-emerald-500 hover:bg-white/10"
    >
      <FaGoogle className="text-red-500 text-lg" />
      Continue with Google
    </button>
  );
}