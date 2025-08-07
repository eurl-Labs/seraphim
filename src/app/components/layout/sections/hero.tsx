"use client";
import React from "react";
import { AnimatedPinDemo } from "../../ui/AnimatedPinDemo";
import { LampContainer } from "../../ui/lamp";
import { VideoText } from "@/components/magicui/video-text";

export default function Hero() {
  return (
    <LampContainer>
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
    </LampContainer>
  );
}

