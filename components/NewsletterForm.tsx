"use client";

import { useState, type FormEvent } from "react";

const FORM_NAME = "newsletter";

// Point this at any endpoint that accepts a POSTed subscription
// (e.g. a Cloudflare Worker, Formspree, Resend). Configure it via
// NEXT_PUBLIC_NEWSLETTER_ENDPOINT in `.env.local`, `wrangler.toml`
// `[vars]`, or the Cloudflare dashboard. The endpoint should return
// a 2xx status on success.
const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    const data = new FormData(e.currentTarget);
    // Honeypot: silently "succeed" for bots so they learn nothing.
    if (data.get("bot-field")) {
      setState("done");
      setMessage("Subscribed! Welcome to the QuICK newsletter.");
      setEmail("");
      return;
    }

    if (!ENDPOINT) {
      setState("error");
      setMessage(
        "Newsletter signup isn't set up yet — please reach us through the contact links below.",
      );
      return;
    }

    setState("loading");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "form-name": FORM_NAME, email }),
      });
      if (!res.ok) {
        throw new Error(`Submission failed (${res.status})`);
      }
      setState("done");
      setMessage("Subscribed! Welcome to the QuICK newsletter.");
      setEmail("");
    } catch (err) {
      setState("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      name={FORM_NAME}
      method="post"
      className="w-full max-w-md"
    >
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} />
        </label>
      </p>
      <div className="glass flex items-center gap-2 rounded-full p-1.5">
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-slate-500 outline-none"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="shrink-0 rounded-full bg-gradient-to-r from-violet-glow to-cyan-glow px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {state === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {state !== "idle" && (
        <p
          className={`mt-2.5 px-2 text-sm ${
            state === "error" ? "text-red-400" : "text-cyan-glow"
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
