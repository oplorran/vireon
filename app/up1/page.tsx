import { UpsellShell } from "@/components/UpsellShell";
import { CHECKOUT, PRICES, ROUTES } from "@/lib/config";

export const metadata = {
  title: "Acelerador Clínico — Erecciones de Acero en 7 Días",
  robots: { index: false, follow: false },
};

export default function Up1Page() {
  return (
    <UpsellShell
      step={1}
      notice="⚠️ URGENT · Your configuration expires in 4 minutes"
      noticeTone="red"
      module="Configuration Module"
      status="Status: Pending Activation"
      title="Do You Want to Wait 30 Days or Be READY TONIGHT?"
      intro="You've made the right decision. But there's a secret: the base protocol takes 4 weeks to clean your arteries. With the 7-Day Accelerator, we force arterial decalcification from day one."
      verification={{
        title: "Clinical Verification Required",
        text: "Press to verify your circulatory system compatibility with the accelerator:",
        button: "🔍 Start Verification",
        verifying: "Verifying...",
        compatible: "System Compatible",
        attention: "ATTENTION:",
        detection:
          "A critical accumulation of arterial plaque has been detected. Dr. Jaramillo's Accelerator is ready to be digitally injected into your protocol.",
        hardness: "✓ Hardness Potential:",
        max: "Maximum Level",
        response: "✓ Response Time:",
        under72: "Under 72 hours",
      }}
      pillar={[
        { icon: "🛡️", title: "Clean Walls" },
        { icon: "🚀", title: "Immediate Flow" },
        { icon: "💎", title: "Hardness 10/10" },
      ]}
      selection={{ title: "🩺|Yes, Activate 7-Day Accelerator", detail: "Verified Results · Doubled Power" }}
      price={PRICES.up1.charged}
      buyHref={CHECKOUT.up1}
      buyText="🔥 YES! ACTIVATE MY ACCELERATOR →"
      guarantee="✅ Dr. Jaramillo's Results Guarantee"
      declineTo={ROUTES.up2}
      declineText="No thanks, I'd rather wait months to see any change"
    />
  );
}
