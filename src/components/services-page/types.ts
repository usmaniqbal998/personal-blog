export interface Tier {
  num: string;
  kind: string;
  name: string;
  price: string;
  priceUnit: string;
  title: string;
  desc: string;
  bullets: string[];
  credit?: string;
  cta: string;
  href: string;
  featured?: boolean;
}

export interface WeekDay {
  d: string;
  lead: string;
  rest: string;
}

export interface Week {
  label: string;
  title: string;
  days: WeekDay[];
}

export interface Deliverable {
  what: string;
  note: string;
}

export interface Workflow {
  tag: string;
  title: string;
  desc: string;
}
