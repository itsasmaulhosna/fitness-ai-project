"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Dumbbell, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/lib/data/home";
import { cn } from "@/lib/utils/cn";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

const { data: session, isPending } = authClient.useSession();

const user = session?.user;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[999] overflow-visible transition-all duration-300",
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <Container>
<nav className="relative flex h-16 items-center justify-between overflow-visible md:h-20">
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
  {!user ? (
    <>
      <Link
        href="/login"
        className={cn(
          "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
          isScrolled
            ? "text-foreground hover:text-primary"
            : "text-white hover:text-white/80"
        )}
      >
        Login
      </Link>

      <Button
        href="/register"
        size="sm"
        variant={isScrolled ? "primary" : "outline"}
        className={
          !isScrolled
            ? "border-white text-white hover:bg-white hover:text-foreground"
            : ""
        }
      >
        Register
      </Button>
    </>
  ) : (
    <div className="relative overflow-visible z-[9999]">
      <button
        type="button"
        onClick={() => setIsProfileOpen((prev) => !prev)}
        className="flex items-center gap-2"
      >
        <img
          src={user.image || "/avatar.png"}
          alt={user.name || "User"}
          className="h-10 w-10 rounded-full object-cover border-2 border-primary"
        />

        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isProfileOpen && "rotate-180"
          )}
        />
      </button>

      {isProfileOpen && (
        <div
  className="absolute right-0 top-full mt-2 z-[99999] w-72 rounded-xl border border-gray-200 bg-white shadow-2xl"
  style={{ overflow: "visible" }}
>

          <div className="border-b px-4 py-3">
            <p className="font-semibold">
              {user.name}
            </p>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
            onClick={() => setIsProfileOpen(false)}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <button
onClick={async () => {
  await authClient.signOut();
  setIsProfileOpen(false);
}}
            className="flex w-full items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

        </div>
      )}
    </div>
  )}
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
    "fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white px-4 py-6 shadow-lg transition-all duration-300 lg:hidden",
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

    {!user ? (
      <>
        <Link
          href="/login"
          className="rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-gray-50"
          onClick={() => setIsMobileOpen(false)}
        >
          Login
        </Link>

        <Link
          href="/register"
          className="rounded-lg bg-primary px-4 py-3 text-center text-base font-medium text-white hover:bg-primary/90"
          onClick={() => setIsMobileOpen(false)}
        >
          Register
        </Link>
      </>
    ) : (
      <>
        <div className="mt-2 flex items-center gap-3 rounded-xl border p-4">
          <img
            src={user.image || "/avatar.png"}
            alt={user.name || "User"}
            className="h-12 w-12 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="truncate font-semibold">
              {user.name}
            </p>

            <p className="truncate text-sm text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="mt-3 flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-gray-50"
          onClick={() => setIsMobileOpen(false)}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>

        <button
          onClick={async () => {
            await authClient.signOut();
            setIsMobileOpen(false);
          }}
          className="mt-2 flex w-full items-center gap-2 rounded-lg px-4 py-3 text-left text-base font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </>
    )}
  </div>
</div>
    </header>
  );
}