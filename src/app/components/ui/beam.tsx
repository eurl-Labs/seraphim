"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";
import {
  srUSDLogo,
  usdsLogo,
  cbBtcLogo,
  cbEthLogo,
  ethOriginalLogo,
  wBtcLogo,
  stEthLogo,
} from "../../../../public/assets/logos";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultiCollateral() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[400px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[300px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref} className="size-16">
          <Image
              src={usdsLogo}
              alt="srUSD"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Circle>
          <Circle ref={div5Ref} className="size-16">
          <Image
              src={stEthLogo}
              alt="srUSD"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref} className="size-16">
          <Image
              src={ethOriginalLogo}
              alt="srUSD"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Circle>
          <Circle ref={div4Ref} className="size-20">
            <Image
              src={srUSDLogo}
              alt="srUSD"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Circle>
          <Circle ref={div6Ref} className="size-16">
          <Image
              src={wBtcLogo}
              alt="srUSD"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref} className="size-16">
          <Image
              src={cbBtcLogo}
              alt="srUSD"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Circle>
          <Circle ref={div7Ref} className="size-16">
          <Image
              src={cbEthLogo}
              alt="srUSD"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}