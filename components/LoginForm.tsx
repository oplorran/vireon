"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import { MEMBER_KEY } from "@/lib/useMember";

export function LoginForm() {
  const router = useRouter();
  const { t, lang } = useI18n();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const copy = {
    en: { label: "Email", invalid: "Enter a valid email.", cta: "Sign in", admin: "Administrator access" },
    pt: { label: "E-mail", invalid: "Informe um e-mail válido.", cta: "Entrar", admin: "Acesso de administrador" },
    es: { label: "Correo", invalid: "Escribe un correo válido.", cta: "Entrar", admin: "Acceso de administrador" },
  }[lang];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(copy.invalid);
      return;
    }
    window.localStorage.setItem(MEMBER_KEY, value);
    router.push(`/start?email=${encodeURIComponent(value)}`);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm text-mist">{copy.label}</span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required
          autoComplete="username"
          placeholder="you@email.com"
          className="app-input"
        />
      </label>

      {error && <p className="text-sm text-warn">{error}</p>}

      <button type="submit" className="app-btn">
        {copy.cta}
      </button>

      <p className="text-sm text-mist">
        <Link href={ROUTES.admin} className="text-cyan">
          {copy.admin}
        </Link>
      </p>
      <span className="hidden">{t("nav.home")}</span>
    </form>
  );
}
