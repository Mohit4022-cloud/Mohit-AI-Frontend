import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Calls - Mohit AI",
  description: "Manage AI-powered sales calls with real-time insights",
};

export default function AICallsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      {children}
    </div>
  );
}