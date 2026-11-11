"use client";

import Link from "next/link";
import { useUtms } from "@/lib/useUtms";

type Props = {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/** Internal link that keeps the UTMs captured in the funnel. */
export function LinkComUtms({ href, className, style, children }: Props) {
  const { interno } = useUtms();

  return (
    <Link href={interno(href)} className={className} style={style}>
      {children}
    </Link>
  );
}
