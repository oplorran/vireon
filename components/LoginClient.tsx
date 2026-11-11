"use client";

import { AppBrand } from "@/components/AppBrand";
import { LoginForm } from "@/components/LoginForm";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useI18n } from "@/lib/i18n";

const COPY = {
  en: { title: "Sign in", sub: "Enter any email to open the app. No password." },
  pt: { title: "Entrar", sub: "Informe qualquer e-mail para abrir o app. Sem senha." },
  es: { title: "Entrar", sub: "Escribe cualquier correo para abrir la app. Sin contraseña." },
};

export function LoginClient() {
  const { lang } = useI18n();
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
          <h1 className="font-display text-3xl">{c.title}</h1>
          <p className="mt-2 text-sm leading-6 text-mist">{c.sub}</p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </section>
      </main>
    </div>
  );
}
