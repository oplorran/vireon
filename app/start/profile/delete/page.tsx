import { DeleteClient as Delete } from "@/components/DeleteClient";

export const metadata = { title: "Delete my account", robots: { index: false } };

export default function DeletePage() {
  return <Delete />;
}
