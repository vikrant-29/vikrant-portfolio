import { getAllApps } from "@/lib/queries";
import AppsClient from "./AppsClient";

export const metadata = {
  title: "Apps | Vikrant.exe",
  description: "Explore all Android and Flutter apps built by Vikrant Vijay Patil.",
};

export default async function AppsPage() {
  const apps = await getAllApps();
  return <AppsClient initialApps={apps} />;
}
