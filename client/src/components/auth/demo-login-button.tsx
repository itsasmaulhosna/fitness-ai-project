"use client";

import { Sparkles } from "lucide-react";

interface DemoLoginButtonProps {
  onClick: () => void;
}

export default function DemoLoginButton({
  onClick,
}: DemoLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-emerald-500/30
        bg-emerald-500/10
        py-3
        font-semibold
        text-emerald-400
        transition-all
        duration-300
        hover:bg-emerald-500/20
        hover:border-emerald-500
      "
    >
      <Sparkles size={18} />
      Try Demo Account
    </button>
  );
}