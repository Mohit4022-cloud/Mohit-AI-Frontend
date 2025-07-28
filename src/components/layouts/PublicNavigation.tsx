"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import MohitAILogo from "@/components/MohitAILogo";

export function PublicNavigation() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="ultra-nav">
      <div className="ultra-container">
        <div className="flex justify-between items-center h-full"> {/* Added h-full to align items vertically */}
          <div className="flex items-center">
            <Link
              href="/"
              className="ultra-heading-3 flex items-center gap-3"
            >
              <MohitAILogo size="small" />
              <span>Mohit AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8"> {/* Changed md:flex to lg:flex */}
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

            {/* Aligned CTA buttons */}
            <div className="flex items-center gap-4 ml-8">
              <Link href="/dashboard">
                <button className="ultra-button ultra-button-primary">
                  Check out the platform
                </button>
              </Link>

              <Link href="https://platform.mohit-ai.com">
                <button className="ultra-button ultra-button-accent">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center"> {/* Changed md:hidden to lg:hidden */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[100px] left-0 w-full bg-white shadow-lg py-4 animate-slide-in"> {/* Changed md:hidden to lg:hidden */}
            <div className="flex flex-col items-center space-y-4">
              <Link
                href="/product"
                className="text-lg font-medium hover:text-accent-pink transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/pricing"
                className="text-lg font-medium hover:text-accent-pink transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="relative w-full text-center">
                <button
                  className="text-lg font-medium hover:text-accent-pink transition-colors flex items-center justify-center w-full"
                  onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                >
                  Solutions
                  <ChevronDown
                    className={`ml-2 h-5 w-5 transition-transform duration-200 ${isSolutionsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isSolutionsOpen && (
                  <div className="mt-2 w-full glass-card !relative !top-auto !left-auto !mt-0 !shadow-none !border-none !rounded-none"> {/* Adjusted classes for mobile dropdown */}
                    <div className="p-4 space-y-2">
                      <Link
                        href="/solutions"
                        className="block px-4 py-3 text-base font-medium rounded-16 hover:bg-gray-100 hover:text-accent-pink transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        By Industry
                      </Link>
                      <Link
                        href="/solutions/for-sdrs"
                        className="block px-4 py-3 text-base font-medium rounded-16 hover:bg-gray-100 hover:text-accent-pink transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        For SDRs
                      </Link>
                      <Link
                        href="/solutions/for-managers"
                        className="block px-4 py-3 text-base font-medium rounded-16 hover:bg-gray-100 hover:text-accent-pink transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        For Managers
                      </Link>
                      <Link
                        href="/solutions/enterprise"
                        className="block px-4 py-3 text-base font-medium rounded-16 hover:bg-gray-100 hover:text-accent-pink transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Enterprise
                      </Link>
                      <Link
                        href="/solutions/small-business"
                        className="block px-4 py-3 text-base font-medium rounded-16 hover:bg-gray-100 hover:text-accent-pink transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Small Business
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/resources"
                className="text-lg font-medium hover:text-accent-pink transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/security"
                className="text-lg font-medium hover:text-accent-pink transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Security
              </Link>

              <div className="flex flex-col items-center gap-4 w-full px-4 mt-4">
                <Link href="/dashboard" className="w-full">
                  <button className="ultra-button ultra-button-primary w-full">
                    Check out the platform
                  </button>
                </Link>

                <Link href="https://platform.mohit-ai.com" className="w-full">
                  <button className="ultra-button ultra-button-accent w-full">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}