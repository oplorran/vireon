import { UpsellShell } from "@/components/UpsellShell";
import { CHECKOUT, PRICES, ROUTES } from "@/lib/config";

export const metadata = {
  title: "Manual del Actor — Hazla Gritar Toda la Noche",
  robots: { index: false, follow: false },
};

export default function Up2Page() {
  return (
    <UpsellShell
      step={2}
      notice="⭐ EXCLUSIVE ACCESS · Offer reserved for new members"
      noticeTone="blue"
      module="Mastery Module"
      status="Status: Manual Ready for Download"
      title="WHAT IF YOU COULD MAKE HER SCREAM FOR 2 HOURS NON-STOP?"
      intro="Having a hard erection is only 50% of the job. The Actor's Manual gives you the exact angles that activate the female nervous system, causing cascading orgasms she'll never forget."
      preview={{
        label: "Manual Preview",
        items: ["📐|45° Angle", "🥁|Variable Rhythm", "⏳|3-3 Control"],
      }}
      pillar={[
        { icon: "🎭", title: "Porn Angles" },
        { icon: "💥", title: "3x Orgasms" },
        { icon: "⏳", title: "Duration +45m" },
      ]}
      selection={{ title: "🔥|Yes, Add the Actor's Manual", detail: "Elite techniques · Instant Access" }}
      price={PRICES.up2.charged}
      buyHref={CHECKOUT.up2}
      buyText="🔥 YES! MAKE HER EXPLODE TONIGHT →"
      guarantee="⏳ This offer does not appear on any other page"
      declineTo={ROUTES.up3}
      declineText="No thanks, I'd rather she gets bored in bed"
    />
  );
}
