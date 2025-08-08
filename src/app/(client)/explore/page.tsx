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
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,144,226,0.1),transparent_50%)]" />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen">
          <div className="container mx-auto px-4 py-16">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-[#4A90E2] bg-clip-text text-transparent">
                Explore DeFi
              </h1>
              <p className="text-sm text-gray-300 max-w-xl mx-auto">
                Discover and compare DeFi protocols across the ecosystem
              </p>
            </div>

            {/* Stats Overview - Simplified to 2 key metrics */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
              <div className="border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-white">{totalTVL}</p>
                <p className="text-xs text-gray-400">Total Value Locked</p>
              </div>
              <div className="border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] rounded-lg p-4 text-center">
                <p className="text-xl font-bold text-white">{protocols.length}</p>
                <p className="text-xs text-gray-400">Active Protocols</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] rounded-lg p-4 sticky top-24">
                  <ExploreFilters
                    onCategoryChange={handleCategoryChange}
                    onSortChange={handleSortChange}
                    onSearchChange={handleSearchChange}
                  />
                </div>
              </div>

              {/* Protocols Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProtocols.map((protocol) => (
                    <ProtocolCard key={protocol.id} {...protocol} />
                  ))}
                </div>

                {filteredProtocols.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No protocols found</p>
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