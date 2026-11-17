"use client";

import { useEffect, useRef } from "react";
import { VSL } from "@/lib/config";

/** The player is a custom element; React typings for it live in types/vturb.d.ts. */
type Props = {
  variant: keyof typeof VSL;
  /** Called once when the player reports the video finished. */
  onEnded?: () => void;
};

/**
 * VTurb (ConverteAI) player, same embed contract and placeholder
 * aspect-ratio as the original funnel.
 *
 * The smartplayer dispatches `video:ended` on this very element when the
 * media reaches the end, so the funnel can reveal on the real event
 * instead of guessing with a timer.
 */
export function Vsl({ variant, onEnded }: Props) {
  const { account, idVideo, aspect } = VSL[variant];
  const loaded = useRef<string | null>(null);
  const endedRef = useRef(onEnded);

  /* Keep the latest callback without re-binding the listener. */
  endedRef.current = onEnded;

  useEffect(() => {
    if (loaded.current === idVideo) return;
    loaded.current = idVideo;

    const player = document.createElement("script");
    player.src = `https://scripts.converteai.net/${account}/players/${idVideo}/v4/player.js`;
    player.async = true;
    document.head.appendChild(player);
  }, [account, idVideo]);

  useEffect(() => {
    const element = document.getElementById(`vid-${idVideo}`);
    if (!element) return undefined;

    let firing = false;

    /* `video:ended` is the player's own event; firing once keeps a replay
       or a seek back to the end from re-running the reveal scroll. */
    const onVideoEnded = () => {
      if (firing) return;
      firing = true;
      endedRef.current?.();
    };

    element.addEventListener("video:ended", onVideoEnded);
    return () => element.removeEventListener("video:ended", onVideoEnded);
  }, [idVideo]);

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
