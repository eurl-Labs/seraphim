"use client";

import { useState } from "react";

interface ExploreFiltersProps {
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
}

const categories = [
  "All",
  "Lending",
  "DEX",
  "Yield Farming",
  "Staking",
  "Derivatives",
  "Insurance"
];

const sortOptions = [
  { value: "tvl", label: "TVL High to Low" },
  { value: "apy", label: "APY High to Low" },
  { value: "users", label: "Most Users" },
  { value: "volume", label: "Highest Volume" },
  { value: "change", label: "Trending" }
];

export default function ExploreFilters({
  onCategoryChange,
  onSortChange,
  onSearchChange,
}: ExploreFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search protocols..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full bg-black/40 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-all"
        />
      </div>

      {/* Category Filters */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeCategory === category
                  ? "bg-[#4A90E2] text-white shadow-lg shadow-[#4A90E2]/20"
                  : "bg-black/40 text-gray-300 hover:bg-black/60 border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">Sort By</h3>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-all"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-black">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}