import { DOCTOR } from "@/lib/config";

/** Doctor avatar + "Certified protocol" caption, as on the original funnel. */
export function DoctorBadge({ size = 64 }: { size?: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/esquizz/dr/dr-thompson.png"
        alt={DOCTOR}
        width={size}
        height={size}
        className="rounded-full border-2 border-emerald-500 object-cover"
        style={{ width: size, height: size }}
      />
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-800">{DOCTOR}</p>
        <p className="text-xs text-emerald-600">Certified protocol</p>
      </div>
    </div>
  );
}

/** Compact inline header (avatar + name), used by the quiz steps. */
export function DoctorHeader({ right }: { right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/esquizz/dr/dr-thompson.png"
          alt={DOCTOR}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border-2 border-emerald-500 object-cover"
        />
        <div>
          <div className="flex items-center gap-1">
            <span className="text-[14px] font-semibold tracking-[-0.02em] text-[#1a1a1a]">{DOCTOR}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#2a9d6f" aria-hidden="true">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-[12px] text-[#888]">Profile assessment</span>
        </div>
      </div>
      {right}
    </div>
  );
}

export function Stars({ className = "text-sm" }: { className?: string }) {
  return <div className={`text-yellow-400 ${className}`}>⭐⭐⭐⭐⭐</div>;
}

export function Brand() {
  return <span className="text-sm font-black uppercase tracking-[0.18em] text-moss-800">Vireon</span>;
}

export function SocialProof({ text }: { text: string }) {
  return <p className="text-xs font-semibold text-moss-800">{text}</p>;
}
