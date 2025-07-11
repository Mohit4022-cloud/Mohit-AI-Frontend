"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Sidebar } from "@/components/layouts/Sidebar";
import { Header } from "@/components/layouts/Header";
import { ThemeProvider } from "@/hooks/useTheme";
import "@/styles/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="quantum-dashboard-layout">
        <Sidebar />
        <div className="dashboard-main-content">
          <Header />
          <main className="dashboard-page-content animate-fadeIn">{children}</main>
        </div>
      
      <style jsx>{`
        .quantum-dashboard-layout {
          display: flex;
          height: 100vh;
          background: var(--dashboard-bg);
          overflow: hidden;
        }
        
        .dashboard-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 280px;
          transition: margin-left 0.3s ease;
        }
        
        /* When sidebar is collapsed */
        :global(.quantum-sidebar[style*="width: 80px"]) + .dashboard-main-content {
          margin-left: 80px;
        }
        
        .dashboard-page-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          background: var(--dashboard-bg);
        }
      `}</style>
      </div>
    </ThemeProvider>
  );
}