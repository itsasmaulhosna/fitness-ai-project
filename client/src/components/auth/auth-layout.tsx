"use client";

import { motion } from "framer-motion";

import AuthBackground from "./auth-background";
import AuthBanner from "./auth-banner";
import AuthCard from "./auth-card";
import AuthHeader from "./auth-header";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <AuthBackground />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-2">
        {/* Form */}
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <AuthCard>
              <AuthHeader
                title={title}
                subtitle={subtitle}
              />

              {children}
            </AuthCard>
          </motion.div>
        </div>

        {/* Banner */}
        <div className="order-2 lg:order-1">
          <AuthBanner />
        </div>
      </div>
    </div>
  );
}