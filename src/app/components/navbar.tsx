"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { SeraphimLogo } from "../../../public/assets/logos";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Earn", href: "/lending" },
    { name: "Borrow", href: "/borrowing" },
    { name: "Explore", href: "/explore" },
    { name: "Swap", href: "/swap" },
    { name: "Faucets", href: "/faucets" },
  ];

  return (
    <nav className="bg-gradient-to-r from-teal-700 via-teal-800 to-blue-900 sticky top-0 z-50">
      <div className="container mx-auto px-5 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={SeraphimLogo}
              alt="Seraphim"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="text-lg font-semibold text-white">Seraphim</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Connect */}
          <div className="hidden md:block">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1.5 rounded-md text-sm font-medium transition-colors">
              Connect Wallet
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 py-3">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-1.5 rounded-md font-medium transition-colors mt-2">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
