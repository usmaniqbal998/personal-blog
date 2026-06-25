import Link from "next/link";
import { SectionHead } from "./section-head";

const linkCls =
  "text-c1 no-underline border-b border-c1/40 transition-colors duration-base hover:text-c2 hover:border-c2/60";

export function About() {
  return (
    <section className="mt-s-10">
      <SectionHead num="06" label="About" />
      <h2 className="font-display font-normal text-display-m leading-[1.1] tracking-[-0.012em] text-fg m-0 mb-s-3 text-balance max-[600px]:text-[28px]">
        Who&apos;s building it.
      </h2>
      <div className="text-body-l leading-[1.7] text-fg max-w-[60ch] text-pretty">
        <p className="m-0 mb-s-4">
          I&apos;m Usman. Senior engineer at IKEA, founder of{" "}
          <a
            href="https://payzap.app"
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
          >
            PayZap
          </a>
          , currently building Grafora on the side. I&apos;ve been shipping
          production AI workflows since the API was an autocomplete endpoint
          with a temperature knob.
        </p>
        <p className="m-0">
          If you want to see how I think before you book the call, read{" "}
          <Link href="/" className={linkCls}>
            Field Notes
          </Link>
          . It&apos;s the most honest version of a CV I have — what&apos;s
          working, what&apos;s breaking, and the things I got wrong the first
          three times.
        </p>
      </div>
    </section>
  );
}
