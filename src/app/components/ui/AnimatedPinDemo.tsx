"use client";
import React from "react";
import { PinContainer } from "./3d-pin";
import Image from "next/image";
import { srUSDLogo } from "../../../../public/assets/logos";

export function AnimatedPinDemo() {
  return (
    <div className="h-[25rem] w-full flex items-center justify-center pb-10">
      <PinContainer title="srUSD - Seraphim Stablecoin" href="#">
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
          <div className="flex gap-2">
            <Image
              src={srUSDLogo}
              alt="srUSD Logo"
              width={28}
              height={25}
              className="rounded-full"
            />
            <h3 className="max-w-xs !pb-1 mt-1 font-bold text-base text-slate-100">
              srUSD{" "}
            </h3>
          </div>

          <div className="text-base !m-2 !p-2 font-normal">
            <span className="text-slate-500">
              The Automated Multi-Collateral Stablecoin
            </span>
          </div>
          <div className="p-5 flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 items-center justify-center">
            <Image
              src={srUSDLogo}
              alt="srUSD Logo"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
          <div className="flex justify-center mt-4 sm:flex-row items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
              Get started
            </button>
            <button className="px-4 py-2 text-white ">Learn More</button>
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
