"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ethOriginalLogo,
  wBtcLogo,
  stEthLogo,
  cbBtcLogo,
  srUSDLogo,
} from "../../../../../public/assets/logos";

interface CollateralAsset {
  id: string;
  symbol: string;
  name: string;
  logo: any;
  ltv: number; // Loan-to-Value ratio
  liquidationThreshold: number;
  price: number;
  balance: number;
}

const collateralAssets: CollateralAsset[] = [
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    logo: ethOriginalLogo,
    ltv: 80,
    liquidationThreshold: 85,
    price: 3420.5,
    balance: 2.5,
  },
  {
    id: "wbtc",
    symbol: "wBTC",
    name: "Wrapped Bitcoin",
    logo: wBtcLogo,
    ltv: 75,
    liquidationThreshold: 80,
    price: 67890.0,
    balance: 0.1,
  },
  {
    id: "steth",
    symbol: "stETH",
    name: "Staked Ethereum",
    logo: stEthLogo,
    ltv: 78,
    liquidationThreshold: 83,
    price: 3415.2,
    balance: 1.8,
  },
  {
    id: "cbbtc",
    symbol: "cbBTC",
    name: "Coinbase Bitcoin",
    logo: cbBtcLogo,
    ltv: 73,
    liquidationThreshold: 78,
    price: 67850.0,
    balance: 0.05,
  },
];

interface CollateralInput {
  asset: CollateralAsset;
  amount: string;
}

export default function BorrowPanel() {
  const [selectedCollaterals, setSelectedCollaterals] = useState<
    CollateralInput[]
  >([]);
  const [borrowAmount, setBorrowAmount] = useState<string>("");

  // Add new collateral
  const addCollateral = () => {
    const availableAssets = collateralAssets.filter(
      (asset) =>
        !selectedCollaterals.some((selected) => selected.asset.id === asset.id)
    );
    if (availableAssets.length > 0) {
      setSelectedCollaterals([
        ...selectedCollaterals,
        { asset: availableAssets[0], amount: "" },
      ]);
    }
  };

  // Remove collateral
  const removeCollateral = (index: number) => {
    if (selectedCollaterals.length > 1) {
      setSelectedCollaterals(selectedCollaterals.filter((_, i) => i !== index));
    }
  };

  // Update collateral amount
  const updateCollateralAmount = (index: number, amount: string) => {
    const updated = [...selectedCollaterals];
    updated[index].amount = amount;
    setSelectedCollaterals(updated);
  };

  // Update collateral asset
  const updateCollateralAsset = (index: number, asset: CollateralAsset) => {
    const updated = [...selectedCollaterals];
    updated[index].asset = asset;
    setSelectedCollaterals(updated);
  };

  // Calculate total collateral value
  const totalCollateralValue = selectedCollaterals.reduce(
    (total, collateral) => {
      const amount = parseFloat(collateral.amount) || 0;
      return total + amount * collateral.asset.price;
    },
    0
  );

  // Calculate weighted average LTV
  const weightedAverageLTV = selectedCollaterals.reduce(
    (totalLTV, collateral, index) => {
      const amount = parseFloat(collateral.amount) || 0;
      const value = amount * collateral.asset.price;
      const weight =
        totalCollateralValue > 0 ? value / totalCollateralValue : 0;
      return totalLTV + collateral.asset.ltv * weight;
    },
    0
  );

  // Calculate max borrow amount
  const maxBorrowAmount = (
    (totalCollateralValue * weightedAverageLTV) /
    100
  ).toFixed(2);

  // Calculate weighted average liquidation threshold
  const weightedAvgLiqThreshold = selectedCollaterals.reduce(
    (totalThreshold, collateral) => {
      const amount = parseFloat(collateral.amount) || 0;
      const value = amount * collateral.asset.price;
      const weight =
        totalCollateralValue > 0 ? value / totalCollateralValue : 0;
      return totalThreshold + collateral.asset.liquidationThreshold * weight;
    },
    0
  );

  // Calculate liquidation price (simplified - would need more complex calculation for multiple assets)
  const liquidationValue =
    parseFloat(borrowAmount) / (weightedAvgLiqThreshold / 100);
  const liquidationRatio =
    totalCollateralValue > 0 ? liquidationValue / totalCollateralValue : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Borrow Panel */}
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-white">Borrow srUSD</h2>
          <Image
            src={srUSDLogo}
            alt="srUSD"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>

        {/* Simplified Collateral Selection */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-300 ">
            Select Collateral Assets
          </label>

          {/* Quick Asset Selection Grid */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {collateralAssets.map((asset) => {
              const isSelected = selectedCollaterals.some(
                (sc) => sc.asset.id === asset.id
              );
              return (
                <button
                  key={asset.id}
                  onClick={() => {
                    if (isSelected) {
                      // Remove if already selected
                      setSelectedCollaterals((prev) =>
                        prev.filter((sc) => sc.asset.id !== asset.id)
                      );
                    } else {
                      // Add new collateral
                      setSelectedCollaterals((prev) => [
                        ...prev,
                        { asset, amount: "" },
                      ]);
                    }
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-[#4A90E2] bg-[#4A90E2]/10 shadow-lg shadow-[#4A90E2]/20"
                      : "border-white/10 bg-black/20 hover:border-white/30 hover:bg-black/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={asset.logo}
                        alt={asset.symbol}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#4A90E2] rounded-full flex items-center justify-center">
                          <svg
                            className="w-2 h-2 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white font-semibold text-sm">
                        {asset.symbol}
                      </div>
                      <div className="text-gray-400 text-xs">
                        ${asset.price.toLocaleString()}
                      </div>
                      <div className="text-gray-500 text-xs">
                        LTV: {asset.ltv}%
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Collaterals Input */}
          {selectedCollaterals.length > 0 && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-white">
                Enter Amounts
              </div>
              {selectedCollaterals.map((collateral, index) => (
                <div
                  key={collateral.asset.id}
                  className="bg-gradient-to-r from-black/30 to-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={collateral.asset.logo}
                      alt={collateral.asset.symbol}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">
                        {collateral.asset.name}
                      </div>
                      <div className="text-gray-400 text-xs">
                        ${collateral.asset.price.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => removeCollateral(index)}
                      className="text-gray-400 hover:text-red-400 transition-colors p-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      value={collateral.amount}
                      onChange={(e) =>
                        updateCollateralAmount(index, e.target.value)
                      }
                      placeholder="0.0"
                      className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 pr-20 text-white placeholder-gray-400 focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20 transition-all"
                    />
                    <div className="absolute right-3 top-3 text-gray-300 text-sm font-medium">
                      {collateral.asset.symbol}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className="text-gray-400">
                      Balance:{" "}
                      <span className="text-white">
                        {collateral.asset.balance} {collateral.asset.symbol}
                      </span>
                    </span>
                    <div className="text-right">
                      <div className="text-gray-400">Value</div>
                      <div className="text-white font-mono">
                        $
                        {(
                          (parseFloat(collateral.amount) || 0) *
                          collateral.asset.price
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      updateCollateralAmount(
                        index,
                        collateral.asset.balance.toString()
                      )
                    }
                    className="mt-2 text-[#4A90E2] hover:text-[#357ABD] text-xs font-medium transition-colors"
                  >
                    Use Max
                  </button>
                </div>
              ))}
            </div>
          )}

          {selectedCollaterals.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <p className="text-sm">
                Select collateral assets above to get started
              </p>
            </div>
          )}
        </div>

        {/* Borrow Amount */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">
            Borrow Amount
          </label>
          <div className="relative mt-2">
            <input
              type="number"
              value={borrowAmount}
              onChange={(e) => setBorrowAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-[#0A0A0A] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-[#4A90E2] focus:outline-none"
            />
            <div className="absolute right-3 top-3 flex items-center gap-2">
              <Image
                src={srUSDLogo}
                alt="srUSD"
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-gray-300 text-sm">srUSD</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Max: ${maxBorrowAmount} srUSD (based on weighted avg LTV:{" "}
            {weightedAverageLTV.toFixed(1)}%)
          </div>
        </div>

        {/* Borrow Button */}
        <button
          disabled={selectedCollaterals.length === 0 || !borrowAmount}
          className="w-full bg-[#4A90E2] hover:bg-[#357ABD] disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-[#4A90E2]/20"
        >
          {selectedCollaterals.length === 0
            ? "Select Collateral Assets"
            : !borrowAmount
            ? "Enter Borrow Amount"
            : "Borrow srUSD"}
        </button>
      </div>

      {/* Summary Panel */}
      <div className="space-y-6">
        {/* Position Summary */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Position Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Collateral Value</span>
              <span className="text-white font-medium">
                ${totalCollateralValue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Borrow Amount</span>
              <span className="text-white font-medium">
                ${borrowAmount || "0"} srUSD
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Collateralization Ratio</span>
              <span className="text-white font-medium">
                {totalCollateralValue && borrowAmount
                  ? `${(
                      (totalCollateralValue / parseFloat(borrowAmount)) *
                      100
                    ).toFixed(0)}%`
                  : "-%"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Weighted Avg Liq. Threshold</span>
              <span className="text-red-400 font-medium">
                {weightedAvgLiqThreshold.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Liquidation Risk</span>
              <span className="text-red-400 font-medium">
                {liquidationRatio > 0.9
                  ? "High"
                  : liquidationRatio > 0.7
                  ? "Medium"
                  : "Low"}
              </span>
            </div>
          </div>
        </div>

        {/* Health Factor */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Health Factor
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Current Health</span>
              <span className="text-[#4CAF50] font-medium text-lg">2.35</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-[#4CAF50] h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-400">
              Health factor must stay above 1.0 to avoid liquidation
            </div>
          </div>
        </div>

        {/* Interest Rates */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Interest Rates
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Borrow APR</span>
              <span className="text-white font-medium">3.45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Stability Fee</span>
              <span className="text-white font-medium">0.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Total APR</span>
              <span className="text-[#FFC107] font-medium">3.95%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
