"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CATEGORIES } from "@/lib/content";
import { ED_ITEMS } from "@/lib/ed-content";
import { PROGRAMS } from "@/lib/programs";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
export type Role = "admin" | "member";
export type Status = "active" | "suspended" | "deleted";
export type Access = "active" | "revoked" | "none" | "expired";

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  status: Status;
  access: Access;
  emailVerified: boolean;
  isSample: boolean;
  createdAt: string;
};

export type InviteStatus = "active" | "used" | "revoked" | "expired";

export type Invitation = {
  id: string;
  label: string;
  hint: string;
  intendedEmail: string;
  expiresAt: string;
  status: InviteStatus;
  usedByEmail: string | null;
  isSample: boolean;
  createdAt: string;
};

export type Kind = "foods" | "recipes" | "exercises" | "articles";

export type Nutrition = {
  serving?: string;
  calories?: string;
  protein?: string;
  carbohydrates?: string;
  fat?: string;
  fiber?: string;
  note?: string;
};

export type LibraryItem = {
  id: string;
  kind: Kind;
  slug: string;
  summary: string;
  image: string | null;
  published: boolean;
  clinicalReview: "pending" | "approved";
  name?: string;
  title?: string;
  category?: string;
  description?: string;
  body?: string;
  context?: string;
  module?: string;
  minutes?: number;
  servings?: number;
  difficulty?: string;
  duration?: string;
  repetitions?: string;
  safety?: string;
  contraindications?: string;
  nutrition?: Nutrition;
  nutrients?: string;
  mealIdeas?: string;
  ingredients?: string;
  steps?: string;
  instructions?: string;
  sources?: string;
};

export type AdminDay = {
  id: string;
  dayNumber: number;
  title: string;
  introduction: string;
  article: string;
  activityTitle: string;
  activityBody: string;
  weekNumber: number;
  weekTitle: string | null;
  published: boolean;
  tasks: string;
};

export type AdminProgram = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  level: string;
  published: boolean;
  clinicalReview: "pending" | "approved";
  days: AdminDay[];
};

export type Notice = { id: string; title: string; body: string; isSample: boolean; createdAt: string };

export type OutboxMessage = { id: string; to: string; subject: string; body: string; createdAt: string };

export type AdminSettings = { supportEmail: string; showPendingClinicalContent: boolean };

export type Activity = { id: string; summary: string; isSample: boolean; at: string };

/* ------------------------------------------------------------------ */
/* Storage helpers                                                     */
/* ------------------------------------------------------------------ */
const KEY = {
  people: "vireon.admin.people",
  invites: "vireon.admin.invites",
  library: "vireon.admin.library",
  programs: "vireon.admin.programs",
  notices: "vireon.admin.notices",
  outbox: "vireon.admin.outbox",
  settings: "vireon.admin.settings",
  activity: "vireon.admin.activity",
  seeded: "vireon.admin.seeded",
} as const;

export const ADMIN_KEY = KEY;

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function read<T>(key: string): T[] | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode */
  }
}

/* ------------------------------------------------------------------ */
/* Seeds                                                               */
/* ------------------------------------------------------------------ */
const now = () => new Date().toISOString();
const days = (n: number) => new Date(Date.now() + n * 864e5).toISOString();

const SEED_PEOPLE: Person[] = [
  {
    id: "u-admin",
    firstName: "Avery",
    lastName: "Quinn",
    email: "admin@vireonmax.local",
    role: "admin",
    status: "active",
    access: "none",
    emailVerified: true,
    isSample: false,
    createdAt: days(-40),
  },
  {
    id: "u-alex",
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex@vireonmax.local",
    role: "member",
    status: "active",
    access: "active",
    emailVerified: true,
    isSample: true,
    createdAt: days(-21),
  },
  {
    id: "u-jordan",
    firstName: "Jordan",
    lastName: "Lee",
    email: "jordan@vireonmax.local",
    role: "member",
    status: "active",
    access: "active",
    emailVerified: true,
    isSample: true,
    createdAt: days(-14),
  },
  {
    id: "u-sam",
    firstName: "Sam",
    lastName: "Patel",
    email: "sam@vireonmax.local",
    role: "member",
    status: "suspended",
    access: "revoked",
    emailVerified: true,
    isSample: true,
    createdAt: days(-9),
  },
];

const SEED_INVITES: Invitation[] = [
  {
    id: "inv-demo",
    label: "Final vite",
    hint: "8f2c4e",
    intendedEmail: "",
    expiresAt: days(14),
    status: "active",
    usedByEmail: null,
    isSample: true,
    createdAt: days(-2),
  },
];

const SEED_NOTICES: Notice[] = [
  {
    id: "n-welcome",
    title: "Welcome to VIREON MAX",
    body: "Your sample account is ready. Progress on this account is demonstration data stored in the local browser.",
    isSample: true,
    createdAt: days(-7),
  },
];

const SEED_OUTBOX: OutboxMessage[] = [
  {
    id: "o-verify",
    to: "alex@vireonmax.local",
    subject: "Confirm your email",
    body: "Open the link below to confirm this address. The link expires in one day.",
    createdAt: days(-21),
  },
];

const SEED_ACTIVITY: Activity[] = [
  { id: "a1", summary: "Alex Morgan completed a program day.", isSample: true, at: days(-1) },
  { id: "a2", summary: "Demo library published.", isSample: true, at: days(-6) },
  { id: "a3", summary: "Jordan Lee finished the 7-day program.", isSample: true, at: days(-8) },
  { id: "a4", summary: "Alex Morgan activated a demo invite.", isSample: true, at: days(-21) },
];

const SEED_SETTINGS: AdminSettings = {
  supportEmail: "support@vireonprotocols.com",
  showPendingClinicalContent: true,
};

const KIND_CATEGORY: Record<Kind, string> = {
  foods: "nutrition",
  recipes: "recipes",
  exercises: "exercises",
  articles: "ed",
};

function seedLibrary(): LibraryItem[] {
  const out: LibraryItem[] = [];
  (["foods", "recipes", "exercises"] as Kind[]).forEach((kind) => {
    const category = CATEGORIES.find((c) => c.slug === KIND_CATEGORY[kind]);
    category?.items.forEach((item, index) => {
      const base: LibraryItem = {
        id: id("lib"),
        kind,
        slug: item.slug,
        summary: item.text.en,
        image: null,
        published: true,
        clinicalReview: "approved",
      };
      if (kind === "recipes") {
        out.push({
          ...base,
          title: item.title.en,
          category: "breakfast",
          minutes: 15,
          servings: 2,
          difficulty: "Easy",
          ingredients: "",
          steps: (item.body?.en ?? []).join("\n"),
        });
      } else {
        out.push({
          ...base,
          name: item.title.en,
          category: kind === "foods" ? "Heart-Healthy Foods" : "Cardiovascular Exercise",
          description: item.text.en,
          context: kind === "foods" ? item.text.en : undefined,
          instructions: kind === "exercises" ? (item.body?.en ?? []).join("\n") : undefined,
          duration: kind === "exercises" ? "10 minutes" : undefined,
          repetitions: kind === "exercises" ? "As comfortable" : undefined,
          safety:
            kind === "exercises"
              ? "Stop if you feel pain, dizziness, or chest discomfort."
              : undefined,
          contraindications:
            kind === "exercises" ? "Skip this if a clinician has limited your activity." : undefined,
        });
      }
      void index;
    });
  });
  ED_ITEMS.forEach((item) => {
    out.push({
      id: id("lib"),
      kind: "articles",
      slug: item.slug,
      summary: item.text.en,
      image: null,
      published: true,
      clinicalReview: "approved",
      title: item.title.en,
      module: "ed",
      category: "Education",
      body: (item.body?.en ?? [item.text.en]).join("\n\n"),
      minutes: 5,
      sources: "",
    });
  });
  return out;
}

function seedPrograms(): AdminProgram[] {
  return PROGRAMS.map((program) => ({
    id: id("prog"),
    slug: program.slug,
    title: program.slug === "7-day-starter" ? "7-day starter" : "30-day wellness journey",
    summary:
      program.slug === "7-day-starter"
        ? "A short introduction to habits you can repeat."
        : "A month of educational routines, one day at a time.",
    level: program.level,
    published: true,
    clinicalReview: "approved",
    days: program.weeks.flatMap((week) =>
      week.days.map((day) => ({
        id: id("day"),
        dayNumber: day.dayNumber,
        title: day.title.en,
        introduction: day.introduction,
        article: day.article,
        activityTitle: day.activityTitle,
        activityBody: day.activityBody,
        weekNumber: week.week,
        weekTitle: week.title,
        published: true,
        tasks: day.tasks.join("\n"),
      })),
    ),
  }));
}

/* ------------------------------------------------------------------ */
/* Hook                                                                */
/* ------------------------------------------------------------------ */
export function useAdmin() {
  const [ready, setReady] = useState(false);
  const [people, setPeople] = useState<Person[]>(SEED_PEOPLE);
  const [invites, setInvites] = useState<Invitation[]>(SEED_INVITES);
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [programs, setPrograms] = useState<AdminProgram[]>([]);
  const [notices, setNotices] = useState<Notice[]>(SEED_NOTICES);
  const [outbox] = useState<OutboxMessage[]>(SEED_OUTBOX);
  const [settings, setSettings] = useState<AdminSettings>(SEED_SETTINGS);
  const [activity, setActivity] = useState<Activity[]>(SEED_ACTIVITY);

  useEffect(() => {
    try {
      const first = window.localStorage.getItem(KEY.seeded) !== "1";
      if (first) {
        write(KEY.people, SEED_PEOPLE);
        write(KEY.invites, SEED_INVITES);
        write(KEY.library, seedLibrary());
        write(KEY.programs, seedPrograms());
        write(KEY.notices, SEED_NOTICES);
        write(KEY.outbox, SEED_OUTBOX);
        write(KEY.activity, SEED_ACTIVITY);
        write(KEY.settings, [SEED_SETTINGS as unknown as AdminSettings]);
        window.localStorage.setItem(KEY.seeded, "1");
      }
      setPeople(read<Person>(KEY.people) ?? SEED_PEOPLE);
      setInvites(read<Invitation>(KEY.invites) ?? SEED_INVITES);
      setLibrary(read<LibraryItem>(KEY.library) ?? []);
      setPrograms(read<AdminProgram>(KEY.programs) ?? []);
      setNotices(read<Notice>(KEY.notices) ?? SEED_NOTICES);
      setActivity(read<Activity>(KEY.activity) ?? SEED_ACTIVITY);
      const storedSettings = read<AdminSettings>(KEY.settings)?.[0];
      if (storedSettings) setSettings(storedSettings);
    } catch {
      /* private mode: keep the in-memory seed */
    }
    setReady(true);
  }, []);

  const logActivity = useCallback((summary: string) => {
    setActivity((list) => {
      const next = [{ id: id("a"), summary, isSample: false, at: now() }, ...list].slice(0, 40);
      write(KEY.activity, next);
      return next;
    });
  }, []);

  const updatePeople = useCallback((next: Person[]) => {
    setPeople(next);
    write(KEY.people, next);
  }, []);

  const updateInvites = useCallback((next: Invitation[]) => {
    setInvites(next);
    write(KEY.invites, next);
  }, []);

  const updateLibrary = useCallback((next: LibraryItem[]) => {
    setLibrary(next);
    write(KEY.library, next);
  }, []);

  const updatePrograms = useCallback((next: AdminProgram[]) => {
    setPrograms(next);
    write(KEY.programs, next);
  }, []);

  const updateNotices = useCallback((next: Notice[]) => {
    setNotices(next);
    write(KEY.notices, next);
  }, []);

  const counts = useMemo(() => {
    const accounts = people.filter((p) => p.status !== "deleted");
    return {
      accounts: accounts.length,
      activeMembers: accounts.filter((p) => p.role === "member" && p.status === "active" && p.access === "active").length,
      suspended: accounts.filter((p) => p.status === "suspended" || p.access === "revoked").length,
      programsStarted: accounts.filter(
        (p) => p.role === "member" && p.status !== "deleted" && p.access === "active",
      ).length,
      sampleData: accounts.some((p) => p.isSample),
    };
  }, [people]);

  /* ----------------------------- actions ----------------------------- */
  function toggleStatus(personId: string) {
    const target = people.find((p) => p.id === personId);
    if (!target) return;
    const next: Status = target.status === "suspended" ? "active" : "suspended";
    updatePeople(
      people.map((p) =>
        p.id === personId
          ? { ...p, status: next, access: next === "suspended" ? "revoked" : "active" }
          : p,
      ),
    );
    logActivity(
      `${target.firstName} ${target.lastName} ${next === "suspended" ? "was suspended." : "was reactivated."}`,
    );
  }

  function toggleAccess(personId: string) {
    const target = people.find((p) => p.id === personId);
    if (!target) return;
    const next: Access = target.access === "revoked" ? "active" : "revoked";
    updatePeople(people.map((p) => (p.id === personId ? { ...p, access: next } : p)));
    logActivity(
      `Access ${next === "revoked" ? "removed for" : "returned to"} ${target.firstName} ${target.lastName}.`,
    );
  }

  function createInvite(input: { label: string; email: string; expiresInDays: number }) {
    const token = Math.random().toString(36).slice(2, 14);
    const invite: Invitation = {
      id: id("inv"),
      label: input.label.trim() || "Invitation",
      hint: token.slice(0, 8),
      intendedEmail: input.email.trim(),
      expiresAt: days(Math.max(1, Math.min(90, input.expiresInDays))),
      status: "active",
      usedByEmail: null,
      isSample: false,
      createdAt: now(),
    };
    updateInvites([invite, ...invites]);
    logActivity(`Invite created for ${invite.label}.`);
    return { ...invite, token };
  }

  function revokeInvite(inviteId: string) {
    const target = invites.find((i) => i.id === inviteId);
    updateInvites(invites.map((i) => (i.id === inviteId ? { ...i, status: "revoked" } : i)));
    if (target) {
      logActivity(`Invite ${target.label} revoked.`);
      if (target.usedByEmail) {
        updatePeople(
          people.map((p) => (p.email === target.usedByEmail ? { ...p, access: "revoked" } : p)),
        );
      }
    }
  }

  function saveSettings(next: AdminSettings) {
    setSettings(next);
    write(KEY.settings, [next as unknown as AdminSettings]);
    logActivity("Settings saved.");
  }

  function removeSampleData() {
    updatePeople(people.filter((p) => !p.isSample));
    updateInvites(invites.filter((i) => !i.isSample));
    updateNotices(notices.filter((n) => !n.isSample));
    setActivity((list) => {
      const next = list.filter((a) => !a.isSample);
      write(KEY.activity, next);
      return next;
    });
    logActivity("Demo accounts removed. Content stays.");
  }

  /* ---------------------------- library ------------------------------ */
  function createItem(kind: Kind, item: Omit<LibraryItem, "id" | "kind">) {
    const created: LibraryItem = { ...item, id: id("lib"), kind };
    updateLibrary([created, ...library]);
    logActivity(`${created.name || created.title || "Item"} created.`);
    return created;
  }

  function saveItem(itemId: string, item: Omit<LibraryItem, "id" | "kind">) {
    updateLibrary(library.map((i) => (i.id === itemId ? { ...i, ...item } : i)));
    logActivity(`${item.name || item.title || "Item"} saved.`);
  }

  function deleteItem(itemId: string) {
    const target = library.find((i) => i.id === itemId);
    updateLibrary(library.filter((i) => i.id !== itemId));
    if (target) logActivity(`${target.name || target.title || "Item"} deleted.`);
  }

  function togglePublished(itemId: string) {
    updateLibrary(library.map((i) => (i.id === itemId ? { ...i, published: !i.published } : i)));
  }

  function toggleReview(itemId: string) {
    updateLibrary(
      library.map((i) =>
        i.id === itemId
          ? { ...i, clinicalReview: i.clinicalReview === "approved" ? "pending" : "approved" }
          : i,
      ),
    );
  }

  /* ---------------------------- programs ----------------------------- */
  function createProgram(input: { title: string; summary: string }) {
    const program: AdminProgram = {
      id: id("prog"),
      slug: input.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
      title: input.title,
      summary: input.summary,
      level: "Custom",
      published: false,
      clinicalReview: "pending",
      days: [],
    };
    updatePrograms([program, ...programs]);
    logActivity(`Program ${program.title} created as a draft.`);
    return program;
  }

  function saveProgram(programId: string, patch: Partial<AdminProgram>) {
    updatePrograms(programs.map((p) => (p.id === programId ? { ...p, ...patch } : p)));
    logActivity("Program saved.");
  }

  function deleteProgram(programId: string) {
    const target = programs.find((p) => p.id === programId);
    updatePrograms(programs.filter((p) => p.id !== programId));
    if (target) logActivity(`Program ${target.title} deleted.`);
  }

  function addDay(programId: string) {
    updatePrograms(
      programs.map((p) => {
        if (p.id !== programId) return p;
        const number = p.days.length + 1;
        return {
          ...p,
          days: [
            ...p.days,
            {
              id: id("day"),
              dayNumber: number,
              title: `Day ${number}`,
              introduction: "",
              article: "",
              activityTitle: "",
              activityBody: "",
              weekNumber: Math.ceil(number / 7),
              weekTitle: null,
              published: false,
              tasks: "",
            },
          ],
        };
      }),
    );
  }

  function saveDay(programId: string, dayId: string, patch: Partial<AdminDay>) {
    updatePrograms(
      programs.map((p) =>
        p.id === programId
          ? { ...p, days: p.days.map((d) => (d.id === dayId ? { ...d, ...patch } : d)) }
          : p,
      ),
    );
  }

  function deleteDay(programId: string, dayId: string) {
    updatePrograms(
      programs.map((p) =>
        p.id === programId ? { ...p, days: p.days.filter((d) => d.id !== dayId) } : p,
      ),
    );
  }

  /* ----------------------------- notices ----------------------------- */
  function publishNotice(input: { title: string; body: string }) {
    const notice: Notice = { id: id("n"), ...input, isSample: false, createdAt: now() };
    updateNotices([notice, ...notices]);
    logActivity(`Notice published: ${notice.title}.`);
    return notice;
  }

  return {
    ready,
    people,
    invites,
    library,
    programs,
    notices,
    outbox,
    settings,
    activity,
    counts,
    toggleStatus,
    toggleAccess,
    createInvite,
    revokeInvite,
    saveSettings,
    removeSampleData,
    createItem,
    saveItem,
    deleteItem,
    togglePublished,
    toggleReview,
    createProgram,
    saveProgram,
    deleteProgram,
    addDay,
    saveDay,
    deleteDay,
    publishNotice,
  };
}

export type AdminStore = ReturnType<typeof useAdmin>;

/* ------------------------------------------------------------------ */
/* Link helper for the simulated one-time invitation URL               */
/* ------------------------------------------------------------------ */
export function inviteUrl(token: string) {
  if (typeof window === "undefined") return `/invite/${token}`;
  return `${window.location.origin}/invite/${token}`;
}
