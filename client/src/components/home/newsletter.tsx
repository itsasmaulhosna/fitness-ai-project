"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="border-y border-border bg-surface py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Mail className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Stay in the Loop
          </h2>
          <p className="mt-3 text-text-secondary">
            Get weekly fitness tips, program updates, and exclusive offers
            delivered to your inbox.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-xl border border-secondary/30 bg-secondary/10 px-6 py-4 text-secondary animate-scale-in">
              <p className="font-semibold">Thank you for subscribing!</p>
              <p className="mt-1 text-sm text-text-secondary">
                Check your inbox for a confirmation email.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start"
            >
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  className="py-3.5"
                />
              </div>
              <Button type="submit" size="lg" className="shrink-0 sm:px-8">
                Subscribe
                <Send className="h-4 w-4" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-text-secondary">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </section>
  );
}
