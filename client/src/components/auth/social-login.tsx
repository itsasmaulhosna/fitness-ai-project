"use client";

import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SocialLogin() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 font-medium text-white transition-all hover:border-emerald-500 hover:bg-white/10"
    >
      <FaGoogle className="text-lg text-red-500" />
      Continue with Google
    </button>
  );
}