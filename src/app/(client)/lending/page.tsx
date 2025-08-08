"use client";

import EarnTable from "./_components/EarnTable";
import Navbar from "../../components/navbar";

export default function LendingPage() {
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                Earn
              </h1>
              <p className="text-sm text-gray-400 max-w-lg mx-auto">
                Discover yield opportunities with competitive APRs.
              </p>
            </div>

            {/* Earn Table */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 max-w-5xl mx-auto">
              <EarnTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}