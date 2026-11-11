"use client";

import { useCallback, useEffect, useState } from "react";

const HABITS_KEY = "vireon.member.habits";
const TASKS_KEY = "vireon.member.tasks";
const DAYS_KEY = "vireon.member.days";
const RECENT_KEY = "vireon.member.recent";
const READS_KEY = "vireon.member.reads";
const EVENT = "vireon:progress";

export type RecentEntry = { label: string; at: string };
export type ReadEntry = { title: string; module: string; slug: string; at: string };
/** Checked checklist item, with the moment it was checked so the calendar can use it. */
type Check = { label: string; at: string };

const stamp = () => new Date().toISOString();

const today = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const keyOf = (iso: string) => dayKey(new Date(iso));

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new Event(EVENT));
}

function pushRecent(label: string) {
  const feed = read<RecentEntry[]>(RECENT_KEY, []);
  write(RECENT_KEY, [{ label, at: stamp() }, ...feed].slice(0, 8));
}

type Habits = Record<string, string[]>;

/** Local progress: habit logs, program-day checks, completed days, reads, and a recent feed. */
export function useProgress() {
  const [habits, setHabits] = useState<Habits>({});
  const [tasks, setTasks] = useState<Record<string, Check>>({});
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const [reads, setReads] = useState<ReadEntry[]>([]);

  const load = useCallback(() => {
    setHabits(read<Habits>(HABITS_KEY, {}));
    setTasks(read<Record<string, Check>>(TASKS_KEY, {}));
    setCompletedDays(Object.keys(read<Record<string, string>>(DAYS_KEY, {})));
    setRecent(read<RecentEntry[]>(RECENT_KEY, []));
    setReads(read<ReadEntry[]>(READS_KEY, []));
  }, []);

  useEffect(() => {
    load();
    window.addEventListener(EVENT, load);
    return () => window.removeEventListener(EVENT, load);
  }, [load]);

  const todayHabits = habits[today()] ?? [];

  const toggleHabit = useCallback((key: string, label: string) => {
    const day = today();
    const current = read<Habits>(HABITS_KEY, {});
    const list = current[day] ?? [];
    const next = list.includes(key) ? list.filter((k) => k !== key) : [...list, key];
    write(HABITS_KEY, { ...current, [day]: next });

    if (next.includes(key)) pushRecent(label);
  }, []);

  /** Program-day checklist items, keyed `slug:day:task`. */
  const toggleTask = useCallback((key: string, label: string) => {
    const current = read<Record<string, Check>>(TASKS_KEY, {});
    const checked = key in current;
    if (checked) {
      const next = { ...current };
      delete next[key];
      write(TASKS_KEY, next);
      return;
    }
    write(TASKS_KEY, { ...current, [key]: { label, at: stamp() } });
    pushRecent(label);
  }, []);

  const completeDay = useCallback((id: string, label: string) => {
    const current = read<Record<string, string>>(DAYS_KEY, {});
    if (id in current) return;
    write(DAYS_KEY, { ...current, [id]: stamp() });
    pushRecent(label);
  }, []);

  /** Records that a library item was opened, once per item per session. */
  const logRead = useCallback((title: string, module: string, slug: string) => {
    const current = read<ReadEntry[]>(READS_KEY, []);
    const rest = current.filter((entry) => !(entry.module === module && entry.slug === slug));
    write(READS_KEY, [{ title, module, slug, at: stamp() }, ...rest].slice(0, 12));
  }, []);

  /** Days with a habit log, a checked task, or a completed program day. */
  const activeDayKeys = new Set<string>([
    ...Object.entries(habits)
      .filter(([, list]) => list.length > 0)
      .map(([key]) => key),
    ...Object.values(tasks).map((task) => keyOf(task.at)),
    ...Object.values(read<Record<string, string>>(DAYS_KEY, {})).map((at) => keyOf(at)),
  ]);

  const last28 = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    return dayKey(d);
  });

  const activeDays = last28.filter((key) => activeDayKeys.has(key)).length;

  return {
    habits,
    todayHabits,
    tasks,
    toggleHabit,
    toggleTask,
    completedDays,
    completeDay,
    recent,
    reads,
    logRead,
    activeDays,
    activeDayKeys,
    last28,
  };
}
