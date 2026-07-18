"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Dumbbell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/lib/data/home";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            onClick={() => setIsMobileOpen(false)}
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300",
                isScrolled
                  ? "bg-primary text-white"
                  : "bg-white/20 text-white backdrop-blur-sm group-hover:bg-white/30"
              )}
            >
              <Dumbbell className="h-5 w-5" />
            </span>
            <span
              className={cn(
                "text-xl font-bold tracking-tight transition-colors duration-300",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              FitTrack
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-primary",
                  isScrolled ? "text-foreground" : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200",
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white hover:text-white/80"
              )}
            >
              Log In
            </Link>
            <Button
              href="/programs"
              size="sm"
              variant={isScrolled ? "primary" : "outline"}
              className={!isScrolled ? "border-white text-white hover:bg-white hover:text-foreground" : ""}
            >
              Get Started
            </Button>
          </div>

          <button
            type="button"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            className={cn(
              "rounded-lg p-2 transition-colors lg:hidden",
              isScrolled ? "text-foreground hover:bg-gray-100" : "text-white hover:bg-white/10"
            )}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </Container>

      <div
        className={cn(
          "fixed inset-0 top-16 z-40 bg-black/50 transition-opacity lg:hidden",
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 border-b border-border bg-white px-4 py-6 shadow-lg transition-all duration-300 lg:hidden",
          isMobileOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-gray-50 hover:text-primary"
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-3 border-border" />
          <Link
            href="/login"
            className="rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-gray-50"
            onClick={() => setIsMobileOpen(false)}
          >
            Log In
          </Link>
          <Button href="/programs" className="mt-2 w-full">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
