import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardStats from "@/components/DashboardStats";

export default async function Home() {
  // 1. Core Auth Redirect Guard
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  const username = session.user.name;

  return (
    <div className="space-y-10 p-8 min-h-screen">
      <header className="border-b border-white/5 pb-6">
        <h1 className="text-7xl uppercase font-black text-slate-500 tracking-wider">DevNotes</h1>
      </header>
      
      {/* 🚀 Render our isolated Server Component! */}
      <DashboardStats username={username} />
    </div>
  );
}
