"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ethOriginalLogo,
  wBtcLogo,
  stEthLogo,
  cbBtcLogo,
  srUSDLogo,
  usdsLogo,
} from "../../../../../public/assets/logos";

interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: any;
  price: number;
  balance: number;
  decimals: number;
}

const tokens: Token[] = [
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    logo: ethOriginalLogo,
    price: 3420.50,
    balance: 2.5,
    decimals: 18,
  },
  {
    id: "wbtc",
    symbol: "wBTC",
    name: "Wrapped Bitcoin",
    logo: wBtcLogo,
    price: 67890.00,
    balance: 0.1,
    decimals: 8,
  },
  {
    id: "steth",
    symbol: "stETH",
    name: "Staked Ethereum",
    logo: stEthLogo,
    price: 3415.20,
    balance: 1.8,
    decimals: 18,
  },
  {
    id: "cbbtc",
    symbol: "cbBTC",
    name: "Coinbase Bitcoin",
    logo: cbBtcLogo,
    price: 67850.00,
    balance: 0.05,
    decimals: 8,
  },
  {
    id: "srusd",
    symbol: "srUSD",
    name: "Seraphim USD",
    logo: srUSDLogo,
    price: 1.00,
    balance: 1000,
    decimals: 18,
  },
  {
    id: "usds",
    symbol: "USDS",
    name: "Sky Dollar",
    logo: usdsLogo,
    price: 0.998,
    balance: 500,
    decimals: 18,
  },
];

interface TokenSelectorProps {
  selectedToken: Token;
  onSelectToken: (token: Token) => void;
  excludeToken?: Token;
  isOpen: boolean;
  onClose: () => void;
}

export default function TokenSelector({
  selectedToken,
  onSelectToken,
  excludeToken,
  isOpen,
  onClose,
}: TokenSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = tokens.filter(
    (token) =>
      token.id !== excludeToken?.id &&
      (token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/90 border border-white/20 rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Select Token</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-[#4A90E2] focus:outline-none"
            />
          </div>
        </div>

        {/* Token List */}
        <div className="p-2 max-h-96 overflow-y-auto">
          {filteredTokens.map((token) => (
            <button
              key={token.id}
              onClick={() => {
                onSelectToken(token);
                onClose();
              }}
              className="w-full p-4 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-3 text-left"
            >
              <Image
                src={token.logo}
                alt={token.symbol}
                width={32}
                height={32}
                className="rounded-full"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{token.symbol}</div>
                    <div className="text-gray-400 text-sm">{token.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm">{token.balance}</div>
                    <div className="text-gray-400 text-xs">
                      ${(token.balance * token.price).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
          
          {filteredTokens.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <div className="text-sm">No tokens found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}