"use client";

import Navbar from "../../components/navbar";
import BorrowPanel from "./_components/BorrowPanel";

export default function BorrowingPage() {
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
              <h1 className="text-xl font-bold mb-3 bg-white bg-clip-text text-transparent">
                Borrow srUSD
              </h1>
              <p className="text-sm text-gray-300 max-w-2xl mx-auto">
                Use your crypto assets as collateral to borrow srUSD stablecoin with competitive rates.
              </p>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
              <BorrowPanel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}