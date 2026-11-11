"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AppBrand } from "@/components/AppBrand";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useI18n } from "@/lib/i18n";
import { MEMBER_KEY } from "@/lib/useMember";

const COPY = {
  en: {
    tag: "Single-use invitation",
    title: "Create your access",
    sub: "This link is valid for one activation. Enter the email the invitation was sent to.",
    label: "Email",
    cta: "Activate access",
    code: "Invite code",
    have: "Already have access?",
    signIn: "Sign in",
  },
  pt: {
    tag: "Convite de uso único",
    title: "Crie seu acesso",
    sub: "Este link vale por uma ativação. Informe o e-mail para o qual o convite foi enviado.",
    label: "E-mail",
    cta: "Ativar acesso",
    code: "Código do convite",
    have: "Já tem acesso?",
    signIn: "Entrar",
  },
  es: {
    tag: "Invitación de uso único",
    title: "Crea tu acceso",
    sub: "Este enlace vale por una activación. Escribe el correo al que se envió la invitación.",
    label: "Correo",
    cta: "Activar acceso",
    code: "Código de invitación",
    have: "¿Ya tienes acceso?",
    signIn: "Entrar",
  },
};

export function InviteClient() {
  const params = useParams<{ token: string }>();
  const { lang } = useI18n();
  const [email, setEmail] = useState("");
  const c = COPY[lang];

  return (
    <div className="app-shell">
      <div className="app-glow" />

      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10">
        <div className="flex items-center justify-between gap-3">
          <AppBrand />
          <LanguageSwitch />
        </div>

        <section className="app-card mt-6 p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">{c.tag}</p>
          <h1 className="mt-2 font-display text-3xl">{c.title}</h1>
          <p className="mt-2 text-sm leading-6 text-mist">{c.sub}</p>

          <form
            action="/start"
            onSubmit={() => window.localStorage.setItem(MEMBER_KEY, email.trim().toLowerCase())}
            className="mt-6 space-y-4"
          >
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">{c.label}</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@email.com"
                className="app-input"
              />
            </label>
            <button type="submit" className="app-btn">
              {c.cta}
            </button>
          </form>

          <p className="mt-4 break-all text-xs text-faint">
            {c.code}: {params.token}
          </p>
          <p className="mt-2 text-sm text-mist">
            {c.have}{" "}
            <Link href="/login" className="text-cyan">
              {c.signIn}
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
