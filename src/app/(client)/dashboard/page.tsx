"use client";

import { useState } from "react";
import Navbar from "../../components/navbar";
import {
  ethOriginalLogo,
  wBtcLogo,
  stEthLogo,
  cbBtcLogo,
  srUSDLogo,
  usdsLogo,
} from "../../../../public/assets/logos";
import Image from "next/image";

// Mock data - replace with real data from your backend
const portfolioData = {
  totalAssets: "$125,400",
  supplied: "$85,200",
  borrowed: "$40,200",
  netAPY: "4.8%",
  healthFactor: "1.8",
};

const suppliedAssets = [
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: ethOriginalLogo,
    amount: "10.5",
    value: "$21,000",
    apy: "3.2%",
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "wBTC",
    logo: wBtcLogo,
    amount: "0.85",
    value: "$34,000",
    apy: "2.8%",
  },
];

const borrowedAssets = [
  {
    name: "Seraphim USD",
    symbol: "srUSD",
    logo: srUSDLogo,
    amount: "25,000",
    value: "$25,000",
    rate: "4.5%",
    collateralFactor: "75%",
  },
];

const recentTransactions = [
  {
    type: "Deposit",
    asset: "ETH",
    amount: "5.0",
    timestamp: "2025-08-08 14:30",
  },
  {
    type: "Borrow",
    asset: "srUSD",
    amount: "10,000",
    timestamp: "2025-08-08 14:35",
  },
];

export default function DashboardPage() {
  const [connectedWallet] = useState("0x1234...5678");

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
                Dashboard
              </h1>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Monitor your positions and manage your assets
              </p>
            </div>

            {/* Wallet Status */}
            <div className="flex justify-end mb-6">
              <div className="inline-flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">{connectedWallet}</span>
              </div>
            </div>

            {/* Portfolio Overview */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <div className="text-gray-400 text-sm">Total Assets</div>
                  <div className="text-xl font-bold">{portfolioData.totalAssets}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Supplied</div>
                  <div className="text-xl font-bold">{portfolioData.supplied}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Borrowed</div>
                  <div className="text-xl font-bold">{portfolioData.borrowed}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Net APY</div>
                  <div className="text-xl font-bold text-green-400">{portfolioData.netAPY}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Health Factor</div>
                  <div className="text-xl font-bold text-blue-400">{portfolioData.healthFactor}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 mb-8">
              <button className="bg-[#4A90E2] hover:bg-[#357ABD] px-4 py-2 rounded-xl text-sm">
                Deposit
              </button>
              <button className="bg-[#4A90E2] hover:bg-[#357ABD] px-4 py-2 rounded-xl text-sm">
                Borrow
              </button>
              <button className="bg-[#4A90E2] hover:bg-[#357ABD] px-4 py-2 rounded-xl text-sm">
                Repay
              </button>
            </div>

            {/* Positions */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Supplied Assets */}
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4">Supplied Assets</h2>
                <div className="space-y-4">
                  {suppliedAssets.map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image src={asset.logo} alt={asset.name} width={24} height={24} />
                        <div>
                          <div className="font-medium">{asset.symbol}</div>
                          <div className="text-sm text-gray-400">{asset.amount}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div>{asset.value}</div>
                        <div className="text-sm text-green-400">{asset.apy} APY</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Borrowed Assets */}
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4">Borrowed Assets</h2>
                <div className="space-y-4">
                  {borrowedAssets.map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image src={asset.logo} alt={asset.name} width={24} height={24} />
                        <div>
                          <div className="font-medium">{asset.symbol}</div>
                          <div className="text-sm text-gray-400">{asset.amount}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div>{asset.value}</div>
                        <div className="text-sm text-red-400">{asset.rate} APR</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
              <div className="space-y-4">
                {recentTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{tx.type}</div>
                      <div className="text-sm text-gray-400">{tx.asset}</div>
                    </div>
                    <div className="text-right">
                      <div>{tx.amount}</div>
                      <div className="text-sm text-gray-400">{tx.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}