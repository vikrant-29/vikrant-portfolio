import { requireAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin | Vikrant.exe",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side guard — redirects if not admin
  await requireAdmin();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#050505",
      }}
    >
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          padding: "32px 40px",
          overflowY: "auto",
          minWidth: 0,
        }}
      >
        {children}
      </main>
    </div>
  );
}
