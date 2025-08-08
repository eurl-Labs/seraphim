"use client";

import { useState } from "react";
import Navbar from "../../components/navbar";
import SwapPanel from "./_components/SwapPanel";
import TokenSelector from "./_components/TokenSelector";

export default function SwapPage() {
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
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-[#4A90E2] bg-clip-text text-transparent">
                Swap Tokens
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Trade your tokens instantly with the best rates. 
                Powered by automated market makers and deep liquidity pools.
              </p>
            </div>

            {/* Swap Interface */}
            <div className="flex justify-center">
              <SwapPanel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}