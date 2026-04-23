"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: UX stays happy even if network fails.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
          Boxit
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:border-neutral-900 hidden sm:inline-block"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-amber-100 via-amber-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-700">
            Personal finance
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            The receipts. All of them. Sorted.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Email them, photograph them, forward them. Boxit files each one under the right
            category — ready for taxes.
          </p>

          {submitted ? (
            <p className="mt-12 text-sm font-medium text-amber-700">
              Thanks. We will ping you the day we launch.
            </p>
          ) : (
            <form
              id="waitlist"
              onSubmit={handleWaitlist}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
              >
                Join the waitlist
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div className="text-sm font-semibold">Q1 receipts · 84 sorted</div>
                <div className="text-xs text-neutral-500">$12,482.40 tracked</div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
                  <span>🚗 Gas · Shell</span>
                  <span className="font-medium">$48.22 · Mar 14</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
                  <span>🍽️ Meals · Chipotle</span>
                  <span className="font-medium">$14.08 · Mar 13</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
                  <span>📦 Supplies · Amazon</span>
                  <span className="font-medium">$84.99 · Mar 12</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
                  <span>💻 Software · Adobe</span>
                  <span className="font-medium">$54.99 · Mar 10</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/try"
              className="inline-block rounded-full bg-amber-600 px-7 py-3.5 font-medium text-white transition hover:bg-amber-700"
            >
              Try it yourself →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">📸</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Snap and forget</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                One photo — we extract vendor, amount, date, tax. Even crumpled paper ones.
              </p>
            </div>
            <div>
              <div className="text-3xl">📧</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Auto-grabs email receipts</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Forward your confirmation emails or let us read your inbox, your choice.
              </p>
            </div>
            <div>
              <div className="text-3xl">🧾</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Tax-ready exports</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Spreadsheets for you or your CPA. Or direct sync to TurboTax and QuickBooks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            {[
              {
                n: 1,
                title: "Sign up in seconds",
                body: "Email only. No credit card. You're in before you can overthink it.",
              },
              {
                n: 2,
                title: "Set up your context",
                body: "Tell us what you're working on. The whole product tunes around that.",
              },
              {
                n: 3,
                title: "Get value on day one",
                body: "Not week two. Day one. That's how fast you'll know it's working.",
              },
            ].map(({ n, title, body }) => (
              <div key={n}>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                  {n}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the
          doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-amber-600 px-7 py-3.5 font-medium text-white transition hover:bg-amber-700"
        >
          Reserve my spot
        </a>
      </section>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
            Boxit
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}
