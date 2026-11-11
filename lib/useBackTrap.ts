"use client";

import { useEffect } from "react";

const CHAVE = "vireon_backredirect";

/**
 * Reproduces `/esquizz/back-trap.js`: once the final offer step is on screen,
 * the browser back button goes to `/backredirect` (the $11.90 rescue offer)
 * instead of leaving the funnel. Earlier steps stay untouched.
 */
export function useBackTrap(ativo: boolean) {
  useEffect(() => {
    if (!ativo) return undefined;

    let armado = false;

    const voltar = () => {
      if (!armado) return;
      armado = false;
      try {
        sessionStorage.setItem(CHAVE, "1");
      } catch {
        /* private mode */
      }
      window.location.href = `/backredirect${window.location.search}${window.location.hash}`;
    };

    const sincronizar = () => {
      try {
        sessionStorage.removeItem(CHAVE);
      } catch {
        /* private mode */
      }
      if (armado) return;
      armado = true;
      try {
        history.pushState({ vireonBack: 1 }, "", window.location.href);
      } catch {
        /* ignore */
      }
    };

    window.addEventListener("popstate", voltar);
    sincronizar();
    const a = window.setTimeout(sincronizar, 400);
    const b = window.setTimeout(sincronizar, 1200);

    return () => {
      window.removeEventListener("popstate", voltar);
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [ativo]);
}
