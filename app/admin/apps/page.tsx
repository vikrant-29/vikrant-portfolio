import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllApps } from "@/lib/queries";
import AppsTable from "./AppsTable";

export const metadata = { title: "Apps | Admin" };

export default async function AdminAppsPage() {
  const apps = await getAllApps();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Bebas Neue',cursive",
              fontSize: 40,
              letterSpacing: "0.04em",
              color: "#fff",
              marginBottom: 4,
            }}
          >
            APPS
          </h1>
          <p style={{ color: "#A1A1AA", fontSize: 13 }}>
            {apps.length} app{apps.length !== 1 ? "s" : ""} in your portfolio
          </p>
        </div>
        <Link href="/admin/apps/new" className="btn-primary" style={{ fontSize: 13 }}>
          <Plus size={14} /> New App
        </Link>
      </div>

      <AppsTable initialApps={apps} />
    </div>
  );
}
