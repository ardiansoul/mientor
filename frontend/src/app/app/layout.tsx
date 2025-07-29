"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
