"use client";

import { useState } from "react";
import Navbar from "../../components/navbar";
import BorrowPanel from "./_components/BorrowPanel";
import AnalyticsPanel from "./_components/AnalyticsPanel";

export default function BorrowingPage() {
  const [activeTab, setActiveTab] = useState<"borrow" | "analytics">("borrow");

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen text-white relative"
        style={{
          backgroundImage: "url('/assets/backgrounds/gradient-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,144,226,0.1),transparent_50%)]" />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen">
          <div className="container mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-[#4A90E2] bg-clip-text text-transparent">
                Borrow srUSD
              </h1>
              <p className="text-sm text-gray-300 max-w-3xl mx-auto">
                Use your crypto assets as collateral to borrow srUSD, our multi-collateral stablecoin. 
                Enjoy competitive rates and automated risk management.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-1 inline-flex">
                <button
                  onClick={() => setActiveTab("borrow")}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "borrow"
                      ? "bg-[#4A90E2] text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Borrow
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "analytics"
                      ? "bg-[#4A90E2] text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Analytics
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto">
              {activeTab === "borrow" && <BorrowPanel />}
              {activeTab === "analytics" && <AnalyticsPanel />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}