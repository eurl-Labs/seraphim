"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

/* ----------------------- Types & Mock Data ----------------------- */

interface EarnPool {
  id: string;
  name: string;
  symbol: string;
  asset: string;
  chain: string;
  poolAllocations: string[];
  lendAPR: number;
  borrowAPR?: number;
  tvl: string; // e.g., "$12.5M"
  utilization: number; // 0-100
  riskScore?: "Low" | "Medium" | "High" | string;
  logo: string;
}

const mockData: EarnPool[] = [
  {
    id: "1",
    name: "wBTC",
    symbol: "wBTC",
    asset: "wBTC",
    chain: "Eth",
    poolAllocations: ["50% Aave", "30% Compound", "20% Reserve"],
    lendAPR: 4.5,
    borrowAPR: 6.2,
    tvl: "$12.5M",
    utilization: 85,
    riskScore: "Low",
    logo: "/assets/logos/wbtcLogo.svg",
  },
  {
    id: "2",
    name: "ETH Flexible",
    symbol: "ETHS",
    asset: "ETH",
    chain: "Ethereum",
    poolAllocations: ["40% Lido", "35% RocketPool", "25% Stakewise"],
    lendAPR: 3.2,
    borrowAPR: 5.8,
    tvl: "$45.2M",
    utilization: 92,
    riskScore: "Medium",
    logo: "/assets/logos/ethOriLogo.png",
  },
  {
    id: "3",
    name: "srUSD Multi",
    symbol: "srUSD",
    asset: "Multi",
    chain: "Ethereum",
    poolAllocations: ["30% ETH", "25% wBTC", "25% stETH", "20% cbBTC"],
    lendAPR: 5.8,
    tvl: "$28.7M",
    utilization: 78,
    riskScore: "Low",
    logo: "/assets/logos/srUSD.png",
  },
];

/* ----------------------- Small UI Primitives ----------------------- */

const Badge = ({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "positive" | "warning" | "danger";
}) => {
  const tones: Record<string, string> = {
    default: "text-white/70 bg-white/5 ring-1 ring-white/10",
    positive: "text-emerald-300 bg-emerald-500/10 ring-1 ring-emerald-400/20",
    warning: "text-amber-300 bg-amber-500/10 ring-1 ring-amber-400/20",
    danger: "text-rose-300 bg-rose-500/10 ring-1 ring-rose-400/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

const GhostButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/80 ring-1 ring-white/10 hover:bg-white/6 transition-colors"
  >
    {children}
  </button>
);

const PrimaryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2F6BD8] shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-colors"
  >
    {children}
  </button>
);

const TinyBar = ({ value }: { value: number }) => (
  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
    <div
      className={`h-full rounded-full ${
        value >= 90
          ? "bg-rose-400"
          : value >= 75
          ? "bg-amber-300"
          : "bg-emerald-400"
      }`}
      style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
    />
  </div>
);

/* ----------------------- Table Component ----------------------- */

export default function EarnTable({
  showHeader = false, // set true kalau mau tampilin judul/subjudul di dalam komponen
}: {
  showHeader?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [chain, setChain] = useState("All Chains");
  const [asset, setAsset] = useState("All Assets");
  const [pools] = useState<EarnPool[]>(mockData);

  const filtered = useMemo(() => {
    return pools.filter((p) => {
      const matchesQuery =
        !query ||
        [p.name, p.symbol, p.asset, p.chain]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesChain =
        chain === "All Chains" || p.chain.toLowerCase() === chain.toLowerCase();
      const matchesAsset =
        asset === "All Assets" || p.asset.toLowerCase() === asset.toLowerCase();
      return matchesQuery && matchesChain && matchesAsset;
    });
  }, [pools, query, chain, asset]);

  return (
    <div className="rounded-2xl w-full max-w-6xl p-5 mx-auto">
      {/* Optional Title */}
      {showHeader && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Earn</h2>
          <p className="text-sm text-white/60">
            Discover yield opportunities with competitive APRs.
          </p>
        </div>
      )}

      {/* Surface */}
      <div className="rounded-2xl ring-1 ring-white/10 overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ">
        {/* Toolbar */}
        <div className="px-4 py-3 border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] grid grid-cols-1 md:grid-cols-3 gap-2">
          <select
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            className="w-full appearance-none rounded-xl bg-white/[0.03] text-white/90 px-3 py-2 text-sm ring-1 ring-white/10 hover:bg-white/[0.06] transition-colors"
          >
            <option>All Chains</option>
            <option>Ethereum</option>
            <option>Arbitrum</option>
          </select>

          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="w-full appearance-none rounded-xl bg-white/[0.03] text-white/90 px-3 py-2 text-sm ring-1 ring-white/10 hover:bg-white/[0.06] transition-colors"
          >
            <option>All Assets</option>
            <option>ETH</option>
            <option>wBTC</option>
            <option>USDC</option>
          </select>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pools…"
            className="w-full rounded-xl bg-white/[0.03] text-white/90 placeholder:text-white/30 px-3 py-2 text-sm ring-1 ring-white/10 hover:bg-white/[0.06] transition-colors"
          />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-10 border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="grid grid-cols-12 gap-3 px-4 py-2 text-[11px] uppercase tracking-wide text-white/55">
            <div className="col-span-4 md:col-span-4">Pool</div>
            <div className="hidden md:block md:col-span-2">Asset</div>
            <div className="hidden md:block md:col-span-2">Chain</div>
            <div className="col-span-2 md:col-span-1 text-right">APR</div>
            <div className="col-span-3 md:col-span-2">Utilization</div>
            <div className="hidden md:block md:col-span-1 text-right">TVL</div>
            <div className="col-span-3 md:col-span-2 text-right md:text-center">
              Actions
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/8">
          {filtered.map((pool, idx) => (
            <div
              key={pool.id}
              className={`px-4 py-3 grid grid-cols-12 gap-3 items-center transition-colors ${
                idx % 2 === 1 ? "bg-white/[0.015]" : ""
              } hover:bg-white/[0.04]`}
            >
              {/* Pool */}
              <div className="col-span-12 md:col-span-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Image
                    src={pool.logo}
                    alt={pool.symbol}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <div className="min-w-0">
                    <div className="text-white text-sm font-medium truncate">
                      {pool.name}
                    </div>
                    <div className="text-white/40 text-[12px] truncate">
                      {pool.symbol}
                    </div>
                  </div>
                  {pool.riskScore && (
                    <Badge
                      tone={
                        pool.riskScore === "Low"
                          ? "positive"
                          : pool.riskScore === "High"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {pool.riskScore}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Asset */}
              <div className="hidden md:block md:col-span-2">
                <div className="text-white text-sm">{pool.asset}</div>
                <div className="text-white/40 text-[12px] truncate">
                  {pool.poolAllocations[0]}
                </div>
              </div>

              {/* Chain */}
              <div className="hidden md:block md:col-span-2">
                <div className="text-white text-sm">{pool.chain}</div>
              </div>

              {/* APR */}
              <div className="col-span-2 md:col-span-1 text-right tabular-nums">
                <Badge tone="positive">{pool.lendAPR}%</Badge>
              </div>

              {/* Utilization */}
              <div className="col-span-3 md:col-span-2 flex items-center gap-3">
                <div className="flex-1">
                  <TinyBar value={pool.utilization} />
                </div>
                <div className="w-10 text-right text-sm tabular-nums text-white/80">
                  {pool.utilization}%
                </div>
              </div>

              {/* TVL */}
              <div className="hidden md:block md:col-span-1 text-right tabular-nums text-white/90">
                {pool.tvl}
              </div>

              {/* Actions */}
              <div className="col-span-3 md:col-span-2 flex justify-end md:justify-center gap-2">
                <PrimaryButton>Deposit</PrimaryButton>
                <GhostButton>Withdraw</GhostButton>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-4 py-10 text-center text-white/60 text-sm">
              No pools match your filters.
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <p className="mt-3 text-[11px] text-white/45 text-center">
        APRs are indicative and can change with market conditions.
      </p>
    </div>
  );
}
