"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "../../components/navbar";

import {
  ethOriginalLogo,
  wBtcLogo,
  stEthLogo,
  cbBtcLogo,
  srUSDLogo,
  usdsLogo,
} from "../../../../public/assets/logos";

/* ----------------------------- Mock Data ----------------------------- */

const portfolioData = {
  totalAssets: 125_400,
  supplied: 85_200,
  borrowed: 40_200,
  netAPY: 4.8, // %
  healthFactor: 1.8,
};

const suppliedAssets = [
  { name: "Ethereum", symbol: "ETH", logo: ethOriginalLogo, amount: 10.5, value: 21_000, apy: 3.2 },
  { name: "Wrapped Bitcoin", symbol: "wBTC", logo: wBtcLogo, amount: 0.85, value: 34_000, apy: 2.8 },
];

const borrowedAssets = [
  { name: "Seraphim USD", symbol: "srUSD", logo: srUSDLogo, amount: 25_000, value: 25_000, rate: 4.5, collateralFactor: 75 },
];

const recentTransactions = [
  { type: "Deposit", asset: "ETH", amount: 5.0, timestamp: "2025-08-08 14:30" },
  { type: "Borrow", asset: "srUSD", amount: 10_000, timestamp: "2025-08-08 14:35" },
];

/* ----------------------------- Primitives ---------------------------- */

const fmtUSD = (n: number) =>
  `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const fmtPct = (n: number) => `${n.toFixed(2)}%`;

const SectionCard = ({
  title,
  subtitle,
  right,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`rounded-2xl ring-1 ring-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}
  >
    {(title || right || subtitle) && (
      <header className="flex items-start justify-between gap-4 px-5 pt-4">
        <div>
          {title && <h2 className="text-white font-semibold">{title}</h2>}
          {subtitle && <p className="text-xs text-white/60 mt-0.5">{subtitle}</p>}
        </div>
        {right}
      </header>
    )}
    <div className="p-5">{children}</div>
  </section>
);

const StatCard = ({
  label,
  value,
  tone = "default",
  hint,
}: {
  label: string;
  value: string;
  tone?: "default" | "positive" | "warning";
  hint?: string;
}) => {
  const color =
    tone === "positive"
      ? "text-emerald-300"
      : tone === "warning"
      ? "text-amber-300"
      : "text-white";
  return (
    <div className="rounded-xl bg-white/[0.03] ring-1 ring-white/10 p-4">
      <div className="text-xs text-white/60">{label}</div>
      <div className={`mt-1 text-lg font-semibold ${color}`}>{value}</div>
      {hint && <div className="text-[11px] text-white/40 mt-1">{hint}</div>}
    </div>
  );
};

const Chip = ({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "positive" | "warning" | "danger";
}) => {
  const tones: Record<string, string> = {
    default: "text-white/75 bg-white/5 ring-1 ring-white/10",
    positive: "text-emerald-300 bg-emerald-500/10 ring-1 ring-emerald-400/20",
    warning: "text-amber-300 bg-amber-500/10 ring-1 ring-amber-400/20",
    danger: "text-rose-300 bg-rose-500/10 ring-1 ring-rose-400/20",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] ${tones[tone]}`}>
      {children}
    </span>
  );
};

const TinyBar = ({ value }: { value: number }) => (
  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
    <div
      className={`h-full rounded-full ${
        value <= 1 ? "bg-rose-400" : value <= 1.25 ? "bg-amber-300" : "bg-emerald-400"
      }`}
      style={{ width: `${Math.min(100, (value / 2.5) * 100)}%` }}
    />
  </div>
);

/* -------------------------------- Page ------------------------------- */

export default function DashboardPage() {
  const [connectedWallet] = useState("0x1234...5678");

  const riskTone = useMemo(() => {
    const hf = portfolioData.healthFactor;
    if (hf <= 1) return "danger";
    if (hf <= 1.25) return "warning";
    return "positive";
  }, []);

  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        backgroundImage: "url('/assets/backgrounds/gradient-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      {/* Subtle overlays to calm the bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.10),transparent_60%)] pointer-events-none" />

      <main className="relative z-10">
        <div className="container mx-auto px-4 py-10 md:py-14">
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className="text-sm text-white/60">Monitor your positions and manage your assets.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-300">{connectedWallet}</span>
            </div>
          </div>

          {/* Top Row: KPIs + Quick actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
            <SectionCard className="lg:col-span-9">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <StatCard label="Total Assets" value={fmtUSD(portfolioData.totalAssets)} />
                <StatCard label="Supplied" value={fmtUSD(portfolioData.supplied)} />
                <StatCard label="Borrowed" value={fmtUSD(portfolioData.borrowed)} />
                <StatCard
                  label="Net APY"
                  value={fmtPct(portfolioData.netAPY)}
                  tone="positive"
                  hint="Projection based on current rates"
                />
                <div className="rounded-xl bg-white/[0.03] ring-1 ring-white/10 p-4">
                  <div className="text-xs text-white/60">Health Factor</div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="text-lg font-semibold">
                      {portfolioData.healthFactor.toFixed(2)}
                    </div>
                    <Chip
                      tone={riskTone === "danger" ? "danger" : riskTone === "warning" ? "warning" : "positive"}
                    >
                      {riskTone === "danger" ? "Critical" : riskTone === "warning" ? "High Risk" : "Healthy"}
                    </Chip>
                  </div>
                  <div className="mt-3">
                    <TinyBar value={portfolioData.healthFactor} />
                  </div>
                  <div className="mt-1 text-[11px] text-white/45">
                    Liquidation at HF ≤ 1.0
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              className="lg:col-span-3"
              title="Quick Actions"
              subtitle="Common operations"
            >
              <div className="grid grid-cols-3 gap-2">
                <button className="rounded-lg bg-[#3B82F6] hover:bg-[#2F6BD8] text-sm py-2 font-medium">
                  Deposit
                </button>
                <button className="rounded-lg bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-sm py-2">
                  Borrow
                </button>
                <button className="rounded-lg bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-sm py-2">
                  Repay
                </button>
              </div>
              <p className="mt-3 text-[11px] text-white/45">
                Tip: Keep HF above <span className="text-white/70">1.8</span> in volatile markets.
              </p>
            </SectionCard>
          </div>

          {/* Positions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* Supplied */}
            <SectionCard title="Supplied Assets" subtitle="Your interest-earning deposits">
              <div className="divide-y divide-white/10">
                {suppliedAssets.map((a) => (
                  <div key={a.symbol} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src={a.logo} alt={a.name} width={26} height={26} className="rounded-full" />
                      <div>
                        <div className="text-sm font-medium">{a.symbol}</div>
                        <div className="text-xs text-white/50">{a.amount} {a.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm tabular-nums">{fmtUSD(a.value)}</div>
                      <div className="text-xs text-emerald-300">{fmtPct(a.apy)} APY</div>
                    </div>
                  </div>
                ))}
                {suppliedAssets.length === 0 && (
                  <div className="py-6 text-center text-white/60 text-sm">No supplied assets yet.</div>
                )}
              </div>
            </SectionCard>

            {/* Borrowed */}
            <SectionCard title="Borrowed Assets" subtitle="Your outstanding debt">
              <div className="divide-y divide-white/10">
                {borrowedAssets.map((a) => (
                  <div key={a.symbol} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src={a.logo} alt={a.name} width={26} height={26} className="rounded-full" />
                      <div>
                        <div className="text-sm font-medium">{a.symbol}</div>
                        <div className="text-xs text-white/50">{a.amount.toLocaleString()} {a.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm tabular-nums">{fmtUSD(a.value)}</div>
                      <div className="text-xs text-amber-300">{fmtPct(a.rate)} APR</div>
                    </div>
                  </div>
                ))}
                {borrowedAssets.length === 0 && (
                  <div className="py-6 text-center text-white/60 text-sm">No borrowed assets yet.</div>
                )}
              </div>
            </SectionCard>
          </div>

          {/* Activity */}
          <SectionCard title="Recent Activity" subtitle="Last 24 hours">
            <div className="divide-y divide-white/10">
              {recentTransactions.map((tx, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-6 w-6 rounded-full inline-flex items-center justify-center text-[11px] ring-1 ring-white/10 ${
                        tx.type === "Deposit"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-sky-500/15 text-sky-300"
                      }`}
                    >
                      {tx.type[0]}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{tx.type}</div>
                      <div className="text-xs text-white/55">
                        {tx.asset} • {new Date(tx.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm tabular-nums">
                    {typeof tx.amount === "number" ? tx.amount.toLocaleString() : tx.amount}
                  </div>
                </div>
              ))}
              {recentTransactions.length === 0 && (
                <div className="py-6 text-center text-white/60 text-sm">No recent activity.</div>
              )}
            </div>
          </SectionCard>

          {/* Footer note */}
          <p className="mt-4 text-[11px] text-white/45 text-center">
            Rates are indicative and may change with market conditions.
          </p>
        </div>
      </main>
    </div>
  );
}
