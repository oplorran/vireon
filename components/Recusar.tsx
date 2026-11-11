"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUtms } from "@/lib/useUtms";

type Props = {
  /** Where to go on decline. */
  destino: string;
  text?: string;
  /** If true, records the decline before moving on. */
  registrar?: () => void;
};

/**
 * Upsell decline button.
 * Always moves to a route different from the buy button.
 */
export function Recusar({ destino, text = "No thanks", registrar }: Props) {
  const router = useRouter();
  const { interno } = useUtms();
  const [going, setGoing] = useState(false);

  function seguir() {
    setGoing(true);
    registrar?.();
    router.push(interno(destino));
  }

  return (
    <button
      type="button"
      onClick={seguir}
      disabled={going}
      className="mt-1 block w-full text-center text-[13px] font-semibold text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-700 disabled:opacity-60"
    >
      {going ? "Opening…" : text}
    </button>
  );
}
