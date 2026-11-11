"use client";

import { useCallback, useEffect, useState } from "react";

const CHAVE = "app_utms";

type Utms = Record<string, string>;

/** Exact list the original keeps alive across the funnel. */
const RASTREIO = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "fbclid",
  "gclid",
  "ttclid",
  "ic",
  "ref",
  "src",
  "cid",
] as const;

/** `offerproductid` belongs to the checkout and must never be rewritten. */
export const CHAVE_PRODUTO = "offerproductid";

function ler(): Utms {
  try {
    const bruto = localStorage.getItem(CHAVE);
    const dados = bruto ? (JSON.parse(bruto) as Utms) : null;
    return dados && typeof dados === "object" ? dados : {};
  } catch {
    return {};
  }
}

function daUrl(): Utms {
  if (typeof window === "undefined") return {};
  const origem = new URLSearchParams(window.location.search);
  const guardado: Utms = {};
  for (const chave of RASTREIO) {
    const valor = origem.get(chave);
    if (valor) guardado[chave] = valor;
  }
  return guardado;
}

/** True only for `utm` / `utm_*`, as the original checks on the stored keys. */
export function ehUtm(chave: string): boolean {
  const nome = chave.toLowerCase();
  return nome === "utm" || nome.startsWith("utm_");
}

/**
 * Keeps the tracking parameters from the URL alive across the funnel and
 * returns helpers with them already applied.
 */
export function useUtms() {
  const [utms, setUtms] = useState<Utms>({});
  const [temUtm, setTemUtm] = useState(false);

  useEffect(() => {
    const atuais = daUrl();
    if (Object.keys(atuais).length) {
      try {
        localStorage.setItem(CHAVE, JSON.stringify(atuais));
      } catch {
        /* private mode */
      }
    }
    const guardado = Object.keys(atuais).length ? atuais : ler();
    setUtms(guardado);
    setTemUtm(Object.keys(guardado).some(ehUtm));
  }, []);

  /** Internal route keeping the whole query string. */
  const interno = useCallback((rota: string) => {
    if (typeof window === "undefined") return rota;
    return `${rota}${window.location.search}${window.location.hash}`;
  }, []);

  /** External link (checkout) with the tracking parameters appended. */
  const externo = useCallback((url: string) => {
    if (typeof window === "undefined") return url;
    let destino = url;
    if (destino.endsWith("/")) destino = destino.slice(0, -1);
    const todos = new URLSearchParams(window.location.search);
    const guardado: Utms = { ...ler() };
    todos.forEach((valor, chave) => {
      guardado[chave] = valor;
    });
    if (!Object.keys(guardado).length) return destino;
    try {
      const alvo = new URL(destino);
      for (const [chave, valor] of Object.entries(guardado)) {
        if (chave === CHAVE_PRODUTO) continue;
        if (!alvo.searchParams.has(chave)) alvo.searchParams.set(chave, valor);
      }
      return alvo.toString();
    } catch {
      return destino;
    }
  }, []);

  return { utms, temUtm, interno, externo };
}
