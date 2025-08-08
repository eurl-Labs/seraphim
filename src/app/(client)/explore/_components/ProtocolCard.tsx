"use client";

import Image from "next/image";

interface ProtocolCardProps {
  name: string;
  logo: any;
  tvl: string;
  apy: string;
  category: string;
  description: string;
  users: string;
  volume24h: string;
  change24h: number;
}

export default function ProtocolCard({
  name,
  logo,
  tvl,
  apy,
  category,
  description,
  users,
  volume24h,
  change24h,
}: ProtocolCardProps) {
  return (
    <div className="border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] rounded-xl p-6 hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <Image
            src={logo}
            alt={name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black/60"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <span className="inline-block px-2 py-1 bg-[#4A90E2]/20 text-[#4A90E2] text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="text-xs text-gray-400 uppercase tracking-wide">TVL</div>
          <div className="text-white font-bold">{tvl}</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-gray-400 uppercase tracking-wide">APY</div>
          <div className="text-green-400 font-bold">{apy}</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-gray-400 uppercase tracking-wide">Users</div>
          <div className="text-white font-medium">{users}</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-gray-400 uppercase tracking-wide">24h Volume</div>
          <div className="text-white font-medium">{volume24h}</div>
        </div>
      </div>

      {/* Change Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">24h Change</span>
          <span className={`text-sm font-medium ${change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change24h >= 0 ? '+' : ''}{change24h}%
          </span>
        </div>
        <button className="text-[#4A90E2] hover:text-[#357ABD] text-sm font-medium transition-colors">
          Explore →
        </button>
      </div>
    </div>
  );
}