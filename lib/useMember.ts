"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "vireon.member.email";
const NAME_KEY = "vireon.member.name";

export const MEMBER_KEY = KEY;
export const MEMBER_NAME_KEY = NAME_KEY;

export type Member = { email: string | null; name: string; ready: boolean };

/** Pretty display name from an email local part. */
export function displayName(email: string | null) {
  if (!email) return "Member";
  return email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Demo session: the email travels in `?email=` once, then lives in localStorage
 * so navigation inside the member area keeps the same profile.
 * The display name can be edited in Account settings and is kept locally.
 */
export function useMember(): Member {
  const [email, setEmail] = useState<string | null>(null);
  const [stored, setStored] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("email");
    if (fromUrl) {
      window.localStorage.setItem(KEY, fromUrl);
      setEmail(fromUrl);
    } else {
      setEmail(window.localStorage.getItem(KEY));
    }
    setStored(window.localStorage.getItem(NAME_KEY));
    setReady(true);
  }, []);

  return { email, name: stored?.trim() || displayName(email), ready };
}

/** Appends the member email to an internal member-area link. */
export function memberHref(href: string, email: string | null) {
  if (!email) return href;
  return `${href}?email=${encodeURIComponent(email)}`;
}

/** Stores the edited display name used by the sidebar, profile and settings. */
export function saveMemberName(name: string) {
  try {
    window.localStorage.setItem(NAME_KEY, name.trim());
  } catch {
    /* private mode */
  }
}

export function signOut() {
  window.localStorage.removeItem(KEY);
  window.localStorage.removeItem(NAME_KEY);
}

/** Re-reads the stored name so screens mounted after a save see the new value. */
export function useMemberName() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setName(window.localStorage.getItem(NAME_KEY));
  }, []);

  const save = useCallback((next: string) => {
    saveMemberName(next);
    setName(next.trim());
  }, []);

  return { name, save };
}
