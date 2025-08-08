"use client";

import { useState } from "react";
import Navbar from "../../components/navbar";
import ProtocolCard from "./_components/ProtocolCard";
import ExploreFilters from "./_components/ExploreFilters";
import {
  ethOriginalLogo,
  wBtcLogo,
  stEthLogo,
  cbBtcLogo,
  srUSDLogo,
  chainlinkLogo,
} from "../../../../public/assets/logos";

const protocols = [
  {
    id: "seraphim-lending",
    name: "Seraphim Lending",
    logo: srUSDLogo,
    tvl: "$125.4M",
    apy: "4.8%",
    category: "Lending",
    description: "Multi-collateral lending protocol with automated rebalancing and competitive rates for DeFi users.",
    users: "12.5K",
    volume24h: "$2.1M",
    change24h: 5.2,
  },
  {
    id: "ethereum-staking",
    name: "ETH Staking",
    logo: ethOriginalLogo,
    tvl: "$892.1M",
    apy: "3.2%",
    category: "Staking",
    description: "Secure Ethereum 2.0 staking with liquid staking tokens and automated validator management.",
    users: "45.2K",
    volume24h: "$8.7M",
    change24h: 2.1,
  },
  {
    id: "btc-yield",
    name: "wBTC Yield",
    logo: wBtcLogo,
    tvl: "$234.7M",
    apy: "2.8%",
    category: "Yield Farming",
    description: "Bitcoin yield generation through wrapped Bitcoin strategies and institutional-grade security.",
    users: "8.9K",
    volume24h: "$3.4M",
    change24h: -1.2,
  },
  {
    id: "liquid-staking",
    name: "Liquid stETH",
    logo: stEthLogo,
    tvl: "$456.3M",
    apy: "3.5%",
    category: "Staking",
    description: "Liquid staking solution providing stETH rewards while maintaining token liquidity and flexibility.",
    users: "28.7K",
    volume24h: "$5.6M",
    change24h: 3.8,
  },
  {
    id: "coinbase-btc",
    name: "Coinbase BTC",
    logo: cbBtcLogo,
    tvl: "$167.9M",
    apy: "2.4%",
    category: "Staking",
    description: "Institutional Bitcoin custody and staking rewards through Coinbase's regulated infrastructure.",
    users: "15.3K",
    volume24h: "$1.9M",
    change24h: 0.8,
  },
  {
    id: "chainlink-data",
    name: "Chainlink Oracles",
    logo: chainlinkLogo,
    tvl: "$89.2M",
    apy: "6.2%",
    category: "Infrastructure",
    description: "Decentralized oracle network providing secure and reliable price feeds for DeFi protocols.",
    users: "5.7K",
    volume24h: "$892K",
    change24h: 7.4,
  },
];

export default function ExplorePage() {
  const [filteredProtocols, setFilteredProtocols] = useState(protocols);
  const [totalTVL, setTotalTVL] = useState("$1.96B");

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      setFilteredProtocols(protocols);
    } else {
      setFilteredProtocols(protocols.filter(p => p.category === category));
    }
  };

  const handleSortChange = (sortBy: string) => {
    const sorted = [...filteredProtocols].sort((a, b) => {
      switch (sortBy) {
        case "tvl":
          return parseFloat(b.tvl.replace(/[$M]/g, "")) - parseFloat(a.tvl.replace(/[$M]/g, ""));
        case "apy":
          return parseFloat(b.apy.replace("%", "")) - parseFloat(a.apy.replace("%", ""));
        case "users":
          return parseFloat(b.users.replace("K", "")) - parseFloat(a.users.replace("K", ""));
        case "volume":
          return parseFloat(b.volume24h.replace(/[$MK]/g, "")) - parseFloat(a.volume24h.replace(/[$MK]/g, ""));
        case "change":
          return b.change24h - a.change24h;
        default:
          return 0;
      }
    });
    setFilteredProtocols(sorted);
  };

  const handleSearchChange = (search: string) => {
    const filtered = protocols.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProtocols(filtered);
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
                Explore DeFi
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover the best DeFi protocols, compare yields, and find opportunities 
                across the decentralized finance ecosystem.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">Total TVL</h3>
                <p className="text-3xl font-bold text-white">{totalTVL}</p>
                <p className="text-sm text-green-400 mt-1">+12.4% this week</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">Active Protocols</h3>
                <p className="text-3xl font-bold text-white">{protocols.length}</p>
                <p className="text-sm text-blue-400 mt-1">Across 5 categories</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-white">116.3K</p>
                <p className="text-sm text-green-400 mt-1">+8.7% growth</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide mb-2">24h Volume</h3>
                <p className="text-3xl font-bold text-white">$22.6M</p>
                <p className="text-sm text-green-400 mt-1">+15.2%</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 sticky top-24">
                  <ExploreFilters
                    onCategoryChange={handleCategoryChange}
                    onSortChange={handleSortChange}
                    onSearchChange={handleSearchChange}
                  />
                </div>
              </div>

              {/* Protocols Grid */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Protocols ({filteredProtocols.length})
                  </h2>
                  <p className="text-gray-300">
                    Discover and compare DeFi protocols by TVL, yield, and activity
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProtocols.map((protocol) => (
                    <ProtocolCard key={protocol.id} {...protocol} />
                  ))}
                </div>

                {filteredProtocols.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-medium mb-2">No protocols found</h3>
                    <p className="text-gray-400">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}