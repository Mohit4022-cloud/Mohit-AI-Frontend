"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function PublicNavigation() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  return (
    <nav className="ultra-nav">
      <div className="ultra-container">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="ultra-heading-3"
            >
              Mohit AI
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/product"
              className="text-lg font-medium hover:text-accent-pink transition-colors"
            >
              Product
            </Link>
            <Link
              href="/pricing"
              className="text-lg font-medium hover:text-accent-pink transition-colors"
            >
              Pricing
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="text-lg font-medium hover:text-accent-pink transition-colors flex items-center">
                Solutions
                <ChevronDown
                  className={`ml-2 h-5 w-5 transition-transform duration-200 ${isSolutionsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`absolute left-0 top-full mt-2 w-64 glass-card transition-all duration-200 transform origin-top ${isSolutionsOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"}`}
              >
                <div className="p-4 space-y-2">
                  <Link
                    href="/solutions"
                    className="block px-4 py-3 text-base font-medium rounded-16 hover:bg-gray-100 hover:text-accent-pink transition-all"
                  >
                    By Industry
                  </Link>
                  <Link
                    href="/solutions/for-sdrs"
                    className="block px-4 py-3 text-base font-medium rounded-16 hover:bg-gray-100 hover:text-accent-pink transition-all"
                  >
                    For SDRs
                  </Link>
                  <Link
                    href="/solutions/for-managers"
                    className="block px-4 py-3 text-base font-medium rounded-16 hover:bg-gray-100 hover:text-accent-pink transition-all"
                  >
                    For Managers
                  </Link>
                  <Link
                    href="/solutions/enterprise"
                    className="block px-4 py-3 text-base font-medium rounded-16 hover:bg-gray-100 hover:text-accent-pink transition-all"
                  >
                    Enterprise
                  </Link>
                  <Link
                    href="/solutions/small-business"
                    className="block px-4 py-3 text-base font-medium rounded-16 hover:bg-gray-100 hover:text-accent-pink transition-all"
                  >
                    Small Business
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/resources"
              className="text-lg font-medium hover:text-accent-pink transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/security"
              className="text-lg font-medium hover:text-accent-pink transition-colors"
            >
              Security
            </Link>

            {/* Fix: Aligned CTA buttons */}
            <div className="flex items-center gap-4 ml-8">
              <Link href="/dashboard">
                <button className="ultra-button ultra-button-primary">
                  Check out the platform
                </button>
              </Link>

              <Link href="/register">
                <button className="ultra-button ultra-button-accent">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}