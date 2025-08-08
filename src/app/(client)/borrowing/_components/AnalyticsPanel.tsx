"use client";

import Image from "next/image";
import {
  ethOriginalLogo,
  wBtcLogo,
  stEthLogo,
  cbBtcLogo
} from "../../../../../public/assets/logos";

interface CollateralData {
  symbol: string;
  logo: any;
  totalSupply: string;
  utilization: number;
  price: number;
  priceChange24h: number;
  liquidationThreshold: number;
  stabilityFee: number;
}

const collateralData: CollateralData[] = [
  {
    symbol: "ETH",
    logo: ethOriginalLogo,
    totalSupply: "$45.2M",
    utilization: 78,
    price: 3420.50,
    priceChange24h: 2.3,
    liquidationThreshold: 85,
    stabilityFee: 0.5
  },
  {
    symbol: "wBTC",
    logo: wBtcLogo,
    totalSupply: "$28.7M",
    utilization: 65,
    price: 67890.00,
    priceChange24h: -1.2,
    liquidationThreshold: 80,
    stabilityFee: 0.5
  },
  {
    symbol: "stETH",
    logo: stEthLogo,
    totalSupply: "$32.1M",
    utilization: 82,
    price: 3415.20,
    priceChange24h: 2.1,
    liquidationThreshold: 83,
    stabilityFee: 0.5
  },
  {
    symbol: "cbBTC",
    logo: cbBtcLogo,
    totalSupply: "$18.9M",
    utilization: 71,
    price: 67850.00,
    priceChange24h: -0.8,
    liquidationThreshold: 78,
    stabilityFee: 0.5
  }
];

export default function AnalyticsPanel() {
  const totalTVL = "$125.0M";
  const totalBorrowed = "$87.6M";
  const globalUtilization = 70.1;
  const avgLiquidationThreshold = 81.5;

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">Total TVL</h3>
          <p className="text-2xl font-bold text-white">{totalTVL}</p>
          <p className="text-sm text-green-400 mt-1">+8.2% this week</p>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">Total Borrowed</h3>
          <p className="text-2xl font-bold text-white">{totalBorrowed}</p>
          <p className="text-sm text-blue-400 mt-1">srUSD Outstanding</p>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">Global Utilization</h3>
          <p className="text-2xl font-bold text-white">{globalUtilization}%</p>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
            <div 
              className="bg-[#4A90E2] h-1 rounded-full" 
              style={{ width: `${globalUtilization}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">Avg Liquidation</h3>
          <p className="text-2xl font-bold text-white">{avgLiquidationThreshold}%</p>
          <p className="text-sm text-gray-400 mt-1">Threshold</p>
        </div>
      </div>

      {/* Collateral Assets Table */}
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Collateral Assets</h2>
        </div>
        
        {/* Table Header */}
        <div className="bg-black/60 px-6 py-3 border-b border-white/10">
          <div className="grid grid-cols-8 gap-4 text-sm font-medium text-gray-300 uppercase tracking-wide">
            <div className="col-span-2">Asset</div>
            <div>Price</div>
            <div>24h Change</div>
            <div>Total Supply</div>
            <div>Utilization</div>
            <div>Liq. Threshold</div>
            <div>Stability Fee</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/10">
          {collateralData.map((asset) => (
            <div key={asset.symbol} className="px-6 py-4 hover:bg-white/5 transition-colors">
              <div className="grid grid-cols-8 gap-4 items-center">
                {/* Asset */}
                <div className="col-span-2 flex items-center gap-3">
                  <Image
                    src={asset.logo}
                    alt={asset.symbol}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-white font-medium">{asset.symbol}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-white font-mono">
                  ${asset.price.toLocaleString()}
                </div>

                {/* 24h Change */}
                <div className={`font-mono ${asset.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {asset.priceChange24h >= 0 ? '+' : ''}{asset.priceChange24h}%
                </div>

                {/* Total Supply */}
                <div className="text-white font-mono">
                  {asset.totalSupply}
                </div>

                {/* Utilization */}
                <div className="space-y-1">
                  <div className="text-white font-mono">{asset.utilization}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full ${
                        asset.utilization > 80 ? 'bg-red-400' : 
                        asset.utilization > 60 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${asset.utilization}%` }}
                    ></div>
                  </div>
                </div>

                {/* Liquidation Threshold */}
                <div className="text-white font-mono">
                  {asset.liquidationThreshold}%
                </div>

                {/* Stability Fee */}
                <div className="text-white font-mono">
                  {asset.stabilityFee}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Feeds Status */}
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Price Feeds Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {collateralData.map((asset) => (
            <div key={asset.symbol} className="bg-black/20 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={asset.logo}
                  alt={asset.symbol}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="text-white font-medium">{asset.symbol}/USD</span>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mb-1">Last Updated</div>
              <div className="text-sm text-green-400">12 seconds ago</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health Indicators */}
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">System Health Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Collateralization Ratio</span>
              <span className="text-green-400 font-medium">142%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
            <div className="text-xs text-gray-400">Safe above 120%</div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Liquidation Risk</span>
              <span className="text-green-400 font-medium">Low</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: "25%" }}></div>
            </div>
            <div className="text-xs text-gray-400">Based on price volatility</div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Protocol Reserves</span>
              <span className="text-blue-400 font-medium">$12.5M</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <div className="text-xs text-gray-400">Emergency fund</div>
          </div>
        </div>
      </div>
    </div>
  );
}