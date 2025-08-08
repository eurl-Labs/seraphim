"use client";

import Image from "next/image";
import { useState } from "react";

interface FaucetCardProps {
  token: {
    id: string;
    symbol: string;
    name: string;
    logo: any;
    amount: string;
    cooldown: string;
    description: string;
    network: string;
  };
}

export default function FaucetCard({ token }: FaucetCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastClaim, setLastClaim] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const handleClaim = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLastClaim(new Date());
    setIsLoading(false);
    
    // Start cooldown timer
    startCooldownTimer();
  };

  const startCooldownTimer = () => {
    const cooldownMs = parseCooldown(token.cooldown);
    const endTime = Date.now() + cooldownMs;
    
    const updateTimer = () => {
      const remaining = endTime - Date.now();
      if (remaining <= 0) {
        setTimeRemaining("");
        return;
      }
      
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      setTimeout(updateTimer, 1000);
    };
    
    updateTimer();
  };

  const parseCooldown = (cooldown: string): number => {
    if (cooldown.includes('24h')) return 24 * 60 * 60 * 1000;
    if (cooldown.includes('12h')) return 12 * 60 * 60 * 1000;
    if (cooldown.includes('6h')) return 6 * 60 * 60 * 1000;
    if (cooldown.includes('1h')) return 60 * 60 * 1000;
    return 60 * 1000; // 1 minute default
  };

  const canClaim = !lastClaim || !timeRemaining;

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-black/50 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <Image
            src={token.logo}
            alt={token.symbol}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-2 border-black/60"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{token.symbol}</h3>
          <p className="text-gray-400 text-sm">{token.name}</p>
        </div>
        <div className="text-right">
          <div className="text-[#4A90E2] font-bold text-lg">{token.amount}</div>
          <div className="text-gray-400 text-xs">{token.network}</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4">{token.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Amount per Claim</div>
          <div className="text-white font-semibold">{token.amount}</div>
        </div>
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Cooldown</div>
          <div className="text-white font-semibold">{token.cooldown}</div>
        </div>
      </div>

      {/* Cooldown Timer */}
      {timeRemaining && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-orange-400 text-sm font-medium">
              Next claim in: {timeRemaining}
            </span>
          </div>
        </div>
      )}

      {/* Last Claim Info */}
      {lastClaim && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-400 text-sm">
              Last claimed: {lastClaim.toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}

      {/* Claim Button */}
      <button
        onClick={handleClaim}
        disabled={!canClaim || isLoading}
        className="w-full bg-[#4A90E2] hover:bg-[#357ABD] disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-[#4A90E2]/20"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            Claiming...
          </div>
        ) : !canClaim ? (
          `Wait ${timeRemaining}`
        ) : (
          `Claim ${token.amount} ${token.symbol}`
        )}
      </button>

      {/* Network Badge */}
      <div className="mt-3 flex justify-center">
        <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full">
          {token.network} Testnet
        </span>
      </div>
    </div>
  );
}