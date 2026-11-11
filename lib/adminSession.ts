"use client";

export const ADMIN_SESSION_KEY = "vireon_admin";

export function adminSignOut() {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    /* private mode */
  }
}

export function adminIsSignedIn() {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}
