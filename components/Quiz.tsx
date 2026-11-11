"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AGE_BANDS, QUESTIONS, type Answers } from "@/lib/quiz";
import { Vsl } from "@/components/Vsl";
import { DoctorBadge, Stars } from "@/components/Identidade";
import { ROUTES, VSL } from "@/lib/config";
import { useUtms } from "@/lib/useUtms";

/**
 * Original step order (e1–e23):
 *  e1 landing · e2 age/weight · e3 symptoms · e4 duration · e5 profile saved
 *  e6 soda · e7 lemon · e8 spice · e9 allergy · e10 3/4 confirmed
 *  e11 VSL · e12 tried · e13 goal · e14 sleep · e15 water · e16 routine
 *  e17 dose calibrated · e18 analysis · e19 how to use · e20 stories
 *  e21 loading · e22 guarantee · e23 offer
 */
type Stage =
  | { kind: "age" }
  | { kind: "question"; index: number }
  | { kind: "saved" }
  | { kind: "confirmed" }
  | { kind: "vsl" }
  | { kind: "calibrated" }
  | { kind: "analysis" }
  | { kind: "howto" }
  | { kind: "stories" }
  | { kind: "loading" }
  | { kind: "guarantee" };

const Q = (id: string) => QUESTIONS.findIndex((q) => q.id === id);

/** Steps that carry the full assessment header (e2–e4, e6–e9, e12–e16). */
const QUESTION_STEPS = [2, 3, 4, 6, 7, 8, 9, 12, 13, 14, 15, 16];

/** Pipeline groups, exactly as in the original progress math. */
const GROUPS = [
  [2, 3, 4],
  [6, 7, 8, 9],
  [12, 13, 14, 15, 16],
  [23],
];

/** 1-based funnel position of each question index (e3, e4, e6–e9, e12–e16). */
const STEP_OF_QUESTION = [3, 4, 6, 7, 8, 9, 12, 13, 14, 15, 16];

function stepOf(stage: Stage): number {
  switch (stage.kind) {
    case "age":
      return 2;
    case "question":
      return STEP_OF_QUESTION[stage.index];
    case "saved":
      return 5;
    case "confirmed":
      return 10;
    case "vsl":
      return 11;
    case "calibrated":
      return 17;
    case "analysis":
      return 18;
    case "howto":
      return 19;
    case "stories":
      return 20;
    case "loading":
      return 21;
    case "guarantee":
      return 22;
    default:
      return 23;
  }
}

function progressOf(step: number): number {
  for (const group of GROUPS) {
    const at = group.indexOf(step);
    if (at !== -1) return ((at + 1) / group.length) * 100;
  }
  return 100;
}

/** Header credibility label, by phase. */
function phaseLabel(step: number): string {
  if (step <= 4) return "Profile assessment";
  if (step <= 10) return "Ingredient check";
  if (step <= 16) return "Dose calibration";
  return "Protocol ready";
}

/** Position inside the current block, e.g. "2/4". */
function sectionLabel(step: number): string {
  if (step >= 2 && step <= 4) return `${step - 1}/3`;
  if (step >= 6 && step <= 9) return `${step - 5}/4`;
  if (step >= 12 && step <= 16) return `${step - 11}/5`;
  return "";
}

type Ingredient = { label: string; status: "confirmed" | "selected" | "calibrated" | "pending" };

const INGREDIENT_STYLE: Record<Ingredient["status"], { icon: string; color: string }> = {
  confirmed: { icon: "✅", color: "#2a9d6f" },
  selected: { icon: "✅", color: "#2a9d6f" },
  calibrated: { icon: "✅", color: "#2a9d6f" },
  pending: { icon: "🔒", color: "#aaa" },
};

/** Same storage contract as the original funnel: numeric step keys. */
const CHAVE_RESPOSTAS = "esquiz_quiz_answers";
const CHAVE_CONCLUIDO = "esquiz_quiz_completed";

function salvarResposta(passo: number, valor: string | string[]) {
  try {
    const atual = JSON.parse(localStorage.getItem(CHAVE_RESPOSTAS) ?? "{}") as Record<string, string | string[]>;
    atual[String(passo)] = valor;
    localStorage.setItem(CHAVE_RESPOSTAS, JSON.stringify(atual));
  } catch {
    /* private mode */
  }
}

export function Quiz() {
  const router = useRouter();
  const { interno } = useUtms();
  const [stage, setStage] = useState<Stage>({ kind: "age" });
  const [answers, setAnswers] = useState<Answers>({});
  const [ageBand, setAgeBand] = useState<string | null>(null);
  const [age, setAge] = useState(45);
  const [weight, setWeight] = useState(78);
  const [unit, setUnit] = useState<"lb" | "kg">("lb");
  const [guarantee, setGuarantee] = useState(false);
  const [percent, setPercent] = useState(0);
  const [line, setLine] = useState(0);
  const [toast, setToast] = useState<{ icon: string; message: string } | null>(null);
  const [exitModal, setExitModal] = useState(false);
  const [vslUnlocked, setVslUnlocked] = useState(false);
  const [recipeReady, setRecipeReady] = useState(false);

  const index = stage.kind === "question" ? stage.index : -1;
  const question = index >= 0 ? QUESTIONS[index] : null;
  const selected = question ? (answers[question.id] ?? []) : [];

  /* Hold-to-repeat on the age / weight steppers: tap once, then it keeps
     moving after 400 ms every 75 ms, exactly like the original control. */
  const holdTimeout = useRef<number | null>(null);
  const holdInterval = useRef<number | null>(null);

  const stopHold = useCallback(() => {
    if (holdTimeout.current !== null) window.clearTimeout(holdTimeout.current);
    if (holdInterval.current !== null) window.clearInterval(holdInterval.current);
    holdTimeout.current = null;
    holdInterval.current = null;
  }, []);

  const startHold = useCallback(
    (delta: number, apply: (step: number) => void) => {
      apply(delta);
      holdTimeout.current = window.setTimeout(() => {
        holdInterval.current = window.setInterval(() => apply(delta), 75);
      }, 400);
    },
    [],
  );

  useEffect(() => stopHold, [stopHold]);

  const step = stepOf(stage);
  const progress = progressOf(step);
  const withHeader = QUESTION_STEPS.includes(step);

  const save = useCallback(() => {
    try {
      sessionStorage.setItem("vireon_answers", JSON.stringify({ ...answers, ageBand, age, weight, unit }));
    } catch {
      /* private mode */
    }
  }, [answers, ageBand, age, weight, unit]);

  const goOffer = useCallback(() => {
    save();
    try {
      localStorage.setItem(CHAVE_CONCLUIDO, "1");
    } catch {
      /* private mode */
    }
    router.push(interno(ROUTES.offer));
  }, [save, router, interno]);

  const advance = useCallback(() => {
    setStage((current) => {
      if (current.kind === "age") return { kind: "question", index: 0 };
      if (current.kind === "question") {
        // e4 (duration) → e5 "profile saved"
        if (current.index === Q("duration")) return { kind: "saved" };
        // e9 (allergy) → e10 "3 out of 4 confirmed"
        if (current.index === Q("allergy")) return { kind: "confirmed" };
        const next = current.index + 1;
        if (next >= QUESTIONS.length) return { kind: "calibrated" };
        return { kind: "question", index: next };
      }
      // e5 → e6 (baking soda)
      if (current.kind === "saved") return { kind: "question", index: Q("baking_soda") };
      // e10 → e11 (VSL)
      if (current.kind === "confirmed") return { kind: "vsl" };
      // e11 → e12 (tried)
      if (current.kind === "vsl") return { kind: "question", index: Q("tried") };
      if (current.kind === "calibrated") return { kind: "analysis" };
      if (current.kind === "analysis") return { kind: "howto" };
      if (current.kind === "howto") return { kind: "stories" };
      if (current.kind === "stories") return { kind: "loading" };
      // e21 donut finishes → e22 guarantee
      if (current.kind === "loading") return { kind: "guarantee" };
      if (current.kind === "guarantee") return current;
      return current;
    });
  }, []);

  const back = useCallback(() => {
    setStage((current) => {
      if (current.kind === "age") return current;
      if (current.kind === "question") {
        if (current.index === 0) return { kind: "age" };
        return { kind: "question", index: current.index - 1 };
      }
      if (current.kind === "saved") return { kind: "question", index: Q("duration") };
      if (current.kind === "confirmed") return { kind: "question", index: Q("allergy") };
      if (current.kind === "vsl") return { kind: "confirmed" };
      if (current.kind === "calibrated") return { kind: "question", index: QUESTIONS.length - 1 };
      if (current.kind === "analysis") return { kind: "calibrated" };
      if (current.kind === "howto") return { kind: "analysis" };
      if (current.kind === "stories") return { kind: "howto" };
      if (current.kind === "loading") return { kind: "stories" };
      if (current.kind === "guarantee") return { kind: "loading" };
      return current;
    });
  }, []);

  /** e5/e10/e17: the recipe card shows 600 ms after the screen appears. */
  useEffect(() => {
    const transicao = stage.kind === "saved" || stage.kind === "confirmed" || stage.kind === "calibrated";
    if (!transicao) {
      setRecipeReady(false);
      return undefined;
    }
    const timer = setTimeout(() => setRecipeReady(true), 600);
    return () => clearTimeout(timer);
  }, [stage.kind]);

  /** e21: donut fills over 5.5s while the four lines land one per second. */
  useEffect(() => {
    if (stage.kind !== "loading") return undefined;
    const started = Date.now();
    const total = 5500;
    setPercent(0);
    setLine(0);
    const tick = setInterval(() => {
      const done = Date.now() - started;
      const value = Math.min((done / total) * 100, 100);
      setPercent(value);
      if (value >= 100) {
        clearInterval(tick);
        setTimeout(advance, 300);
      }
    }, 50);
    const lines = [0, 1, 2, 3].map((i) => setTimeout(() => setLine(i + 1), i * 1000));
    return () => {
      clearInterval(tick);
      lines.forEach(clearTimeout);
    };
  }, [stage.kind, advance]);

  /** e15: "Calibrating the liquid proportions" toast, then the next step. */
  useEffect(() => {
    if (!toast) return undefined;
    const started = Date.now();
    const total = 2500;
    setPercent(0);
    const tick = setInterval(() => {
      const value = Math.min(((Date.now() - started) / total) * 100, 100);
      setPercent(value);
      if (value >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          setToast(null);
          advance();
        }, 200);
      }
    }, 30);
    return () => clearInterval(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  /** e11: the "Continue" button only appears after the player's delay. */
  useEffect(() => {
    if (stage.kind !== "vsl") return undefined;
    setVslUnlocked(false);
    const timer = setTimeout(() => setVslUnlocked(true), VSL.quiz.delay * 1000);
    return () => clearTimeout(timer);
  }, [stage.kind]);

  function answer(text: string) {
    if (!question) return;
    const current = answers[question.id] ?? [];
    if (question.multiple) {
      const next = current.includes(text) ? current.filter((t) => t !== text) : [...current, text];
      setAnswers((a) => ({ ...a, [question.id]: next }));
      salvarResposta(step, next);
      return;
    }
    setAnswers((a) => ({ ...a, [question.id]: [text] }));
    salvarResposta(step, text);
    // e15 shows a calibration toast; e9 opens the retention modal.
    if (question.id === "water") {
      setToast({ icon: "💧", message: "Calibrating the liquid proportions in your formula..." });
      return;
    }
    if (question.id === "allergy") {
      setExitModal(true);
      return;
    }
    setTimeout(advance, 500);
  }

  function modalContinue() {
    setExitModal(false);
    advance();
  }

  const shell = (children: React.ReactNode) => (
    <div className="mx-auto flex max-w-[440px] flex-col items-center px-6 py-6">{children}</div>
  );

  const backButton = (
    <button
      type="button"
      onClick={back}
      aria-label="Back"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  /* ---------- Shared assessment header (avatar, phase, section, bar) ---------- */
  const header = (
    <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-[440px] px-4 pb-1 pt-2">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {backButton}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/esquizz/dr/dr-thompson.png"
              alt="Dr Michael Thompson"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border-2 border-emerald-500 object-cover"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[14px] font-semibold text-[#1a1a1a]" style={{ letterSpacing: "-0.02em" }}>
                  Dr Michael Thompson
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#2a9d6f" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-[12px] text-[#888]">{phaseLabel(step)}</span>
            </div>
          </div>
          <span className="text-[12px] text-[#888]">{sectionLabel(step)}</span>
        </div>
        <div className="w-full px-4 py-2">
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );

  /* ---------- Step: age and weight (e2) ---------- */
  if (stage.kind === "age") {
    // The original keeps the weight in kilograms and converts for the lb view.
    const mostrado = unit === "lb" ? Math.round(weight * 2.20462) : weight;
    const minimo = unit === "lb" ? Math.round(40 * 2.20462) : 40;
    const maximo = unit === "lb" ? Math.round(200 * 2.20462) : 200;
    const mudar = (delta: number) =>
      setWeight((v) => {
        const atual = unit === "lb" ? Math.round(v * 2.20462) : v;
        const alvo = Math.min(maximo, Math.max(minimo, atual + delta));
        return unit === "lb" ? alvo / 2.20462 : alvo;
      });
    return (
      <div className="min-h-screen bg-white">
        {header}

        <div className="pt-24">
          {shell(
            <>
              <h2 className="mb-1 text-center text-[24px] font-bold leading-tight text-[#1a1a1a]">
                What is your age and weight?
              </h2>
              <p className="mb-5 text-center text-[13px] leading-relaxed text-[#888]">
                This determines the exact baking soda concentration in your formula.
              </p>

              <div className="mb-4 flex flex-col gap-2">
                {AGE_BANDS.map((band) => {
                  const active = ageBand === band;
                  return (
                    <button
                      key={band}
                      type="button"
                      onClick={() => setAgeBand(band)}
                      className={`flex items-center gap-3 rounded-xl border px-5 py-3.5 text-left transition-all duration-200 ${
                        active ? "border-2 border-[#2a9d6f] bg-[#f0faf5]" : "border-[#e8e8e8]"
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
                          active ? "border-[#2a9d6f] bg-[#2a9d6f]" : "border-[#ccc]"
                        }`}
                      >
                        {active && <span className="text-xs text-white">✓</span>}
                      </span>
                      <span className="text-[15px] font-medium text-[#1a1a1a]">{band}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2">
                <p className="mb-2 text-center text-[13px] font-medium text-[#666]">Prefer to give your exact age?</p>
                <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[#e8f2ec] bg-[#f8fbf9] px-3 py-4">
                  <button
                    type="button"
                    aria-label="Decrease"
                    disabled={age <= 18}
                    onPointerDown={() => age > 18 && startHold(-1, (d) => setAge((v) => Math.max(18, v + d)))}
                    onPointerUp={stopHold}
                    onPointerLeave={stopHold}
                    onPointerCancel={stopHold}
                    className={`flex h-12 w-12 select-none items-center justify-center rounded-full border-2 border-[#2a9d6f] text-2xl font-bold transition-all ${
                      age <= 18 ? "cursor-not-allowed bg-[#e8e8e8] text-[#aaa]" : "bg-white text-[#2a9d6f] active:scale-90"
                    }`}
                  >
                    −
                  </button>
                  <div className="flex flex-1 items-baseline justify-center gap-1.5">
                    <span className="text-[40px] font-extrabold leading-none tabular-nums text-[#1a1a1a]">{age}</span>
                    <span className="text-[15px] font-medium text-[#666]">years</span>
                  </div>
                  <button
                    type="button"
                    aria-label="Increase"
                    disabled={age >= 95}
                    onPointerDown={() => age < 95 && startHold(1, (d) => setAge((v) => Math.min(95, v + d)))}
                    onPointerUp={stopHold}
                    onPointerLeave={stopHold}
                    onPointerCancel={stopHold}
                    className={`flex h-12 w-12 select-none items-center justify-center rounded-full text-2xl font-bold transition-all ${
                      age >= 95 ? "cursor-not-allowed bg-[#e8e8e8] text-[#aaa]" : "bg-[#2a9d6f] text-white active:scale-90"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-center text-[13px] font-medium text-[#666]">Your current weight</p>
                <div className="mb-2 flex items-center justify-center">
                  <div className="inline-flex rounded-full border border-[#e8e8e8] bg-[#f0f3f1] p-1">
                    {(["lb", "kg"] as const).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUnit(u)}
                        aria-pressed={unit === u}
                        className={`min-w-[64px] rounded-full px-4 py-1.5 text-[13px] font-semibold transition-all ${
                          unit === u ? "bg-[#2a9d6f] text-white shadow-sm" : "text-[#666]"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-[#e8f2ec] bg-[#f8fbf9] px-3 py-4">
                  <button
                    type="button"
                    aria-label="Decrease"
                    disabled={mostrado <= minimo}
                    onPointerDown={() => mostrado > minimo && startHold(-1, mudar)}
                    onPointerUp={stopHold}
                    onPointerLeave={stopHold}
                    onPointerCancel={stopHold}
                    className={`flex h-12 w-12 select-none items-center justify-center rounded-full border-2 border-[#2a9d6f] text-2xl font-bold transition-all ${
                      mostrado <= minimo
                        ? "cursor-not-allowed bg-[#e8e8e8] text-[#aaa]"
                        : "bg-white text-[#2a9d6f] active:scale-90"
                    }`}
                  >
                    −
                  </button>
                  <div className="flex flex-1 flex-col items-center">
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="text-[40px] font-extrabold leading-none tabular-nums text-[#1a1a1a]">
                        {mostrado}
                      </span>
                      <span className="text-[15px] font-medium text-[#666]">{unit}</span>
                    </div>
                    <span className="mt-1 text-[12px] tabular-nums text-[#8a8a8a]">
                      ≈ {unit === "lb" ? Math.round(weight) : Math.round(weight * 2.20462)} {unit === "lb" ? "kg" : "lb"}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="Increase"
                    disabled={mostrado >= maximo}
                    onPointerDown={() => mostrado < maximo && startHold(1, mudar)}
                    onPointerUp={stopHold}
                    onPointerLeave={stopHold}
                    onPointerCancel={stopHold}
                    className={`flex h-12 w-12 select-none items-center justify-center rounded-full text-2xl font-bold transition-all ${
                      mostrado >= maximo
                        ? "cursor-not-allowed bg-[#e8e8e8] text-[#aaa]"
                        : "bg-[#2a9d6f] text-white active:scale-90"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>
            </>,
          )}
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e8e8e8] bg-white px-6 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <div className="mx-auto max-w-[440px]">
            <button
              type="button"
              onClick={() => {
                const valor = `${ageBand ?? `${age} years`} · ${mostrado} ${unit}`;
                setAnswers((a) => ({ ...a, age_weight: [valor] }));
                salvarResposta(2, valor);
                advance();
              }}
              className="w-full rounded-xl bg-[#2a9d6f] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#238c5c]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Transition screens (e5 / e10 / e17) ---------- */
  const transition = (
    headline: string,
    subtitle: string,
    recipePercent: number,
    ingredients: Ingredient[],
  ) => (
    <div className="min-h-screen bg-white">
      <StepTop onBack={back} />
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-10 pt-16">
        <div className="mx-auto flex w-full max-w-[440px] flex-col items-center">
          <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#2a9d6f] transition-transform duration-300">
            <span className="text-3xl text-white">✓</span>
          </div>
          <h2 className="mb-1 text-center text-[22px] font-bold text-[#1a1a1a]" style={{ letterSpacing: "-0.02em" }}>
            {headline}
          </h2>
          <p className="mb-6 text-center text-[13px] text-[#888]">{subtitle}</p>

          {/* The recipe card lands 600 ms after the screen, as in the original. */}
          <div className={`mb-5 w-full transition-all duration-400 ${recipeReady ? "opacity-100" : "opacity-0"}`}>
            <div className="w-full rounded-xl border border-[#e8e8e8] bg-[#f8fbf9] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#1a1a1a]">📋 Your personalized recipe</span>
                <span className="text-[12px] font-bold text-[#2a9d6f]">{recipePercent}%</span>
              </div>
              <div className="mb-3 h-1.5 rounded-full bg-[#e8e8e8]">
                <div
                  className="h-full rounded-full bg-[#2a9d6f] transition-all duration-700"
                  style={{ width: recipeReady ? `${recipePercent}%` : "0%" }}
                />
              </div>
              <div className="flex flex-col gap-2">
                {ingredients.map((row, i) => {
                  const style = INGREDIENT_STYLE[row.status];
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-2 transition-all duration-300"
                      style={{
                        opacity: recipeReady ? 1 : 0,
                        transform: recipeReady ? "translateX(0)" : "translateX(-10px)",
                        transitionDelay: `${i * 150}ms`,
                      }}
                    >
                      <span className="text-sm">{style.icon}</span>
                      <span className="text-[13px] text-[#1a1a1a]">{row.label}</span>
                      <span className="ml-auto text-[11px]" style={{ color: style.color }}>
                        — {row.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={advance}
            className="w-full rounded-xl bg-[#2a9d6f] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#238c5c]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  if (stage.kind === "saved") {
    return transition("✅ Profile saved", "Checking your ingredients...", 25, [
      { label: "Baking soda", status: "pending" },
      { label: "Ingredient 2", status: "pending" },
      { label: "Ingredient 3", status: "pending" },
      { label: "Ingredient 4", status: "pending" },
    ]);
  }

  if (stage.kind === "confirmed") {
    return transition(
      "✅ 3 out of 4 ingredients confirmed",
      "Your recipe is 75% ready. All that is left is calibrating the doses.",
      75,
      [
        { label: "Baking soda", status: "confirmed" },
        { label: "Ingredient 2", status: "selected" },
        { label: "Ingredient 3", status: "calibrated" },
        { label: "Ingredient 4", status: "pending" },
      ],
    );
  }

  if (stage.kind === "calibrated") {
    return transition("✅ Dose calibrated", "Your personalized protocol is ready.", 90, [
      { label: "Baking soda", status: "confirmed" },
      { label: "Ingredient 2", status: "selected" },
      { label: "Ingredient 3", status: "calibrated" },
      { label: "Ingredient 4 + doses", status: "pending" },
    ]);
  }

  /* ---------- VSL (e11) ---------- */
  if (stage.kind === "vsl") {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-4">
          {shell(
            <>
              <DoctorBadge />
              <h2 className="mt-4 text-center text-[22px] font-bold leading-tight text-[#1a1a1a]">
                Watch this video before you continue
              </h2>
              <p className="mb-4 mt-1 text-center text-[13px] text-[#888]">The specialist explains exactly how it works.</p>
              <div className="mb-3 w-full">
                <Vsl variant="quiz" />
              </div>
              {vslUnlocked && (
                <button
                  type="button"
                  onClick={advance}
                  className="mt-3 w-full rounded-xl bg-[#2a9d6f] py-3.5 text-[16px] font-semibold text-white"
                >
                  Continue
                </button>
              )}
            </>,
          )}
        </div>
      </div>
    );
  }

  /* ---------- Analysis result (e18) ---------- */
  if (stage.kind === "analysis") {
    return (
      <div className="min-h-screen bg-white">
        <StepTop onBack={back} />
        <div className="pb-28 pt-6">
          {shell(
            <>
              <DoctorBadge />
              <h2 className="mb-4 mt-4 text-center text-[24px] font-bold text-[#1a1a1a]">Your analysis result</h2>
              <p className="mb-1 text-[13px] text-[#888]">Vascular blockage level</p>
              <p className="mb-4 text-[48px] font-extrabold text-[#c62828]">7.4</p>

              <div className="mb-5 w-full rounded-xl border border-[#ffcdd2] bg-[#fff5f5] p-5">
                <span className="mb-3 inline-block rounded-full bg-[#c62828] px-3 py-1 text-[12px] font-bold text-white">
                  🔴 MODERATE TO HIGH BLOCKAGE
                </span>
                <p className="mb-2 text-[14px] text-[#1a1a1a]">
                  Based on your answers, we see signs of significant vascular blockage caused by crystallized deposits.
                </p>
                <p className="mb-3 text-[14px] text-[#1a1a1a]">
                  Your symptoms match a 60% to 89% blockage of blood flow to the penis.
                </p>
                <p className="text-[14px] font-semibold text-[#2a9d6f]">
                  💡 With the right protocol you can start dissolving those deposits and get your erections back within
                  the first few days.
                </p>
              </div>

              <div className="mb-5 w-full rounded-xl border-2 border-[#2a9d6f] bg-[#f8fbf9] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg">📋</span>
                  <h3 className="text-[16px] font-bold text-[#1a1a1a]">Your personalized recipe</h3>
                </div>
                <div className="mb-3 flex flex-col gap-2.5">
                  {[
                    { icon: "✅", label: "Baking soda", tag: "— confirmed", dim: false },
                    { icon: "✅", label: "Ingredient 2", tag: "— selected", dim: false },
                    { icon: "✅", label: "Ingredient 3", tag: "— calibrated", dim: false },
                    { icon: "🔒", label: "Ingredient 4", tag: "— pending", dim: true },
                    { icon: "🔒", label: "Exact doses", tag: "— pending", dim: true },
                  ].map((row) => (
                    <div key={row.label} className={`flex items-center gap-2 ${row.dim ? "opacity-60" : ""}`}>
                      <span className="text-sm">{row.icon}</span>
                      <span className={`text-[14px] font-medium ${row.dim ? "text-[#888]" : "text-[#1a1a1a]"}`}>
                        {row.label}
                      </span>
                      <span className={`ml-auto text-[11px] ${row.dim ? "text-[#aaa]" : "text-[#2a9d6f]"}`}>
                        {row.tag}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-[13px] italic text-[#555]">
                  To unlock the remaining ingredients and the exact doses, get the complete protocol.
                </p>
              </div>

              <p className="mb-3 text-[16px] font-bold text-[#1a1a1a]">The benefits of the baking soda trick 🧪</p>
              <div className="mb-5 w-full space-y-2">
                {[
                  "100% natural homemade recipe",
                  "Clears the blockages from the inside",
                  "Improves blood flow to the intimate area",
                  "Hard, long-lasting results",
                  "Visible improvement in size",
                  "No contraindications",
                  "Quick to prepare at home",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-lg bg-[#f0faf5] px-4 py-3">
                    <span className="text-[#2a9d6f]">✅</span>
                    <span className="text-[14px] text-[#1a1a1a]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mb-5 w-full rounded-xl border border-[#e8e8e8] p-5">
                <Stars className="mb-2 text-sm" />
                <p className="mb-2 text-[14px] italic text-[#1a1a1a]">
                  &quot;In 5 days I got morning erections back like I was 20&quot;
                </p>
                <p className="text-[13px] text-[#888]">Richard, 54 — Tampa</p>
              </div>
            </>,
          )}
        </div>
        <StepBottom onClick={advance} label="Continue" />
      </div>
    );
  }

  /* ---------- How to use (e19) ---------- */
  if (stage.kind === "howto") {
    return (
      <div className="min-h-screen bg-white">
        <StepTop onBack={back} />
        <div className="pt-10">
          {shell(
            <>
              <h2 className="mb-1 text-center text-[24px] font-bold text-[#1a1a1a]">How to use the baking soda trick</h2>
              <p className="mb-6 text-center text-[15px] text-[#555]">Simple, fast and effective</p>

              <div className="mb-6 w-full space-y-3">
                {[
                  ["Prepare the mix", "A simple recipe from your protocol"],
                  ["Drink it once a day", "In the morning or before bed"],
                  ["Follow it for 30 days", "The complete protocol"],
                ].map(([title, text], i) => (
                  <div key={title} className="flex items-start gap-3 rounded-xl border border-[#e8e8e8] bg-[#f8faf8] p-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2a9d6f] text-sm font-bold text-white">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#1a1a1a]">{title}</p>
                      <p className="text-[13px] text-[#888]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6 flex w-full gap-2">
                {["Once a day", "Easy to prepare", "100% natural recipe"].map((item) => (
                  <div
                    key={item}
                    className="flex flex-1 items-center gap-1.5 rounded-lg border border-[#d4edda] bg-[#f0faf5] px-3 py-2.5"
                  >
                    <span className="shrink-0 text-[#2a9d6f]">✅</span>
                    <span className="text-[12px] font-semibold leading-tight text-[#1a1a1a]">{item}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={advance}
                className="w-full rounded-xl bg-[#2a9d6f] py-3.5 text-[16px] font-semibold text-white"
              >
                ✅ Yes, I&apos;m committed
              </button>
            </>,
          )}
        </div>
      </div>
    );
  }

  /* ---------- Stories (e20) ---------- */
  if (stage.kind === "stories") {
    const stories = [
      ["/esquizz/assets/t-james.jpg", "James, 57", "Dallas", "In 4 days my morning erections were back. My wife couldn't believe it."],
      ["/esquizz/assets/t-steve.jpg", "Steve, 56", "Phoenix", "I spent $700 on Viagra. The baking soda cost me $2 and works better."],
      ["/esquizz/assets/t-michael.jpg", "Michael, 63", "Denver", "The urologist said it was normal at my age. Now I have sex 3 times a week."],
      ["/esquizz/assets/t-paul.jpg", "Paul, 61", "Atlanta", "My wife asked what had gotten into me. For 2 months we can't stop."],
    ];
    return (
      <div className="min-h-screen bg-white">
        <StepTop onBack={back} />
        <div className="pb-28 pt-12">
          {shell(
            <>
              <h2 className="mb-1 text-center text-[24px] font-bold text-[#1a1a1a]">Transformation stories</h2>
              <p className="mb-5 text-center text-[15px] text-[#555]">
                See what real men achieved with the baking soda trick
              </p>

              <div className="mb-6 w-full space-y-3">
                {stories.map(([src, who, city, quote]) => (
                  <div key={who} className="rounded-xl border border-[#e8e8e8] p-5">
                    <div className="mb-3 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={who}
                        width={48}
                        height={48}
                        loading="lazy"
                        className="h-12 w-12 rounded-full border border-[#e8e8e8] object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-[#1a1a1a]">{who}</p>
                        <p className="text-[12px] text-[#888]">{city}</p>
                      </div>
                      <Stars />
                    </div>
                    <p className="text-[14px] font-semibold italic text-[#1a1a1a]">&quot;{quote}&quot;</p>
                  </div>
                ))}
              </div>
            </>,
          )}
        </div>
        <StepBottom onClick={advance} label="I want my protocol ⚡" />
      </div>
    );
  }

  /* ---------- Loading (e21): donut + percentage ---------- */
  if (stage.kind === "loading") {
    const lines = [
      "Checking your data...",
      "Evaluating your levels...",
      "Setting your personalized doses...",
      "Finalizing your protocol...",
    ];
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    return (
      <div className="min-h-[60vh] bg-white">
        <div className="mx-auto flex min-h-[60vh] max-w-[440px] flex-col items-center justify-center px-6">
          <div className="relative mb-8 h-[140px] w-[140px]">
            <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
              <circle cx="70" cy="70" r={radius} fill="none" stroke="#e8e8e8" strokeWidth="4" />
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="#2a9d6f"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (percent / 100) * circumference}
                className="transition-all duration-100 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[24px] font-bold text-[#1a1a1a]">{Math.round(percent)}%</span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            {lines.map((text, i) => (
              <div
                key={text}
                className="text-center text-[14px] transition-all duration-500"
                style={{
                  opacity: i < line ? 1 : 0,
                  transform: i < line ? "translateY(0)" : "translateY(8px)",
                  color: i === line - 1 ? "#2a9d6f" : "#888",
                  fontWeight: i === line - 1 ? 600 : 400,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Guarantee (e22) ---------- */
  if (stage.kind === "guarantee") {
    return (
      <div className="min-h-screen bg-white px-5 py-5">
        <div className="mx-auto w-full max-w-[430px]">
          <div className="border-b border-[#e5e7eb] pb-4">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/esquizz/dr/dr-thompson.png"
                alt="Dr Michael Thompson"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-emerald-500 object-cover"
              />
              <div>
                <p className="text-xs font-semibold text-gray-800">Dr Michael Thompson</p>
                <p className="text-[10px] text-emerald-600">Certified protocol</p>
              </div>
            </div>
          </div>

          <section className="pt-6">
            <p className="mb-2 text-xs font-bold uppercase text-[#2a9d6f]">Your protection</p>
            <h1 className="text-[32px] font-extrabold leading-[1.06] text-[#1f252e]">
              Try Vireon <span className="text-[#2a9d6f]">risk-free</span>
            </h1>
            <p className="mt-3 text-base font-medium leading-relaxed text-[#64748b]">
              If the protocol is not right for you, request a full refund within 30 days. No complicated process.
            </p>

            <button
              type="button"
              aria-label="Activate 30-day guarantee"
              aria-pressed={guarantee}
              onClick={() => setGuarantee((v) => !v)}
              className="mx-auto mt-8 flex h-44 w-44 flex-col items-center justify-center rounded-full border-[6px] border-double border-[#2a9d6f]/30 bg-[#2a9d6f]/5 text-[#2a9d6f] transition-transform active:scale-95"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="mb-1"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-[29px] font-black leading-none">30-DAY</span>
              <span className="mt-1 text-[10px] font-bold uppercase">Money-back guarantee</span>
            </button>
            <p className="mt-3 text-center text-[11px] font-bold uppercase text-[#64748b]">Tap the seal to activate</p>

            <div className="mt-6 space-y-3">
              {["30 days to explore the complete protocol", "A simple refund request if it is not for you"].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm font-semibold text-[#1f252e]">
                  <span className="text-[#2a9d6f]">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={guarantee}
              onClick={() => setGuarantee((v) => !v)}
              className="mt-6 flex min-h-[88px] w-full items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-4 text-left shadow-sm"
            >
              <span
                className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
                  guarantee ? "bg-[#2a9d6f]" : "bg-[#e5e7eb]"
                }`}
              >
                <span
                  className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                    guarantee ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </span>
              <span>
                <span className="block text-sm font-bold text-[#1f252e]">Activate my 30-day money-back guarantee</span>
                <span className="mt-1 block text-xs text-[#64748b]">Your protection is included with either plan.</span>
              </span>
            </button>

            <button
              type="button"
              onClick={goOffer}
              disabled={!guarantee}
              className="mt-5 h-14 w-full rounded-xl bg-[#1f3a2e] text-base font-bold text-white disabled:opacity-50"
            >
              See my final recommendation →
            </button>
            {!guarantee && (
              <p className="mt-3 text-center text-xs font-semibold text-[#64748b]">Activate your guarantee to continue</p>
            )}
          </section>
        </div>
      </div>
    );
  }

  /* ---------- Question steps (e3, e4, e6–e9, e12–e16) ---------- */
  return (
    <div className="min-h-screen bg-white">
      {header}

      <div className="pt-24">
        {shell(
          <div className="w-full">
            <h2 className="mb-1 text-center text-[24px] font-bold leading-tight text-[#1a1a1a]">{question?.title}</h2>
            <p className="mb-5 text-center text-[13px] leading-relaxed text-[#888]">{question?.help}</p>

            <div className="mt-5 flex flex-col gap-2.5" role={question?.multiple ? "group" : "radiogroup"}>
              {question?.options.map((option, i) => {
                const active = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => answer(option)}
                    aria-pressed={active}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                      active
                        ? "border-2 border-[#2a9d6f] bg-[#f0faf5]"
                        : "border-[#e8e8e8] hover:border-[#2a9d6f] hover:bg-[#f8fbf9]"
                    }`}
                    style={{ padding: "16px 20px" }}
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center ${
                        question.multiple ? "rounded-sm" : "rounded-full"
                      } border-2 ${active ? "border-[#2a9d6f] bg-[#2a9d6f]" : "border-[#ccc]"}`}
                    >
                      {active && <span className="text-xs text-white">✓</span>}
                    </span>
                    <span className="flex-1 text-[15px] font-medium text-[#1a1a1a]">
                      {question.emojis?.[i] ? `${question.emojis[i]} ` : ""}
                      {option}
                    </span>
                    {question.id === "duration" && <span className="shrink-0 text-lg text-[#ccc]">›</span>}
                  </button>
                );
              })}
            </div>

            {question?.multiple && (
              <button
                type="button"
                onClick={advance}
                disabled={selected.length === 0}
                className={`mt-5 w-full rounded-xl py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 ${
                  selected.length === 0 ? "cursor-not-allowed bg-[#e8e8e8]" : "bg-[#2a9d6f] hover:bg-[#238c5c]"
                }`}
              >
                Continue
              </button>
            )}
          </div>,
        )}
      </div>

      {/* Retention modal shown right after the allergy answer (e9). */}
      {exitModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6"
          onClick={modalContinue}
          role="presentation"
        >
          <div
            className="w-full max-w-[340px] rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <p className="mb-3 text-2xl">⚠️</p>
            <h3 className="mb-3 text-[18px] font-bold text-[#1a1a1a]" style={{ letterSpacing: "-0.02em" }}>
              Wait — your analysis is already {Math.round(progress)}% complete
            </h3>
            <p className="mb-3 text-[14px] leading-relaxed text-[#555]">
              If you leave now, all your data will be lost and you&apos;ll have to start over.
            </p>
            <p className="mb-3 text-[14px] leading-relaxed text-[#555]">
              Your personalized protocol will be ready in under 60 seconds.
            </p>
            <p className="mb-5 text-[13px] italic text-[#888]">
              Crystallized deposits won&apos;t go away on their own. Every day without the protocol makes the blockage
              worse.
            </p>
            <button
              type="button"
              onClick={modalContinue}
              className="w-full rounded-xl bg-[#2a9d6f] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#238c5c]"
            >
              Continue my analysis →
            </button>
          </div>
        </div>
      )}

      {/* Calibration toast shown after the water answer (e15). */}
      {toast && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="mx-6 w-full max-w-[340px] rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex flex-col items-center">
              <span className="mb-3 text-4xl">{toast.icon}</span>
              <p className="mb-4 text-center text-[14px] font-medium text-[#1a1a1a]">{toast.message}</p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                <div
                  className="h-full rounded-full bg-[#2a9d6f] transition-all duration-100 ease-linear"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepTop({ onBack, percent = 100 }: { onBack: () => void; percent?: number }) {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <div className="h-1 rounded-sm bg-[#e8e8e8]">
          <div
            className="h-full rounded-sm bg-[#2a9d6f] transition-all duration-300 ease-in-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onBack}
        className="fixed left-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
        aria-label="Back"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}

function StepBottom({
  onClick,
  label,
  disabled,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e8e8e8] bg-white px-6 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="mx-auto max-w-[440px]">
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className="w-full rounded-xl bg-[#2a9d6f] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#238c5c] disabled:opacity-50"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
