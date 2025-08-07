"use client";
import React from "react";
import { AnimatedPinDemo } from "./components/ui/AnimatedPinDemo";
import { LampContainer, LampDemo } from "./components/ui/lamp";
import { motion } from "motion/react";
import { VideoText } from "@/components/magicui/video-text";
export default function Home() {
  return (
    <LampContainer>
      {/* <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center px-2 md:px-10 py-4"> */}
      <h2 className="text-white text-2xl md:text-5xl font-bold text-center">
        The Automated
      </h2>
      <h2 className="text-white text-2xl md:text-5xl font-bold text-center mt-2">
        Multi-Collateral Stablecoin
      </h2>

      <div className="relative h-[100px] md:h-[11rem] w-full overflow-hidden">
        <VideoText src="https://ipfs.io/ipfs/bafybeicpyjz6rrfclhrivhqvwm7swrfrfba72ctjkawttkf2rcgbvmtjue">
          Seraphim
        </VideoText>
      </div>
      {/* https://cdn.magicui.design/ocean-small.webm */}
      <AnimatedPinDemo />
      {/* </div> */}
    </LampContainer>
  );
}
