/**
 * Central funnel config.
 * Everything that changes between environments lives here or in an env var.
 */

/**
 * Each VSL slot carries its own account: a player ID only works
 * under the account that owns it in VTurb.
 */
export const VSL = {
  /** Quiz step (e11): shown after the last question. */
  quiz: {
    account: process.env.NEXT_PUBLIC_VTURB_ACCOUNT ?? "d331dfa7-f65a-427e-934f-2c0eb96fde35",
    idVideo: process.env.NEXT_PUBLIC_VSL_QUIZ_ID ?? "6af4af893b8119193afcee74",
    /** Placeholder aspect ratio (padding-top percentage) — 4:3. */
    aspect: 133.33333333333331,
    /** Seconds before the "Continue" button appears. */
    delay: 75,
  },
  /** Final offer (e23): player above the pitch, with the unlocked anchor CTA. */
  offer: {
    account: process.env.NEXT_PUBLIC_VTURB_ACCOUNT ?? "d331dfa7-f65a-427e-934f-2c0eb96fde35",
    idVideo: process.env.NEXT_PUBLIC_VSL_OFFER_ID ?? "6af363ef05e11b886f13c5ea",
    aspect: 133.33333333333331,
    delay: 233,
  },
} as const;

/** Displayed prices (the processor adds the fee on top). */
export const PRICES = {
  complete: { base: 23, charged: 23 },
  essential: { base: 14.9, charged: 14.9 },
  up1: { base: 47, charged: 50.53 },
  up2: { base: 51.39, charged: 55.18 },
  up3: { base: 60.31, charged: 64.83 },
} as const;

/** The funnel is advertised as a one-time payment throughout. */
export const RECURRING = false;

/** Checkouts. */
export const CHECKOUT = {
  complete: process.env.NEXT_PUBLIC_CHECKOUT_COMPLETE ?? "https://go.centerpag.com/PPU38CQHLHP?upsell=true",
  essential: process.env.NEXT_PUBLIC_CHECKOUT_ESSENTIAL ?? "https://go.centerpag.com/PPU38CQHLHJ?upsell=true",
  /** Discounted rescue offer ($11.90) used only by /backredirect. */
  discount: process.env.NEXT_PUBLIC_CHECKOUT_DISCOUNT ?? "https://go.centerpag.com/PPU38CQHH9E",
  up1: process.env.NEXT_PUBLIC_CHECKOUT_UP1 ?? "https://go.centerpag.com/PPU38CQHLI4?upsell=true",
  up2: process.env.NEXT_PUBLIC_CHECKOUT_UP2 ?? "https://go.centerpag.com/PPU38CQHLI9?upsell=true",
  up3: process.env.NEXT_PUBLIC_CHECKOUT_UP3 ?? "https://go.centerpag.com/PPU38CQHLIE?upsell=true",
} as const;

export const ROUTES = {
  home: "/",
  quiz: "/quiz",
  offer: "/offer",
  up1: "/up1",
  up2: "/up2",
  up3: "/up3",
  thanks: "/thanks",
  login: "/login",
  start: "/start",
  trick: "/start/trick",
  programs: "/start/programs",
  discover: "/start/discover",
  progress: "/start/progress",
  profile: "/start/profile",
  admin: "/admin/login",
} as const;

export const PRODUCT = "Vireon Protocol";
export const DOCTOR = "Dr Michael Thompson";
export const SUPPORT_EMAIL = "support@vireonprotocols.com";

/** Demo credentials for the admin panel. */
export const ADMIN_DEMO = {
  email: "admin@vireonmax.local",
  password: "Vireon-Admin-Demo-19",
} as const;
