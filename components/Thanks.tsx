"use client";

import { useState } from "react";

const STEPS = [
  { title: "Check your email", text: "We sent your access to the email used at checkout. It arrives within minutes." },
  {
    title: "Look in Spam / Promotions",
    text: 'If you don\'t see it, search for "Dr. Carlos Jaramillo" and mark it as "Not spam".',
  },
  { title: "Save your access", text: "Add our email to your contacts so you receive every update." },
];

const FAQ = [
  {
    q: "I didn't get the email, what now?",
    a: "Check Spam and Promotions. If it hasn't arrived in 30 minutes, email us and we resend your access immediately.",
  },
  {
    q: "Is this a recurring charge?",
    a: "Exclusive contents are clearly disclosed at checkout. If you want to cancel, email us and we do it the same day.",
  },
  {
    q: "How does the refund work?",
    a: "It is automatic — you don't need to request it. The amount returns to your card within up to 30 days. Email us if you want it sooner.",
  },
];

export function Thanks() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="ty">
      <div className="ty-wrap">
        <section className="ty-fade ty-card ty-hero">
          <div className="ty-check ty-gold" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
            </svg>
          </div>
          <p className="ty-badge">Purchase confirmed</p>
          <h1>Thank you for your purchase!</h1>
          <p className="ty-sub">Your access has been released. Check your email right now to get into the program.</p>
          <a className="ty-access ty-gold" href="/login">
            Access now
          </a>
        </section>

        <section className="ty-card ty-card-pad">
          {STEPS.map((s, i) => (
            <div className="ty-step" key={s.title}>
              <span className="ty-num ty-gold">{i + 1}</span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="ty-card ty-card-pad ty-gold-line">
          <h2>Did you see more than one charge on your card?</h2>
          <p className="ty-body">
            That is completely normal and not an error. Besides the main product, you accepted one or more
            complementary exclusive contents during checkout. Each one appears as a separate charge on your statement.
          </p>
          <ul>
            {[
              "Each charge matches an additional material already included in your access.",
              "Charges may show the payment processor's name instead of the product name.",
              "Nothing was charged without your confirmation on the checkout page.",
            ].map((item) => (
              <li key={item}>
                <span className="ty-mark">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ty-soft ty-refund">
          <h2>🛡️ Automatic refund within 30 days</h2>
          <p className="ty-body">
            You don&apos;t have to do anything: the amount of the exclusive contents is automatically refunded to your
            card within up to 30 days. The refund is already scheduled and will appear on your statement as a credit from
            the same payment processor.
          </p>
        </section>

        <section className="ty-soft ty-warn">
          <h2>⚠️ Important before opening a dispute</h2>
          <p className="ty-body">
            A bank dispute can block your access to the program and takes up to 90 days. By email we resolve any refund
            far faster, with no bureaucracy.
          </p>
        </section>

        <section className="ty-card ty-card-pad">
          <h2>Frequently asked questions</h2>
          <div style={{ marginTop: "12px" }} className="ty-faq">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={item.q}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <div className="ty-q">
                    <span>{item.q}</span>
                    <span className="ty-mark">{isOpen ? "−" : "+"}</span>
                  </div>
                  <p className="ty-answer" hidden={!isOpen}>
                    {item.a}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <p className="ty-foot">Official support · Reply within 24 business hours</p>
      </div>
    </main>
  );
}
