"use client";

import Image from "next/image";

interface FaucetCardProps {
  token: {
    name: string;
    symbol: string;
    logo: any;
    amount: string;
    cooldown: string;
    description: string;
    network: string;
  };
}

export default function FaucetCard({ token }: FaucetCardProps) {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
      {/* Token Header */}
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={token.logo}
          alt={token.name}
          width={32}
          height={32}
        />
        <div>
          <div className="text-sm">{token.symbol}</div>
          <div className="text-xs text-gray-400">{token.name}</div>
        </div>
      </div>

      {/* Token Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Amount</span>
          <span className="text-sm">{token.amount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Cooldown</span>
          <span className="text-sm">{token.cooldown}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-400 mb-4 line-clamp-2">
        {token.description}
      </p>

      {/* Network & Claim Button */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{token.network}</span>
        <button className="bg-[#4A90E2] hover:bg-[#357ABD] px-4 py-1.5 rounded-lg text-xs transition-all duration-300">
          Claim
        </button>
      </div>
    </div>
  );
}