"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { FB_PIXEL_ID, pageview, planFromHref, track, trackCheckout, trackPurchase } from "@/lib/pixel";

/**
 * Injects the Meta Pixel and drives the funnel events:
 * `PageView` on route change, `Lead` on the offer, `InitiateCheckout` on any
 * checkout click (delegated, so every button is covered) and `Purchase` on
 * `/thanks`.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  /** Fires the base events for a route. */
  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      pageview();
    }
    if (pathname === "/offer") track("Lead");
    if (pathname === "/thanks") trackPurchase();
  }, [pathname]);

  /** Delegated checkout tracking: the funnel uses plain anchors. */
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const plan = planFromHref(anchor.href);
      if (plan) trackCheckout(plan.name, plan.value);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
