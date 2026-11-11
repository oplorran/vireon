import { SettingsClient } from "@/components/SettingsClient";

export const metadata = { title: "Account settings", robots: { index: false } };

export default function ProfileSettingsPage() {
  return <SettingsClient />;
}
