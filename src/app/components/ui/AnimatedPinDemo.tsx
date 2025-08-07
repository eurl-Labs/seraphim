"use client";
import React from "react";
import { PinContainer } from "./3d-pin";
import Image from "next/image";
import { srUSDLogo } from "../../../../public/assets/logos";

export function AnimatedPinDemo() {
  return (
    <div className="h-[25rem] w-full flex items-center justify-center">
      <PinContainer
        title="srUSD - Seraphim Stablecoin"
        href="#"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            srUSD
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500">
              The Automated Multi-Collateral Stablecoin
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 items-center justify-center">
            <Image 
              src={srUSDLogo} 
              alt="srUSD Logo" 
              width={120} 
              height={120}
              className="rounded-full"
            />
          </div>
        </div>
      </PinContainer>
    </div>
  );
}