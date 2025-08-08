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

export default function SwapPanel() {
  const [fromToken, setFromToken] = useState<Token>(tokens[0]);
  const [toToken, setToToken] = useState<Token>(tokens[4]); // srUSD
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate exchange rate
  const exchangeRate = fromToken && toToken ? fromToken.price / toToken.price : 0;
  
  // Calculate to amount based on from amount
  const calculateToAmount = (amount: string) => {
    if (!amount || !fromToken || !toToken) return "";
    const fromValue = parseFloat(amount);
    const toValue = fromValue * exchangeRate;
    return toValue.toFixed(6);
  };

  // Calculate from amount based on to amount
  const calculateFromAmount = (amount: string) => {
    if (!amount || !fromToken || !toToken) return "";
    const toValue = parseFloat(amount);
    const fromValue = toValue / exchangeRate;
    return fromValue.toFixed(6);
  };

  // Handle from amount change
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  // Handle to amount change
  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    setFromAmount(calculateFromAmount(value));
  };

  // Swap tokens
  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    
    // Recalculate amounts
    if (fromAmount) {
      const newToAmount = calculateToAmount(fromAmount);
      setToAmount(newToAmount);
    }
  };

  // Calculate price impact
  const priceImpact = 0.02; // Mock price impact

  // Calculate minimum received (with slippage)
  const minimumReceived = parseFloat(toAmount) * (1 - slippage / 100);

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Swap Tokens</h2>
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* From Token */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-300">From</label>
            <span className="text-xs text-gray-400">
              Balance: {fromToken.balance} {fromToken.symbol}
            </span>
          </div>
          
          <div className="bg-black/30 border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-transparent text-white text-2xl font-semibold placeholder-gray-400 focus:outline-none"
                />
                <div className="text-sm text-gray-400 mt-1">
                  ${(parseFloat(fromAmount) * fromToken.price || 0).toLocaleString()}
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-black/40 rounded-xl px-3 py-2 border border-white/10">
                <Image
                  src={fromToken.logo}
                  alt={fromToken.symbol}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="text-right">
                  <div className="text-white font-medium text-sm">{fromToken.symbol}</div>
                  <div className="text-gray-400 text-xs">{fromToken.name}</div>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="flex justify-end mt-2">
              <button
                onClick={() => handleFromAmountChange(fromToken.balance.toString())}
                className="text-[#4A90E2] hover:text-[#357ABD] text-xs font-medium transition-colors"
              >
                Max
              </button>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2">
          <button
            onClick={handleSwapTokens}
            className="bg-black/60 hover:bg-black/80 border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* To Token */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-300">To</label>
            <span className="text-xs text-gray-400">
              Balance: {toToken.balance} {toToken.symbol}
            </span>
          </div>
          
          <div className="bg-black/30 border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <input
                  type="number"
                  value={toAmount}
                  onChange={(e) => handleToAmountChange(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-transparent text-white text-2xl font-semibold placeholder-gray-400 focus:outline-none"
                />
                <div className="text-sm text-gray-400 mt-1">
                  ${(parseFloat(toAmount) * toToken.price || 0).toLocaleString()}
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-black/40 rounded-xl px-3 py-2 border border-white/10">
                <Image
                  src={toToken.logo}
                  alt={toToken.symbol}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="text-right">
                  <div className="text-white font-medium text-sm">{toToken.symbol}</div>
                  <div className="text-gray-400 text-xs">{toToken.name}</div>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Details */}
        {fromAmount && toAmount && (
          <div className="bg-black/20 border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Exchange Rate</span>
              <span className="text-white">
                1 {fromToken.symbol} = {exchangeRate.toFixed(6)} {toToken.symbol}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Price Impact</span>
              <span className="text-green-400">&lt; {priceImpact}%</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Slippage Tolerance</span>
              <span className="text-white">{slippage}%</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Minimum Received</span>
              <span className="text-white">
                {minimumReceived.toFixed(6)} {toToken.symbol}
              </span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button
          disabled={!fromAmount || !toAmount || isLoading}
          className="w-full bg-[#4A90E2] hover:bg-[#357ABD] disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-[#4A90E2]/20"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              Swapping...
            </div>
          ) : !fromAmount || !toAmount ? (
            "Enter Amount"
          ) : (
            `Swap ${fromToken.symbol} for ${toToken.symbol}`
          )}
        </button>
      </div>
    </div>
  );
}