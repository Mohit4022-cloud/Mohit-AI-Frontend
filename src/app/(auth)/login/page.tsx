"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  // DEMO BYPASS: Set demo user and auto-redirect to dashboard
  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      router.replace("/dashboard");
      return;
    }

    // Set demo user to bypass authentication
    useAuthStore.setState({
      user: {
        id: "demo-user",
        email: "demo@mohit-ai.com",
        name: "Demo User",
        role: "user",
        organizationId: "demo-org",
      },
      token: "demo-token",
      isAuthenticated: true,
    });

    // Redirect to dashboard after setting auth
    router.replace("/dashboard");
  }, [router, isAuthenticated]);

  return null; // No UI needed since we redirect immediately
}
