"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function DevLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Set development auth state
    useAuthStore.setState({
      user: {
        id: "dev-user-001",
        email: "dev@mohit-ai.com",
        name: "Development User",
        role: "admin",
        organizationId: "dev-org-001",
      },
      token: "dev-token-" + Math.random().toString(36).substring(2),
      isAuthenticated: true,
    });

    // Redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 100);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Development Mode</h1>
        <p className="text-gray-600">Bypassing authentication...</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}