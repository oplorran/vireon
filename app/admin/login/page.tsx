"use client";

import { AppBrand } from "@/components/AppBrand";
import { AdminLogin } from "@/components/AdminLogin";
import { useI18n } from "@/lib/i18n";

export default function AdminLoginPage() {
  const { t } = useI18n();

  return (
    <div className="app-shell">
      <div className="app-glow" />

      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10">
        <AppBrand />

        <section className="app-card mt-6 p-6">
          <h1 className="font-display text-3xl">{t("admin.panel")}</h1>
          <p className="mt-2 text-sm leading-6 text-mist">{t("admin.loginSub")}</p>

          <div className="mt-6">
            <AdminLogin />
          </div>
        </section>
      </main>
    </div>
  );
}
