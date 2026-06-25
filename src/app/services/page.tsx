import type { Metadata } from "next";
import {
  About,
  Deliverables,
  FinalCta,
  FitCheck,
  MinimalFooter,
  ServicesHero,
  Tiers,
  Timeline,
  Workflows,
} from "@/components/services-page";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://usman-iqbal.blog";
const PAGE_URL = `${SITE_URL}/services`;
const DESCRIPTION =
  "AI automations for ops and sales teams. Three weeks, working code, fixed price. No retainer.";
const OG_TITLE = "Services — Field Notes";

const ogImageUrl = (() => {
  const u = new URL("/api/og", SITE_URL);
  u.searchParams.set(
    "title",
    "I build AI automations for ops and sales teams.",
  );
  u.searchParams.set("description", DESCRIPTION);
  u.searchParams.set("tag", "SERVICES");
  return u.toString();
})();

export const metadata: Metadata = {
  title: "Services",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: OG_TITLE,
    description: DESCRIPTION,
    images: [{ url: ogImageUrl, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: DESCRIPTION,
    images: [ogImageUrl],
  },
};

export default function ServicesPage() {
  return (
    <main className="relative z-1 mx-auto w-full max-w-180 px-s-6 pb-s-10 max-sm:px-s-5">
      <ServicesHero />
      <Tiers />
      <Timeline />
      <Deliverables />
      <Workflows />
      <FitCheck />
      <About />
      <FinalCta />
      <MinimalFooter />
    </main>
  );
}
