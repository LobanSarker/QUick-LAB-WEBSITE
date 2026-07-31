"use client";

import { useState, type FormEvent } from "react";

const FORM_NAME = "newsletter";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const body = new URLSearchParams({ "form-name": FORM_NAME, email });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok && res.status !== 200) {
        // Netlify replies with a redirect after capturing the submission
        if (res.type !== "opaqueredirect" && !res.url) {
          throw new Error(`Submission failed (${res.status})`);
        }
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
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="post"
      className="w-full max-w-md"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
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
