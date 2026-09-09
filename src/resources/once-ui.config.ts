import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  StyleConfig,
} from "@/types";
import { home } from "./index";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = "https://portfolio-using-nestjs-once-ui.vercel.app";

const routes: RoutesConfig = {
  "/": true,
  "/dev": true,
  "/dev/about": true,
  "/dev/work": true,
  "/research": true,
  "/research/about": true,
  "/research/publications": true,
  "/research/cv": true,
  "/research/contact": true,
  "/research/work": true,
  "/blog": true,
  "/gallery": true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
// (previously had a stale entry pointing at an MDX file that doesn't exist —
// removed per plan.md §7)
const protectedRoutes: ProtectedRoutesConfig = {};

// Import and set font for each variant
// General Sans (Fontshare, self-hosted): UI + headings.
// Newsreader (Google): long-form reading — abstracts, paper summaries, blog body.
// Spline Sans Mono (Google): numerals + code — metrics, DOIs, code blocks.
import localFont from "next/font/local";
import { Newsreader, Spline_Sans_Mono } from "next/font/google";

// next/font requires the loader call's config to be a literal, so the same
// three files are listed twice (heading + label) rather than shared via a
// variable.
const heading = localFont({
  src: [
    { path: "../fonts/general-sans/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/general-sans/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/general-sans/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

const body = Newsreader({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = localFont({
  src: [
    { path: "../fonts/general-sans/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/general-sans/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/general-sans/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-label",
  display: "swap",
});

const code = Spline_Sans_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
//
// neutral/brand/accent are set to "custom" — the actual colors come from the
// --scheme-* ramps in custom.css, generated from the neuroimaging palette in
// tokens.css (plan.md §2.1/§7). "custom" isn't in @once-ui-system/core's
// published NeutralColor/Schemes types for this pinned version even though
// its CSS fully supports the [data-neutral=custom] etc. selectors, so it's
// cast below — this is a type-surface gap in the dependency, not a mistake.
const style: StyleConfig = {
  theme: "dark", // dark | light | system — dark is the design; see plan.md §2
  neutral: "custom" as StyleConfig["neutral"], // sand | gray | slate | custom
  brand: "custom" as StyleConfig["brand"], // ...| custom
  accent: "custom" as StyleConfig["accent"], // ...| custom
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle: DataStyleConfig = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 25,
    size: "2",
    // Neutral, not brand — hippocampus yellow is the primary accent and
    // reserved for the hero highlight/CTA/active nav (plan.md §2.1), not an
    // ambient site-wide wash. At full brand-tint this dot texture read as a
    // loud yellow cast across every page's empty background.
    color: "neutral-alpha-medium",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

// default schema data — drives JSON-LD Person structured data (plan.md §7)
const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: "Faizaan Fazal Khan",
  description: home.description,
  email: "dkfaizaan12@gmail.com",
};

// social links — feeds JSON-LD Person `sameAs`. Scholar/ORCID sourced from
// the real CV (public/assets/cv/Faizaan_Khan_CV_2026.pdf) — load-bearing
// for the research audience (plan.md §5.1, §7).
const sameAs: SameAsConfig = {
  threads: "",
  linkedin: "https://www.linkedin.com/in/faizaan-fazal-a02246242/",
  discord: "https://discordapp.com/users/faizaan3884",
  github: "https://github.com/FaizaanFazal/",
  scholar: "https://scholar.google.com/citations?user=EhVLylsAAAAJ&hl=en",
  orcid: "https://orcid.org/0009-0000-8828-2695",
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  effects,
  dataStyle,
};
