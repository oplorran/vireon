import { redirect } from "next/navigation";

/** Keeps the `/app` shortcut from the reference in sync with `/start`. */
export default function AppIndex() {
  redirect("/start");
}
