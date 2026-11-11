import Image from "next/image";
import Link from "next/link";

/** Brand block used by the dark app screens (member area + admin). */
export function AppBrand({ href = "/", markOnly = false }: { href?: string; markOnly?: boolean }) {
  if (markOnly) {
    return (
      <span className="inline-flex items-center gap-2.5">
        <Image src="/media/mark.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded-2xl object-cover" priority />
      </span>
    );
  }

  return (
    <Link href={href} className="inline-flex items-center gap-2.5">
      <Image
        src="/media/mark.jpg"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 rounded-2xl object-cover"
        priority
      />
      <span className="font-display text-[15px] font-semibold tracking-[0.16em] text-white">
        VIREON <span className="text-cyan">MAX</span>
      </span>
    </Link>
  );
}
