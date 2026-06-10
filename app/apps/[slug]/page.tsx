import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitBranch, Smartphone } from "lucide-react";
import { getAppBySlug, getAllApps } from "@/lib/queries";
import AppDetailClient from "./AppDetailClient";

export async function generateStaticParams() {
  const apps = await getAllApps();
  return apps.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) return { title: "App Not Found" };
  return {
    title: `${app.title} | Vikrant.exe`,
    description: app.short_description,
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) notFound();

  // Related apps: other featured apps excluding this one
  const allApps = await getAllApps();
  const related = allApps.filter((a) => a.id !== app.id).slice(0, 2);

  return <AppDetailClient app={app} related={related} />;
}
