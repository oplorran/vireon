"use client";

import { useEffect, useRef } from "react";
import { VSL } from "@/lib/config";

type Props = {
  variant: keyof typeof VSL;
};

/**
 * VTurb (ConverteAI) player, same embed contract and placeholder
 * aspect-ratio as the original funnel.
 */
export function Vsl({ variant }: Props) {
  const { account, idVideo, aspect } = VSL[variant];
  const loaded = useRef<string | null>(null);

  useEffect(() => {
    if (loaded.current === idVideo) return;
    loaded.current = idVideo;

    const player = document.createElement("script");
    player.src = `https://scripts.converteai.net/${account}/players/${idVideo}/v4/player.js`;
    player.async = true;
    document.head.appendChild(player);
  }, [account, idVideo]);

  return (
    <div className="w-full">
      <vturb-smartplayer
        id={`vid-${idVideo}`}
        style={{
          display: "block",
          margin: "0 auto",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div
          className="vturb-player-placeholder"
          style={{ position: "relative", width: "100%", padding: `${aspect}% 0 0`, zIndex: 0, backgroundColor: "black" }}
        />
      </vturb-smartplayer>
    </div>
  );
}
