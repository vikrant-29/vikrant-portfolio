import { notFound } from "next/navigation";
import { getAppById } from "@/lib/queries";
import AppForm from "../../AppForm";
import ScreenshotManager from "./ScreenshotManager";

export const metadata = { title: "Edit App | Admin" };

export default async function EditAppPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await getAppById(id);
  if (!app) notFound();

  return (
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
        EDIT APP
      </h1>
      <p style={{ color: "#A1A1AA", fontSize: 13, marginBottom: 32 }}>
        Editing: <span style={{ color: "#FF7A00" }}>{app.title}</span>
      </p>

      <AppForm app={app} />

      <div style={{ marginTop: 48 }}>
        <ScreenshotManager app={app} />
      </div>
    </div>
  );
}
