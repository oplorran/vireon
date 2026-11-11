"use client";

import { Brand, DoctorBadge, Stars } from "@/components/Identidade";

import { ROUTES } from "@/lib/config";
import { LinkComUtms } from "@/components/LinkComUtms";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-[440px] flex-col items-center justify-center px-6 py-8">
        <div
          className="mb-5 inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.05em]"
          style={{ backgroundColor: "#e8f5ee", borderColor: "#2a9d6f", color: "#1f7a56" }}
        >
          <span>For men who don&apos;t respond like they used to</span>
        </div>

        <DoctorBadge />

        <h1
          className="mt-6 text-center text-[24px] font-extrabold leading-tight text-[#1a1a1a]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Find out in 60 seconds why your erections aren&apos;t hard anymore… and how to get them back in 7 days
        </h1>

        <p className="mt-3 text-center text-[15px] leading-relaxed text-[#555]">
          No Viagra, no expensive pills, just <strong className="text-[#1a1a1a]">3 ingredients</strong> you already
          have in your kitchen.
        </p>

        <p className="mt-4 text-center text-[14px] leading-relaxed text-[#666]">
          Answer 8 questions and Dr Michael Thompson will calibrate your exact dose based on{" "}
          <strong className="text-[#1a1a1a]">your age</strong>, <strong className="text-[#1a1a1a]">your weight</strong>{" "}
          and <strong className="text-[#1a1a1a]">your level of vascular blockage</strong>.
        </p>

        <div className="mt-5 flex flex-col items-center">
          <Stars />
          <p className="mt-1 text-center text-[12px] font-semibold text-[#2a9d6f]">
            More than 12,847 men have already regained their firmness
          </p>
        </div>

        <LinkComUtms
          href={ROUTES.quiz}
          className="mt-6 w-full max-w-[400px] rounded-xl py-4 text-center text-[16px] font-bold uppercase text-white transition-colors duration-200"
          style={{ backgroundColor: "#2a9d6f", letterSpacing: "0.5px" }}
        >
          I want my firmness back →
        </LinkComUtms>

        <div className="mt-3 flex items-center justify-center gap-3 text-[12px] text-[#888]">
          <span>⏱ 1 minute</span>
          <span className="opacity-50">·</span>
          <span>🔒 100% private</span>
          <span className="opacity-50">·</span>
          <span>✓ No card required</span>
        </div>
      </div>
    </main>
  );
}
