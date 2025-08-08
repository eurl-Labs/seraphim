"use client";

import { useState } from "react";
import Navbar from "../../components/navbar";
import FaucetCard from "./_components/FaucetCard";
import {
  ethOriginalLogo,
  wBtcLogo,
  stEthLogo,
  cbBtcLogo,
  srUSDLogo,
  usdsLogo,
} from "../../../../public/assets/logos";

const faucetTokens = [
  {
    id: "eth-testnet",
    symbol: "ETH",
    name: "Ethereum",
    logo: ethOriginalLogo,
    amount: "0.1 ETH",
    cooldown: "24h",
    description: "Get testnet ETH for gas fees and testing smart contracts on Seraphim testnet.",
    network: "Seraphim",
  },
  {
    id: "wbtc-testnet",
    symbol: "wBTC",
    name: "Wrapped Bitcoin",
    logo: wBtcLogo,
    amount: "0.001 wBTC",
    cooldown: "12h",
    description: "Testnet wrapped Bitcoin for collateral testing and DeFi protocol interactions.",
    network: "Seraphim",
  },
  {
    id: "steth-testnet",
    symbol: "stETH",
    name: "Staked Ethereum",
    logo: stEthLogo,
    amount: "0.1 stETH",
    cooldown: "12h",
    description: "Liquid staking tokens for testing yield strategies and lending protocols.",
    network: "Seraphim",
  },
  {
    id: "cbbtc-testnet",
    symbol: "cbBTC",
    name: "Coinbase Bitcoin",
    logo: cbBtcLogo,
    amount: "0.001 cbBTC",
    cooldown: "12h",
    description: "Coinbase wrapped Bitcoin for institutional-grade testing scenarios.",
    network: "Seraphim",
  },
  {
    id: "srusd-testnet",
    symbol: "srUSD",
    name: "Seraphim USD",
    logo: srUSDLogo,
    amount: "100 srUSD",
    cooldown: "6h",
    description: "Native Seraphim stablecoin for testing borrowing, lending, and swap functionalities.",
    network: "Seraphim",
  },
  {
    id: "usds-testnet",
    symbol: "USDS",
    name: "Sky Dollar",
    logo: usdsLogo,
    amount: "100 USDS",
    cooldown: "6h",
    description: "Sky ecosystem stablecoin for multi-asset testing and cross-protocol compatibility.",
    network: "Seraphim",
  },
];

export default function FaucetsPage() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    // Mock wallet connection
    setConnectedWallet("0x1234...5678");
  };

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen text-white relative"
        style={{
          backgroundImage: "url('/assets/backgrounds/gradient-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,144,226,0.1),transparent_50%)]" />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen">
          <div className="container mx-auto px-6 py-24">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-[#4A90E2] bg-clip-text text-transparent">
                Testnet Faucets
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Get free testnet tokens to explore Seraphim's features. Perfect for developers, 
                testers, and anyone wanting to try our DeFi ecosystem risk-free.
              </p>
              
              {/* Connect Wallet */}
              {!connectedWallet ? (
                <button
                  onClick={handleConnectWallet}
                  className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-[#4A90E2]/20"
                >
                  Connect Wallet to Claim Tokens
                </button>
              ) : (
                <div className="inline-flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-xl px-6 py-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-medium">Wallet Connected: {connectedWallet}</span>
                </div>
              )}
            </div>

            {/* Network Info */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-12 max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-4 text-center">Seraphim Testnet Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-[#4A90E2] font-bold text-lg">Network Name</div>
                  <div className="text-gray-300">Seraphim Testnet</div>
                </div>
                <div className="text-center">
                  <div className="text-[#4A90E2] font-bold text-lg">Chain ID</div>
                  <div className="text-gray-300">31337</div>
                </div>
                <div className="text-center">
                  <div className="text-[#4A90E2] font-bold text-lg">RPC URL</div>
                  <div className="text-gray-300 text-sm">https://testnet.seraphim.finance</div>
                </div>
              </div>
            </div>

            {/* Usage Guidelines */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-12 max-w-4xl mx-auto">
              <h3 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Faucet Guidelines
              </h3>
              <ul className="text-yellow-200 text-sm space-y-2">
                <li>• Each token has its own cooldown period - respect the limits</li>
                <li>• These are testnet tokens with no real value</li>
                <li>• Use responsibly - don't abuse the faucets</li>
                <li>• Report any issues to our Discord or support channels</li>
                <li>• Tokens are automatically distributed to your connected wallet</li>
              </ul>
            </div>

            {/* Faucets Grid */}
            {connectedWallet ? (
              <div>
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Available Faucets</h2>
                  <p className="text-gray-300">Click on any token to claim your testnet allocation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {faucetTokens.map((token) => (
                    <FaucetCard key={token.id} token={token} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Connect Wallet to Continue</h3>
                <p className="text-gray-400 mb-6">You need to connect your wallet to claim testnet tokens</p>
                <button
                  onClick={handleConnectWallet}
                  className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Connect Wallet
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}