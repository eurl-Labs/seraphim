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
    description: "Get testnet ETH for gas fees",
    network: "Seraphim",
  },
  {
    id: "wbtc-testnet",
    symbol: "wBTC",
    name: "Wrapped Bitcoin",
    logo: wBtcLogo,
    amount: "0.001 wBTC",
    cooldown: "12h",
    description: "Wrapped Bitcoin for testing",
    network: "Seraphim",
  },
  {
    id: "steth-testnet",
    symbol: "stETH",
    name: "Staked Ethereum",
    logo: stEthLogo,
    amount: "0.1 stETH",
    cooldown: "12h",
    description: "Liquid staking test tokens",
    network: "Seraphim",
  },
  {
    id: "cbbtc-testnet",
    symbol: "cbBTC",
    name: "Coinbase Bitcoin",
    logo: cbBtcLogo,
    amount: "0.001 cbBTC",
    cooldown: "12h",
    description: "Coinbase BTC test tokens",
    network: "Seraphim",
  },
  {
    id: "srusd-testnet",
    symbol: "srUSD",
    name: "Seraphim USD",
    logo: srUSDLogo,
    amount: "100 srUSD",
    cooldown: "6h",
    description: "Native stablecoin for testing",
    network: "Seraphim",
  },
  {
    id: "usds-testnet",
    symbol: "USDS",
    name: "Sky Dollar",
    logo: usdsLogo,
    amount: "100 USDS",
    cooldown: "6h",
    description: "Sky ecosystem test tokens",
    network: "Seraphim",
  },
];

export default function FaucetsPage() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    setConnectedWallet("0x1234...5678");
  };

  return (
    <>
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
        <Navbar />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,144,226,0.1),transparent_50%)]" />
        
        <div className="relative z-10 min-h-screen">
          <div className="container mx-auto px-4 py-16">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-xl font-bold mb-2 bg-white bg-clip-text text-transparent">
                Testnet Faucets
              </h1>
              <p className="text-sm text-gray-300 max-w-md mx-auto mb-6">
                Get test tokens for development
              </p>
              
              {/* Connect Wallet */}
              {!connectedWallet ? (
                <button
                  onClick={handleConnectWallet}
                  className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-6 py-2 rounded-xl text-sm transition-all duration-300"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-xl px-4 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">{connectedWallet}</span>
                </div>
              )}
            </div>

            {/* Network Info - Simplified */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-[#4A90E2]">Network</div>
                  <div className="text-gray-300">Seraphim Testnet</div>
                </div>
                <div>
                  <div className="text-[#4A90E2]">Chain ID</div>
                  <div className="text-gray-300">31337</div>
                </div>
                <div>
                  <div className="text-[#4A90E2]">RPC</div>
                  <div className="text-gray-300 text-xs">testnet.seraphim.finance</div>
                </div>
              </div>
            </div>

            {/* Faucets Grid */}
            {connectedWallet ? (
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {faucetTokens.map((token) => (
                    <FaucetCard key={token.id} token={token} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">Connect wallet to claim tokens</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}