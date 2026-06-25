import type { Deliverable, Tier, Week, Workflow } from "./types";

export const BOOKING_URL =
  "https://calendly.com/hello-usman-iqbal/discovery-call-clone";

export const TIERS: Tier[] = [
  {
    num: "01",
    kind: "Free",
    name: "Intro call",
    price: "Free",
    priceUnit: "60 min · video",
    title: "An hour to figure out if there's anything worth automating.",
    desc: "I ask the right questions, you point at the things that hurt. By the end we both know whether this is a fit.",
    bullets: [
      "Map your 2–3 highest-friction workflows",
      "Honest read on which (if any) are worth automating now",
      "Short follow-up note: what I'd build first and why",
      "Zero obligation. No follow-up sales sequence.",
    ],
    cta: "Book the call",
    href: BOOKING_URL,
  },
  {
    num: "02",
    kind: "Standalone",
    name: "Workflow audit",
    price: "€1,000",
    priceUnit: "2 days · on-site",
    title:
      "Two days embedded with your team. A written audit you can act on without me.",
    desc: "I sit with the people doing the work, watch what actually happens, then write up what to automate, in what order, and what each one is worth.",
    bullets: [
      "Top 3 automation candidates, ranked by impact ÷ effort",
      "Recommended sequence + dependencies",
      "Expected hours saved and rough build cost per candidate",
      "Yours to keep. Take it to anyone — including no one.",
    ],
    credit: "Fully credited toward the sprint",
    cta: "Book the audit",
    href: BOOKING_URL,
  },
  {
    num: "03",
    kind: "Build",
    name: "Automation sprint",
    price: "€3,000",
    priceUnit: "3 weeks · fixed",
    title:
      "Pick one workflow. I build it, integrate it, and hand it over working.",
    desc: "Fixed price, fixed timeline. Working code in your stack at the end. No retainer, no subscription, no vendor lock-in.",
    bullets: [
      "Week 1: deep dive, design, mid-week review",
      "Week 2: build the core, daily commits",
      "Week 3: integrate into your tools, test, hand over",
      "Code lives on your GitHub. You own it.",
    ],
    cta: "Start the sprint",
    href: BOOKING_URL,
    featured: true,
  },
];

export const SPRINT_WEEKS: Week[] = [
  {
    label: "Week 01",
    title: "Discovery & design",
    days: [
      {
        d: "Mon–Tue",
        lead: "Deep dive.",
        rest: " Sit with the team doing the work. Watch the actual workflow, not the org-chart version.",
      },
      {
        d: "Wed",
        lead: "Mid-week review.",
        rest: " 30-min sync. I show the design + acceptance criteria. We adjust before anything gets built.",
      },
      {
        d: "Thu–Fri",
        lead: "Finalise.",
        rest: " Locked-in design, integration plan, list of what's in and what's explicitly out.",
      },
    ],
  },
  {
    label: "Week 02",
    title: "Build",
    days: [
      {
        d: "Mon–Wed",
        lead: "Core build.",
        rest: " Working end-to-end by mid-week. Daily commits so you watch progress, not wait for a reveal.",
      },
      {
        d: "Thu–Fri",
        lead: "Hardening.",
        rest: " Edge cases, prompt tuning, retries. The part most demos skip and ship anyway.",
      },
    ],
  },
  {
    label: "Week 03",
    title: "Integrate & hand over",
    days: [
      {
        d: "Mon–Tue",
        lead: "Integrate.",
        rest: " Wired into Slack, email, your CRM, internal docs — whatever your team already uses.",
      },
      {
        d: "Wed–Thu",
        lead: "Test in your stack.",
        rest: " Real data, sandbox users. Catch the things the design missed; adjust where needed.",
      },
      {
        d: "Fri",
        lead: "Handover.",
        rest: " Repo transfer, documentation, ~15-min Loom walkthrough, basic monitoring. Then I'm done.",
      },
    ],
  },
];

export const DELIVERABLES: Deliverable[] = [
  {
    what: "Working code, deployed where you deploy",
    note: "// not a demo, not a notebook",
  },
  {
    what: "Source on your GitHub",
    note: "// transferred at handover. yours.",
  },
  {
    what: "Architecture doc + runbook",
    note: "// for the next engineer, including future-you",
  },
  {
    what: "Loom walkthrough (~15 min)",
    note: "// so the team can operate it without me",
  },
  {
    what: "Basic monitoring + alerts",
    note: "// you find out before the user does",
  },
  {
    what: "No subscription, no retainer, no API tokens routed through me",
    note: "// you keep the keys",
  },
];

export const WORKFLOWS: Workflow[] = [
  {
    tag: "KNOWLEDGE",
    title: "Internal Q&A bot",
    desc: "Slack-native. Queries your docs, SOPs and Notion. Cites sources.",
  },
  {
    tag: "DOCUMENTS",
    title: "Supplier invoice processing",
    desc: "Reads PDFs, extracts line items, posts to your accounting system.",
  },
  {
    tag: "SALES",
    title: "Lead triage & qualification",
    desc: "Scores inbound against your ICP, routes to the right rep with context.",
  },
  {
    tag: "SUPPORT",
    title: "Ticket routing & draft replies",
    desc: "Classifies tickets, attaches relevant docs, drafts a first response.",
  },
  {
    tag: "REPORTS",
    title: "Recurring report generation",
    desc: "Pulls from your warehouse, drafts the Monday-morning email by Sunday night.",
  },
  {
    tag: "SALES",
    title: "Call note structuring",
    desc: "Turns transcripts into CRM-ready notes — owner, next step, blockers.",
  },
];

export const FIT_GOOD = [
  "50–300 employees",
  "Ops, sales, or support team with repetitive knowledge work",
  "A decision-maker who can approve €3k without a six-month procurement loop",
  "You already know which workflow hurts. You just need it built.",
];

export const FIT_NO = [
  "Looking for a strategy deck or AI roadmap — I build, I don't advise",
  "Enterprise procurement, MSA negotiations, vendor onboarding portals",
  "Ongoing managed services or a long-term retainer relationship",
  "No one internal has the time to point me at the right problem",
];
