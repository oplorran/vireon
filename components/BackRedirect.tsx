"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CHECKOUT, PRICES, ROUTES } from "@/lib/config";
import { usd } from "@/lib/formato";

const CHAVE_EXPIRA = "vireon_back_expires";
const DEZ_MINUTOS = 10 * 60 * 1000;

/** Applies the URL query string to the checkout, keeping its own product id. */
function comParametros(url: string): string {
  if (typeof window === "undefined") return url;
  try {
    const destino = new URL(url);
    new URLSearchParams(window.location.search).forEach((valor, chave) => {
      if (!destino.searchParams.has(chave)) destino.searchParams.set(chave, valor);
    });
    return destino.toString();
  } catch {
    return url;
  }
}

export function BackRedirect() {
  const router = useRouter();
  const [segundos, setSegundos] = useState(600);
  const checkout = useRef(comParametros(CHECKOUT.discount));

  /** 10-minute countdown shared through sessionStorage. */
  useEffect(() => {
    let expira = 0;
    try {
      expira = Number.parseInt(sessionStorage.getItem(CHAVE_EXPIRA) ?? "", 10) || 0;
    } catch {
      /* private mode */
    }
    if (!expira) {
      expira = Date.now() + DEZ_MINUTOS;
      try {
        sessionStorage.setItem(CHAVE_EXPIRA, String(expira));
      } catch {
        /* private mode */
      }
    }
    const tick = () => {
      setSegundos(Math.max(0, Math.ceil((expira - Date.now()) / 1000)));
      window.setTimeout(tick, 250);
    };
    tick();
  }, []);

  /** Back is trapped on this page too. */
  useEffect(() => {
    const entrar = () => {
      try {
        history.pushState({ vireonOffer: 1 }, "", window.location.href);
      } catch {
        /* ignore */
      }
    };
    entrar();
    window.addEventListener("popstate", entrar);
    return () => window.removeEventListener("popstate", entrar);
  }, []);

  const minutos = String(Math.floor(segundos / 60)).padStart(2, "0");
  const resto = String(segundos % 60).padStart(2, "0");

  function pular() {
    router.push(`${ROUTES.offer}${window.location.search}${window.location.hash}`);
  }

  return (
    <div className="br-page">
      <div className="br-wrap">
        <div className="br-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/esquizz/assets/logo-vireon.png" alt="Vireon" />
        </div>

        <div className="br-card">
          <div className="br-badge">
            <span className="br-dot" /> Exclusive Offer
          </div>
          <div className="br-icon" aria-hidden="true">
            🔓
          </div>
          <div className="br-label">Wait — Don&apos;t leave</div>
          <h1>
            Get the Complete Plan for
            <br />
            <span>{usd(11.9)} instead of {usd(PRICES.complete.charged)}</span>
          </h1>
          <p className="br-sub">
            You&apos;re about to leave the Complete plan behind. Protocol, daily plan, private login, and all 8 bonuses —
            an <strong>exclusive {usd(11.1)} discount</strong>, only on this page.
          </p>

          <div className="br-prices">
            <div className="br-old">
              <div className="br-k">Original price</div>
              <b>{usd(PRICES.complete.charged)}</b>
            </div>
            <div className="br-arrow">→</div>
            <div className="br-now">
              <div className="br-k">Your price now</div>
              <b>{usd(11.9)}</b>
              <div className="br-save">Save {usd(11.1)}</div>
            </div>
          </div>

          <div className="br-timer">
            ⏱ Offer expires in: <span className="br-t">{minutos}</span> : <span className="br-t">{resto}</span>
          </div>

          <a className="br-cta" id="claim" href={checkout.current}>
            Yes! Claim the Complete Plan for {usd(11.9)}
          </a>
          <button className="br-skip" type="button" onClick={pular}>
            No thanks, I&apos;ll pay full price later
          </button>

          <div className="br-foot">🔒 Secure payment · 30-day guarantee · Private login</div>
          <div className="br-trust">
            <span>✅ Digital access</span>
            <span>✅ Results vary</span>
          </div>
          <p className="br-note">Educational program. Not a substitute for medical advice.</p>
        </div>
      </div>
    </div>
  );
}
