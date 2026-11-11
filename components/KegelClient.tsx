"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell, DemoNotice } from "@/components/AppShell";
import { TrickNav } from "@/components/TrickNav";
import { useI18n } from "@/lib/i18n";

const LEVELS = [
  { key: "trick.beginner", reps: 10, hold: 3, rest: 3, sets: 3 },
  { key: "trick.intermediate", reps: 15, hold: 5, rest: 5, sets: 3 },
  { key: "trick.advanced", reps: 20, hold: 10, rest: 10, sets: 3 },
];

const MOVES = ["trick.kegel.move1", "trick.kegel.move2", "trick.kegel.move3"];
const TIPS = ["trick.kegel.tip1", "trick.kegel.tip2", "trick.kegel.tip3"];
const DESC = ["trick.kegel.beat", "trick.kegel.build", "trick.kegel.strong"];

export function KegelClient() {
  const { t, lang } = useI18n();
  const [level, setLevel] = useState(0);
  const [running, setRunning] = useState(false);
  const [left, setLeft] = useState(0);
  const [phase, setPhase] = useState<"hold" | "rest">("hold");
  const [rep, setRep] = useState(0);
  const [done, setDone] = useState(0);
  const timer = useRef<number | null>(null);

  const cfg = LEVELS[level];

  /* Persisted session counter for the streak card. */
  useEffect(() => {
    const raw = window.localStorage.getItem("vireon.kegel.done");
    setDone(raw ? Number(raw) : 0);
  }, []);

  /* One-second tick that flips between hold and rest. */
  useEffect(() => {
    if (!running) return;
    timer.current = window.setInterval(() => {
      setLeft((s) => {
        if (s > 1) return s - 1;
        const nextPhase = phase === "hold" ? "rest" : "hold";
        setPhase(nextPhase);
        if (phase === "hold") setRep((r) => r + 1);
        return nextPhase === "hold" ? cfg.hold : cfg.rest;
      });
    }, 1000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [running, phase, cfg.hold, cfg.rest]);

  function start() {
    setRep(0);
    setPhase("hold");
    setLeft(cfg.hold);
    setRunning(true);
  }

  function stop() {
    setRunning(false);
    setLeft(0);
    const next = done + 1;
    setDone(next);
    window.localStorage.setItem("vireon.kegel.done", String(next));
  }

  return (
    <AppShell current="/start/trick">
      <DemoNotice />
      <TrickNav />

      <div className="space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">{t("trick.kegel.tag")}</p>
        <div>
          <h1 className="font-display text-3xl">{t("trick.kegel.title")}</h1>
          <p className="mt-2 text-sm leading-6 text-mist">{t("trick.kegel.sub")}</p>
        </div>

        <section className="app-card grid grid-cols-4 divide-x divide-white/5 p-4 text-center">
          {[
            { v: done, l: "trick.kegel.streak" },
            { v: done, l: "trick.kegel.week" },
            { v: done, l: "trick.kegel.month" },
            { v: done, l: "trick.kegel.total" },
          ].map((s) => (
            <div key={s.l} className="px-1">
              <p className="font-display text-xl">{s.v}</p>
              <p className="mt-0.5 text-[9px] uppercase leading-tight text-faint">{t(s.l)}</p>
            </div>
          ))}
        </section>

        {LEVELS.map((item, i) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              setLevel(i);
              setRunning(false);
              setLeft(0);
            }}
            aria-pressed={level === i}
            className={`app-card block w-full p-4 text-left transition ${
              level === i ? "border-cyan/50" : "hover:border-white/20"
            }`}
          >
            <p className="font-semibold">{t(item.key)}</p>
            <p className="mt-0.5 text-xs text-mist">{t(DESC[i])}</p>
            <p className="mt-2 text-sm font-semibold text-cyan">
              {item.reps} {t("trick.kegel.reps")}
            </p>
            <p className="text-xs text-faint">
              {t("trick.kegel.hold")} {item.hold}s · {t("trick.kegel.rest")} {item.rest}s
            </p>
            <p className="text-xs text-faint">
              {item.sets} {t("trick.kegel.sets")} · 30s {t("trick.kegel.between")}
            </p>
          </button>
        ))}

        <section className="app-card p-5 text-center">
          <p className="font-display text-4xl tabular-nums">{left}s</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-cyan">
            {running ? (phase === "hold" ? t("trick.kegel.hold") : t("trick.kegel.rest")) : "—"}
          </p>
          <p className="mt-1 text-xs text-faint">
            {rep}/{cfg.reps} {t("trick.kegel.reps")}
          </p>
          <button type="button" onClick={running ? stop : start} className="app-btn mt-4">
            {running ? t("trick.kegel.stop") : t("trick.kegel.start")}
          </button>
        </section>

        <section className="app-card p-5">
          <h2 className="font-display text-lg">{t("trick.kegel.how")}</h2>
          <h3 className="mt-3 text-sm font-semibold">{t("trick.kegel.trains")}</h3>
          <p className="mt-1.5 text-sm leading-6 text-mist">{t("trick.kegel.trainsText")}</p>
          <h3 className="mt-4 text-sm font-semibold">{t("trick.kegel.moves")}</h3>
          <ol className="mt-1.5 list-decimal space-y-1.5 pl-5 text-sm leading-6 text-mist">
            {MOVES.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ol>
          <h3 className="mt-4 text-sm font-semibold">{t("trick.kegel.tips")}</h3>
          <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-sm leading-6 text-mist">
            {TIPS.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
          <span className="hidden">{lang}</span>
        </section>

        <section className="app-card space-y-2 p-5 text-xs leading-6 text-faint">
          <p>{t("legal.short")}</p>
          <p>{t("legal.emergency")}</p>
        </section>
      </div>
    </AppShell>
  );
}
