"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function PublicNavigation() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md border-b border-neutral-100 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-black tracking-tight"
            >
              Mohit AI
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/product"
              className="text-neutral-600 hover:text-black transition-colors duration-200"
            >
              Product
            </Link>
            <Link
              href="/pricing"
              className="text-neutral-600 hover:text-black transition-colors duration-200"
            >
              Pricing
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="text-neutral-600 hover:text-black transition-colors duration-200 flex items-center">
                Solutions
                <ChevronDown
                  className={`ml-2 h-5 w-5 transition-transform duration-200 ${isSolutionsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 transform origin-top ${isSolutionsOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"}`}
              >
                <div className="py-1">
                  <Link
                    href="/solutions"
                    className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                  >
                    By Industry
                  </Link>
                  <Link
                    href="/solutions/for-sdrs"
                    className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                  >
                    For SDRs
                  </Link>
                  <Link
                    href="/solutions/for-managers"
                    className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                  >
                    For Managers
                  </Link>
                  <Link
                    href="/solutions/enterprise"
                    className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                  >
                    Enterprise
                  </Link>
                  <Link
                    href="/solutions/small-business"
                    className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                  >
                    Small Business
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/resources"
              className="text-neutral-600 hover:text-black transition-colors duration-200"
            >
              Resources
            </Link>
            <Link
              href="/security"
              className="text-neutral-600 hover:text-black transition-colors duration-200"
            >
              Security
            </Link>

            {/* Login button - preserve functionality from Mohit-AI-Frontend */}
            <Link href="/login">
              <Button
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200"
              >
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button className="bg-black text-white hover:bg-neutral-900 transition-all duration-200">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
