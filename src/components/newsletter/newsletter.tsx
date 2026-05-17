"use client";

import { useNewsletter } from "./use-newsletter";

export function Newsletter() {
  const { email, setEmail, status, submit } = useNewsletter();

  return (
    <section
      id="subscribe"
      className="newsletter-border newsletter-bg relative p-s-7 border border-line-strong rounded-3xl overflow-hidden backdrop-blur"
    >
      <h3 className="font-display font-normal text-[28px] leading-snug text-fg mb-s-2 tracking-display">
        Subscribe to the dispatch.
      </h3>
      <p className="font-body text-[14px] leading-body text-fg-dim mb-s-5 max-w-[48ch]">
        One email, roughly every other Sunday. Notes from the lab, what I&apos;m
        building, and the occasional half-formed idea I&apos;d love a second
        pair of eyes on.
      </p>

      {status === "success" ? (
        <p className="font-mono text-mono uppercase tracking-uppercase text-c1 py-s-3">
          // Welcome aboard 🎉 First dispatch arriving soon.
        </p>
      ) : (
        <form onSubmit={submit} className="flex gap-s-2 flex-wrap">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@somewhere.com"
            required
            disabled={status === "loading"}
            className="flex-1 min-w-50 bg-[rgba(255,255,255,0.03)] border border-line-strong rounded-md px-s-3 py-2.75 text-body-s text-fg font-body placeholder:text-fg-faint outline-none transition-[border-color,box-shadow] duration-base focus:border-c1/60 focus:shadow-[0_0_0_3px_rgba(var(--c1-rgb),0.12)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="border-none rounded-md px-s-5 py-2.75 font-body text-body-s font-medium text-bg bg-[linear-gradient(135deg,var(--c1),var(--c2))] cursor-pointer transition-[opacity,transform] duration-base hover:opacity-90 active:translate-y-px disabled:opacity-50"
          >
            {status === "loading" ? "Sending…" : "Subscribe →"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-s-2 font-mono text-mono text-tok-del tracking-[0.08em] uppercase">
          // Something went wrong. Try again.
        </p>
      )}
    </section>
  );
}
