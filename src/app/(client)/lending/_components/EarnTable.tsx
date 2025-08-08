"use client";

import Image from "next/image";
import { useState } from "react";

interface EarnPool {
  id: string;
  name: string;
  symbol: string;
  asset: string;
  chain: string;
  poolAllocations: string[];
  lendAPR: number;
  borrowAPR?: number;
  tvl: string;
  utilization: number;
  riskScore?: string;
  logo: string;
}

const mockData: EarnPool[] = [
  {
    id: "1",
    name: "wBTC",
    symbol: "wBTC",
    asset: "wBTC",
    chain: "Eth",
    poolAllocations: ["50% Aave", "30% Compound", "20% Reserve"],
    lendAPR: 4.5,
    borrowAPR: 6.2,
    tvl: "$12.5M",
    utilization: 85,
    riskScore: "Low",
    logo: "/assets/logos/wbtcLogo.svg"
  },
  {
    id: "2",
    name: "ETH Flexible",
    symbol: "ETHS",
    asset: "ETH",
    chain: "Ethereum",
    poolAllocations: ["40% Lido", "35% RocketPool", "25% Stakewise"],
    lendAPR: 3.2,
    borrowAPR: 5.8,
    tvl: "$45.2M",
    utilization: 92,
    riskScore: "Medium",
    logo: "/assets/logos/ethOriLogo.png"
  },
  {
    id: "3",
    name: "srUSD Multi",
    symbol: "srUSD",
    asset: "Multi",
    chain: "Ethereum",
    poolAllocations: ["30% ETH", "25% wBTC", "25% stETH", "20% cbBTC"],
    lendAPR: 5.8,
    tvl: "$28.7M",
    utilization: 78,
    riskScore: "Low",
    logo: "/assets/logos/srUSD.png"
  }
];

export default function EarnTable() {
  const [pools] = useState<EarnPool[]>(mockData);

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <div className="bg-black/50 backdrop-blur-sm border border-white/20 p-3 mb-4 rounded-lg">
        <div className="flex gap-3 items-center">
          <select className="bg-black/60 border border-white/20 rounded-md px-2 py-1.5 text-white text-sm min-w-[100px] backdrop-blur-sm">
            <option>All Chains</option>
            <option>Ethereum</option>
            <option>Arbitrum</option>
          </select>
          <select className="bg-black/60 border border-white/20 rounded-md px-2 py-1.5 text-white text-sm min-w-[100px] backdrop-blur-sm">
            <option>All Assets</option>
            <option>USDC</option>
            <option>ETH</option>
            <option>wBTC</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="bg-black/40 border border-white/20 rounded-md px-2 py-1.5 text-white text-sm placeholder-gray-400 flex-1 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
        {/* Header */}
        <div className="bg-black/60 px-4 py-2 border-b border-white/10">
          <div className="grid grid-cols-12 gap-3 text-xs font-medium text-gray-400 uppercase">
            <div className="col-span-3">Pool</div>
            <div className="col-span-2">Asset</div>
            <div className="col-span-2">Chain</div>
            <div className="col-span-1 text-right">APR</div>
            <div className="col-span-1 text-right">TVL</div>
            <div className="col-span-1 text-right">Util</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/10">
          {pools.map((pool) => (
            <div
              key={pool.id}
              className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer backdrop-blur-sm"
            >
              <div className="grid grid-cols-12 gap-3 items-center">
                {/* Pool Name */}
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={pool.logo}
                      alt={pool.symbol}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-white text-sm font-medium">{pool.name}</div>
                      <div className="text-gray-400 text-xs">{pool.symbol}</div>
                    </div>
                  </div>
                </div>

                {/* Asset */}
                <div className="col-span-2">
                  <div className="text-white text-sm">{pool.asset}</div>
                  <div className="text-gray-400 text-xs">
                    {pool.poolAllocations.slice(0, 1).join("")}
                  </div>
                </div>

                {/* Chain */}
                <div className="col-span-2">
                  <span className="text-white text-sm">{pool.chain}</span>
                </div>

                {/* Lend APR */}
                <div className="col-span-1 text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    {pool.lendAPR}%
                  </span>
                </div>

                {/* TVL */}
                <div className="col-span-1 text-right">
                  <span className="text-white text-sm font-mono">{pool.tvl}</span>
                </div>

                {/* Utilization */}
                <div className="col-span-1 text-right">
                  <span className="text-white text-sm font-mono">{pool.utilization}%</span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex gap-1 justify-center">
                  <button className="bg-blue-500/80 hover:bg-blue-500 text-white px-2 py-1 rounded text-xs transition-colors">
                    Deposit
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded text-xs transition-colors">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}