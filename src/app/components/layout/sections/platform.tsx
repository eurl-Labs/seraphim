"use client";
import { Marquee } from "@/components/magicui/marquee"; // pakai marquee dari magicui
import Image from "next/image";

export default function Platform() {
  const platforms = [
    {
      icon: "Ethereum",
      src: "/assets/logos/ethOriLogo.png",
      name: "Ethereum",
    },
    {
      icon: "Chainlink",
      src: "/assets/logos/chainlinkLogo.png",
      name: "Chainlink",
    },
    {
      icon: "stEth",
      src: "/assets/logos/stEthLogo.png",
      name: "stETH",
    },
    {
      icon: "WBTC",
      src: "/assets/logos/wbtcLogo.svg",
      name: "wBTC",
    },
  ];

  return (
    <section className="relative mx-auto pb-24 sm:pb-32 bg-slate-950">
      <h2 className="text-lg md:text-xl text-center mb-6">Built in</h2>

      <div className="relative">
        <Marquee className="[--duration:20s] ">
          {platforms.map(({ src, name }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium mr-12"
            >
              <Image src={src} alt={name} width={32} height={32} className="mr-2" />
              {name}
            </div>
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-950" />
      </div>
    </section>
  );
}
