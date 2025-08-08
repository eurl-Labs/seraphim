"use client";

import Navbar from "../../components/navbar";
import SwapPanel from "./_components/SwapPanel";

export default function SwapPage() {
  return (
    <>
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
        <Navbar />
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,144,226,0.1),transparent_50%)]" />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen">
          <div className="container mx-auto px-4 py-16">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-[#4A90E2] bg-clip-text text-transparent">
                Swap
              </h1>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Exchange tokens instantly with optimal rates
              </p>
            </div>

            {/* Main Content */}
            <div className="max-w-md mx-auto">
              <SwapPanel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}