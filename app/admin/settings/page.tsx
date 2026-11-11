import { AdminSettingsClient } from "@/components/AdminSettingsClient";

export const metadata = { title: "Settings · Admin", robots: { index: false } };

export default function SettingsPage() {
  return <AdminSettingsClient />;
}
