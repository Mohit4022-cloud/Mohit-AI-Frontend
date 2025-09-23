"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MohitAILogo from "@/components/MohitAILogo";

export function PublicNavigationFixed() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  return (
    <nav className="nav-fixed">
      <div className="layout-container">
        <div className="nav-container">
          {/* Brand */}
          <Link href="/" className="nav-brand">
            <MohitAILogo size="small" />
            <span>Mohit AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            <Link href="/product" className="nav-link">
              Product
            </Link>
            <Link href="/pricing" className="nav-link">
              Pricing
            </Link>

            {/* Solutions Dropdown */}
            <div
              className="nav-dropdown"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="nav-link flex items-center gap-2">
                Solutions
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isSolutionsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div className="nav-dropdown-menu">
                <Link
                  href="/solutions"
                  className="block px-4 py-2 nav-link hover:bg-gray-50 rounded-lg"
                >
                  By Industry
                </Link>
                <Link
                  href="/solutions/for-sdrs"
                  className="block px-4 py-2 nav-link hover:bg-gray-50 rounded-lg"
                >
                  For SDRs
                </Link>
                <Link
                  href="/solutions/for-managers"
                  className="block px-4 py-2 nav-link hover:bg-gray-50 rounded-lg"
                >
                  For Managers
                </Link>
                <Link
                  href="/solutions/enterprise"
                  className="block px-4 py-2 nav-link hover:bg-gray-50 rounded-lg"
                >
                  Enterprise
                </Link>
                <Link
                  href="/solutions/small-business"
                  className="block px-4 py-2 nav-link hover:bg-gray-50 rounded-lg"
                >
                  Small Business
                </Link>
              </div>
            </div>

            <Link href="/resources" className="nav-link">
              Resources
            </Link>
            <Link href="/security" className="nav-link">
              Security
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="nav-buttons">
            <Link href="https://platform.mohit-ai.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Check out the platform
            </Link>
            <Link href="https://platform.mohit-ai.com" target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}