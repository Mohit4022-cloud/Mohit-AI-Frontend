"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // DEMO BYPASS: Auto-redirect to dashboard
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return null; // No UI needed since we redirect immediately
}