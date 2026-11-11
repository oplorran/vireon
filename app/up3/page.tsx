"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CHECKOUT, PRICES, ROUTES } from "@/lib/config";
import { useUtms } from "@/lib/useUtms";
import { usd } from "@/lib/formato";

const BENEFITS = [
  { icon: "📏", label: "+5 to 7 cm" },
  { icon: "🔄", label: "Permanent" },
  { icon: "🏆", label: "97% Success" },
];

export default function Up3Page() {
  const router = useRouter();
  const { temUtm, externo } = useUtms();
  const hasUtm = temUtm;
  const acceptRef = useRef<HTMLAnchorElement | null>(null);
  const href = externo(CHECKOUT.up3);

  const [size, setSize] = useState(14);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  /** Same 0.5 cm / 300 ms climb up to 19.5 cm as the original. */
  function grow() {
    if (running) return;
    setRunning(true);
    const timer = setInterval(() => {
      setSize((current) => {
        const next = Math.min(19.5, current + 0.5);
        if (next >= 19.5) {
          clearInterval(timer);
          setDone(true);
        }
        return next;
      });
    }, 300);
  }

  useEffect(() => {
    if (!hasUtm) return undefined;
    const timer = setTimeout(() => acceptRef.current?.click(), 14000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUtm]);

  function decline() {
    if (hasUtm) window.location.href = href;
    else router.push(`${ROUTES.thanks}${window.location.search}${window.location.hash}`);
  }

  const barHeight = running ? (size / 19.5) * 80 : 57;

  return (
    <main className="up3-page">
      <div className="up3-container">
        <header>
          <div className="up3-notice">
            <p>🚨 LAST CHANCE · This offer will NEVER return</p>
          </div>
          <div className="up3-progress-top">
            <div>
              <p className="up3-progress-eyebrow">Expansion Module</p>
              <p className="up3-progress-step">Final Step</p>
            </div>
            <span className="up3-progress-number">99%</span>
          </div>
          <div
            className="up3-progress-track"
            role="progressbar"
            aria-valuenow={99}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progress"
          >
            <div className="up3-progress-fill" style={{ width: "99%" }} />
          </div>
        </header>

        <section className="up3-shell" aria-label="Offer">
          <div className="up3-status">
            <span className="up3-status-dot" aria-hidden="true" />
            <p className="up3-status-label">Final Step · Permanent Expansion</p>
          </div>
          <h1>+7 CM in 90 Days — Clinically Proven</h1>
          <p className="up3-intro">
            The protocol restores your performance. But without the{" "}
            <span className="up3-accent">Progressive Growth Method</span>, your penis will never reach its maximum
            structural size. <strong>Over 8,900 men have already gained up to a real +7 cm.</strong>
          </p>

          <div className="up3-widget up3-measure">
            <span className="up3-measure-pill">Clinical Simulator</span>
            <p className="up3-measure-title">Growth Projection</p>
            <div className="up3-chart-bars" aria-label="Growth chart from 14 to 19.5 centimeters">
              <div className="up3-bar-container">
                <div className="up3-bar up3-bar-old">
                  <span className="up3-bar-top-label">Today</span>
                </div>
                <p className="up3-bar-bottom">14 cm</p>
              </div>
              <div className="up3-bar-container up3-right">
                <div className="up3-bar up3-bar-new" style={{ height: `${barHeight}px` }}>
                  <span className="up3-bar-top-label">{size.toFixed(1)} cm</span>
                </div>
                <p className="up3-bar-bottom up3-new">Week 12</p>
              </div>
            </div>
            <button type="button" className="up3-measure-button" id="growth-btn" onClick={grow} disabled={running}>
              {done ? "Growth Verified" : running ? "Calculating Growth..." : "See Maximum Potential"}
            </button>
            <p className="up3-measure-disclaimer">
              *Results based on stimulation of the corpora cavernosa according to the Jaramillo method.
            </p>
          </div>

          <div className="up3-benefits">
            {BENEFITS.map((b) => (
              <div className="up3-benefit" key={b.label}>
                <p className="up3-benefit-icon">{b.icon}</p>
                <p className="up3-benefit-label">{b.label}</p>
              </div>
            ))}
          </div>

          <div className="up3-selection">
            <div className="up3-selection-row">
              <span className="up3-selection-icon" aria-hidden="true">
                📏
              </span>
              <div className="up3-selection-content">
                <p className="up3-selection-title">Yes, Add the Growth Method</p>
                <p className="up3-selection-detail">Up to +7 cm in 90 days · Structural</p>
              </div>
              <span className="up3-selection-check" aria-hidden="true">
                ✓
              </span>
            </div>
          </div>

          <div className="up3-action-area">
            {!hasUtm && (
              <div className="up3-purchase-price" role="group" aria-label={`One-time payment: ${usd(PRICES.up3.charged)}`}>
                <span className="up3-price-label">One-time payment</span>
                <strong className="up3-price-value">{usd(PRICES.up3.charged)}</strong>
              </div>
            )}
            <a
              ref={acceptRef}
              className="up3-cta"
              id="accept-link"
              href={href}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = href;
              }}
            >
              🔥 YES! I WANT MY +7 CM NOW →
            </a>
            <p className="up3-guarantee">⏳ Once-in-a-lifetime offer · ✅ 90-Day Guarantee</p>
            <button type="button" className="up3-decline" id="decline-link" onClick={decline}>
              No thanks, I would rather stay small and insecure
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
