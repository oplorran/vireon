"use client";

import { useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { REVIEWS, useI18n } from "@/lib/i18n";

const FAQ = [1, 2, 3, 4, 5];
const LEVELS = ["beginner", "intermediate", "advanced"] as const;

type Errors = { weight?: string; age?: string };
type Dose = { grams: number; waterMl: number; lemon: string; spoon: string; timing: string };

/** Reference validation: 40–150 kg, 18–80 years. */
function validate(weight: string, age: string): Errors {
  const errors: Errors = {};
  const w = Number(weight);
  const a = Number(age);
  if (!weight.trim() || !Number.isFinite(w) || w < 40 || w > 150) errors.weight = "trick.err.weight";
  if (!age.trim() || !Number.isFinite(a) || a < 18 || a > 80) errors.age = "trick.err.age";
  return errors;
}

/** Reference formula: weight/10*0.5, age and experience adjustments, spoon banding. */
function doseFor(weight: number, age: number, level: (typeof LEVELS)[number]): Dose {
  let grams = (weight / 10) * 0.5;
  if (age > 60) grams *= 0.8;
  else if (age < 25) grams *= 0.9;
  if (level === "beginner") grams *= 0.75;
  else if (level === "intermediate") grams *= 0.9;

  const rounded = Math.round(grams * 10) / 10;
  const spoons = rounded / 4.5;
  const spoon =
    spoons < 0.5
      ? "trick.spoon.quarter"
      : spoons < 0.75
        ? "trick.spoon.half"
        : spoons < 1.25
          ? "trick.spoon.one"
          : spoons < 1.75
            ? "trick.spoon.oneHalf"
            : "trick.spoon.two";

  return {
    grams: rounded,
    waterMl: Math.round(Math.max(250, rounded * 100)),
    lemon: rounded > 3 ? "trick.lemon.half" : "trick.lemon.third",
    spoon,
    timing: "trick.timing",
  };
}

function Stars({ label }: { label: string }) {
  return (
    <p className="mt-2 flex gap-0.5 text-cyan" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
      ))}
    </p>
  );
}

export function TrickClient() {
  const { t, lang } = useI18n();
  const [weight, setWeight] = useState("75");
  const [age, setAge] = useState("35");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("beginner");
  const [errors, setErrors] = useState<Errors>({});
  const [dose, setDose] = useState<Dose | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  function calc(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(weight, age);
    setErrors(found);
    if (found.weight || found.age) {
      setDose(null);
      return;
    }
    setDose(doseFor(Number(weight), Number(age), level));
  }

  const steps = [
    { title: t("trick.step.1.title"), body: t("trick.step.1.body", { ml: dose?.waterMl ?? 250 }) },
    {
      title: t("trick.step.2.title"),
      body: t("trick.step.2.body", { spoon: t(dose?.spoon ?? "trick.spoon.one"), grams: dose?.grams ?? 3 }),
    },
    { title: t("trick.step.3.title"), body: t("trick.step.3.body", { lemon: t(dose?.lemon ?? "trick.lemon.third") }) },
    { title: t("trick.step.4.title"), body: t("trick.step.4.body") },
    { title: t("trick.step.5.title"), body: t(dose?.timing ?? "trick.timing") },
  ];

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        <section className="app-card overflow-hidden bg-[radial-gradient(420px_180px_at_100%_0%,rgba(73,210,255,0.22),transparent_55%),linear-gradient(160deg,#12305f,#07101f)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{t("trick.tag")}</p>
          <h1 className="mt-2 font-display text-3xl leading-tight">{t("trick.title")}</h1>
          <p className="mt-2 text-sm leading-6 text-mist">{t("trick.sub")}</p>
          <p className="mt-3 text-xs text-faint">{t("trick.social")}</p>
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-xl">{t("trick.calc.title")}</h2>
          <form onSubmit={calc} className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-sm text-mist">{t("trick.weight")}</span>
                <input
                  className="app-input"
                  inputMode="decimal"
                  value={weight}
                  aria-invalid={Boolean(errors.weight)}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setErrors({});
                    setDose(null);
                  }}
                />
                {errors.weight && (
                  <span role="alert" className="mt-1 block text-xs text-danger">
                    {t(errors.weight)}
                  </span>
                )}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-mist">{t("trick.age")}</span>
                <input
                  className="app-input"
                  inputMode="numeric"
                  value={age}
                  aria-invalid={Boolean(errors.age)}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setErrors({});
                    setDose(null);
                  }}
                />
                {errors.age && (
                  <span role="alert" className="mt-1 block text-xs text-danger">
                    {t(errors.age)}
                  </span>
                )}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-mist">{t("trick.exp")}</span>
                <select
                  className="app-input"
                  value={level}
                  onChange={(e) => {
                    setLevel(e.target.value as (typeof LEVELS)[number]);
                    setDose(null);
                  }}
                >
                  <option value="beginner">{t("trick.beginner")}</option>
                  <option value="intermediate">{t("trick.intermediate")}</option>
                  <option value="advanced">{t("trick.advanced")}</option>
                </select>
              </label>
            </div>

            <button type="submit" className="app-btn w-full">
              {t("trick.submit")}
            </button>
          </form>

          {dose && (
            <div
              role="region"
              aria-live="polite"
              aria-label={t("trick.result.tag")}
              className="mt-4 rounded-2xl border border-cyan/20 bg-cyan/5 p-4"
            >
              <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-mist">
                {t("trick.result.tag")}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-night p-3 text-center">
                  <p className="font-display text-2xl text-cyan">{dose.grams} g</p>
                  <p className="mt-1 text-xs text-faint">{t("trick.result.soda")}</p>
                  <p className="text-xs text-cyan">{t(dose.spoon)}</p>
                </div>
                <div className="rounded-2xl bg-night p-3 text-center">
                  <p className="font-display text-2xl">{dose.waterMl} ml</p>
                  <p className="mt-1 text-xs text-faint">{t("trick.result.water")}</p>
                  <p className="text-xs text-mist">{t("trick.result.glass")}</p>
                </div>
                <div className="rounded-2xl bg-night p-3 text-center">
                  <p className="text-2xl" aria-hidden="true">
                    🍋
                  </p>
                  <p className="mt-1 text-xs text-faint">{t("trick.result.lemon")}</p>
                  <p className="text-xs text-mist">{t(dose.lemon)}</p>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-mist">{t(dose.timing)}</p>
            </div>
          )}
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl">{t("trick.steps.title")}</h2>
          {steps.map((step, i) => (
            <section key={step.title} className="app-card flex items-start gap-3 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan/10 font-semibold text-cyan">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-mist">{step.body}</p>
              </div>
            </section>
          ))}
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="font-display text-xl">{t("trick.reviews.title")}</h2>
            <p className="mt-1 text-sm text-mist">{t("trick.reviews.sub")}</p>
          </div>

          {REVIEWS[lang].map((review) => (
            <section key={review.name} className="app-card p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-semibold text-white">
                  {review.name.slice(0, 1)}
                </span>
                <p className="font-semibold">{review.name}</p>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-mist">
                  {t("trick.days", { n: review.days })}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-mist">{review.text}</p>
              <Stars label={t("trick.stars")} />
            </section>
          ))}

          <p className="text-center text-sm text-faint">{t("trick.reviews.more")}</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-xl">{t("trick.faq.title")}</h2>
          {FAQ.map((n) => {
            const isOpen = open === n;
            return (
              <section key={n} className="app-card p-4">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : n)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <span className="font-medium">{t(`trick.faq.${n}.q`)}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`shrink-0 ${isOpen ? "text-cyan" : "text-faint"}`}
                  >
                    {isOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="m6 9 6 6 6-6" />}
                  </svg>
                </button>
                {isOpen && <p className="mt-3 text-sm leading-6 text-mist">{t(`trick.faq.${n}.a`)}</p>}
              </section>
            );
          })}
        </section>

        <aside className="rounded-2xl border border-warn/30 bg-warn/10 p-4 text-sm leading-6 text-warn">
          <p className="font-semibold">{t("trick.notice.title")}</p>
          <p className="mt-1">{t("trick.notice.text")}</p>
        </aside>

        <aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist">
          <p className="font-semibold text-foam">{t("legal.short")}</p>
          <p className="mt-1">{t("legal.line")}</p>
          <p className="mt-1">{t("legal.emergency")}</p>
        </aside>
      </div>
    </AppShell>
  );
}
