/**
 * Meta Pixel (VIREONED) helper.
 * The base snippet lives in `components/MetaPixel.tsx`; this module only
 * queues events, so it is safe to call even before the script loads.
 */

import { CHECKOUT, PRICES } from "@/lib/config";

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "1409241008943823";

type FbqFn = ((...args: unknown[]) => void) & {
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

type FbWindow = Window & { fbq?: FbqFn; _fbq?: unknown };

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: unknown;
  }
}

/** Payments are always shown in dollars across the funnel. */
export const PIXEL_CURRENCY = "USD";

/**
 * Returns `window.fbq`, creating the same stub the official snippet uses so
 * events fired before the script arrives are queued instead of dropped.
 */
function fbq(): FbqFn | null {
  if (typeof window === "undefined") return null;
  const target = window as FbWindow;
  if (!target.fbq) {
    const stub = ((...args: unknown[]) => {
      stub.queue = stub.queue ?? [];
      stub.queue.push(args);
    }) as FbqFn;
    stub.queue = [];
    stub.push = stub;
    stub.loaded = true;
    stub.version = "2.0";
    target.fbq = stub;
    target._fbq = stub;
  }
  return target.fbq;
}

type Params = Record<string, unknown>;

export function pageview() {
  fbq()?.("track", "PageView");
}

export function track(event: string, params?: Params) {
  fbq()?.("track", event, params);
}

/** Fires `InitiateCheckout` for the plan behind a checkout button. */
export function trackCheckout(contentName: string, value: number) {
  track("InitiateCheckout", {
    content_name: contentName,
    currency: PIXEL_CURRENCY,
    value,
  });
}

type Plan = { href: string; name: string; value: number };

/** Checkout destinations mapped to the plan they sell. */
export function checkoutPlans(): Plan[] {
  return [
    { href: CHECKOUT.complete, name: "Vireon Complete", value: PRICES.complete.charged },
    { href: CHECKOUT.essential, name: "Vireon Essential", value: PRICES.essential.charged },
    { href: CHECKOUT.up1, name: "Upsell 1 · 7-Day Accelerator", value: PRICES.up1.charged },
    { href: CHECKOUT.up2, name: "Upsell 2 · Actor's Manual", value: PRICES.up2.charged },
    { href: CHECKOUT.up3, name: "Upsell 3 · Growth Method", value: PRICES.up3.charged },
    { href: CHECKOUT.discount, name: "Discounted Complete", value: 11.9 },
  ];
}

/** Resolves a checkout URL to its plan. */
export function planFromHref(href: string): Plan | undefined {
  return checkoutPlans().find((item) => href.startsWith(item.href));
}

/**
 * Fires `Purchase` once per session: `/thanks` is a plain page that can be
 * reloaded, and a reload is not a new sale.
 */
export function trackPurchase(value?: number) {
  if (typeof window !== "undefined") {
    try {
      const key = "vireon.fb.purchase";
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      /* private mode — fall through and track anyway */
    }
  }
  track("Purchase", {
    content_name: "Vireon Protocol",
    currency: PIXEL_CURRENCY,
    value: value ?? 0,
  });
}
