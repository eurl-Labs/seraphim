"use client";
import React from "react";
import { AnimatedPinDemo } from "./components/ui/AnimatedPinDemo";
import { LampContainer, LampDemo } from "./components/ui/lamp";
import { motion } from "motion/react";
export default function Home() {
  return (
    <LampContainer>
      {/* <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center px-2 md:px-10 py-4"> */}
        <h2 className="text-white text-2xl md:text-5xl font-bold text-center">
          The Automated
        </h2>
        <h2 className="text-white text-2xl md:text-5xl font-bold text-center mt-5">
          Multi-Collateral Stablecoin
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          Dynamic rebalancing. Secure vaults. USD-pegged, future-ready.
        </p>

        <AnimatedPinDemo />

        <div className="flex flex-col sm:flex-row items-center gap-3 mb-[5rem]">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Launch app
          </button>
          <button className="px-4 py-2 text-white ">Learn More</button>
        </div>
      {/* </div> */}
    </LampContainer>
  );
}
