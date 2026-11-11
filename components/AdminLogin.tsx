"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_DEMO, ROUTES } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import { ADMIN_SESSION_KEY } from "@/lib/adminSession";

export function AdminLogin() {
  const router = useRouter();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [going, setGoing] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (email.trim() === ADMIN_DEMO.email && password === ADMIN_DEMO.password) {
      setGoing(true);
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      } catch {
        /* private mode */
      }
      router.push("/admin");
      return;
    }

    setError("Wrong email or password.");
  }

  return (
    <>
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm text-mist">Email</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="app-input"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm text-mist">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="app-input"
          />
        </label>

        {error && (
          <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <button type="submit" disabled={going} className="app-btn">
          {going ? t("admin.signingIn") : t("admin.signInAdmin")}
        </button>

        <p className="pt-1 text-center text-xs leading-relaxed text-faint">
          Demo: <code className="text-mist">{ADMIN_DEMO.email}</code> ·{" "}
          <code className="text-mist">{ADMIN_DEMO.password}</code>
        </p>
      </form>

      <p className="mt-4 text-sm text-mist">
        <Link href={ROUTES.login} className="text-cyan">
          {t("admin.student")}
        </Link>
      </p>
    </>
  );
}
