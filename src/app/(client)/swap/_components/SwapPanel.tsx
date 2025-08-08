"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ethOriginalLogo,
  wBtcLogo,
  stEthLogo,
  cbBtcLogo,
  srUSDLogo,
  usdsLogo,
} from "../../../../../public/assets/logos";

/* ----------------------------- Types & Data ----------------------------- */

interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: any;
  price: number;   // mock oracle price in USD
  balance: number; // mock wallet balance (units)
  decimals: number;
}

const TOKENS: Token[] = [
  { id: "eth",  symbol: "ETH",  name: "Ethereum",         logo: ethOriginalLogo, price: 3420.5,  balance: 2.5,  decimals: 18 },
  { id: "wbtc", symbol: "wBTC", name: "Wrapped Bitcoin",  logo: wBtcLogo,        price: 67890.0, balance: 0.1,  decimals: 8 },
  { id: "steth",symbol: "stETH",name: "Staked Ethereum",  logo: stEthLogo,       price: 3415.2,  balance: 1.8,  decimals: 18 },
  { id: "cbbtc",symbol: "cbBTC",name: "Coinbase Bitcoin", logo: cbBtcLogo,       price: 67850.0, balance: 0.05, decimals: 8 },
  { id: "srusd",symbol: "srUSD",name: "Seraphim USD",     logo: srUSDLogo,       price: 1.0,     balance: 1000, decimals: 18 },
  { id: "usds", symbol: "USDS", name: "Sky Dollar",       logo: usdsLogo,        price: 0.998,   balance: 500,  decimals: 18 },
];

/* ----------------------------- Utilities ----------------------------- */

const fmtUSD = (n: number) =>
  `$${(isFinite(n) ? n : 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const clampToDecimals = (v: string, decimals: number) => {
  if (!v) return v;
  const [int, frac = ""] = v.split(".");
  return frac.length > decimals ? `${int}.${frac.slice(0, decimals)}` : v;
};

const reserveForGas = 0.01; // keep a tiny ETH buffer for gas

/* ------------------------------ Component ----------------------------- */

export default function SwapPanel() {
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]); // ETH
  const [toToken, setToToken] = useState<Token>(TOKENS[4]);     // srUSD
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [invertRate, setInvertRate] = useState(false);

  const [slippage, setSlippage] = useState<number>(0.5);
  const [customSlip, setCustomSlip] = useState<string>("");
  const [openFromList, setOpenFromList] = useState(false);
  const [openToList, setOpenToList] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const rate = useMemo(() => {
    const r = fromToken.price / toToken.price;
    return invertRate ? 1 / r : r;
  }, [fromToken, toToken, invertRate]);

  const priceImpact = 0.02; // mock: real apps compute from pool depth/route

  // compute toAmount from fromAmount
  useEffect(() => {
    if (!fromAmount) {
      setToAmount("");
      return;
    }
    const fa = parseFloat(fromAmount) || 0;
    const t = fa * (fromToken.price / toToken.price);
    setToAmount(t ? t.toFixed(6) : "");
  }, [fromAmount, fromToken, toToken]);

  // validation
  const maxSpendable =
    fromToken.id === "eth"
      ? Math.max(0, fromToken.balance - reserveForGas)
      : fromToken.balance;

  const exceedsBalance =
    fromAmount !== "" && parseFloat(fromAmount) > maxSpendable;

  const minReceived =
    toAmount ? (parseFloat(toAmount) * (1 - (customSlip ? parseFloat(customSlip) : slippage) / 100)) : 0;

  const canSwap =
    !!fromAmount &&
    !!toAmount &&
    !exceedsBalance &&
    parseFloat(fromAmount) > 0 &&
    fromToken.id !== toToken.id &&
    !isLoading;

  const priceImpactTone =
    priceImpact >= 5
      ? "text-rose-300"
      : priceImpact >= 1
      ? "text-amber-300"
      : "text-emerald-300";

  const slippageValue = customSlip ? Math.max(0, parseFloat(customSlip) || 0) : slippage;

  const setQuickSlip = (v: number) => {
    setSlippage(v);
    setCustomSlip("");
  };

  const handleSwapClick = async () => {
    if (!canSwap) return;
    setIsLoading(true);
    // mock delay
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    // reset inputs (demo)
    setFromAmount("");
    setToAmount("");
  };

  const selectToken = (side: "from" | "to", t: Token) => {
    if (side === "from") {
      if (t.id === toToken.id) setToToken(fromToken);
      setFromToken(t);
    } else {
      if (t.id === fromToken.id) setFromToken(toToken);
      setToToken(t);
    }
    setOpenFromList(false);
    setOpenToList(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold">Swap</h2>
          <div className="text-xs text-white/50">Best route • Mock</div>
        </div>

        {/* FROM */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/70">From</span>
            <span className="text-white/50">
              Balance:{" "}
              <span className="tabular-nums">
                {maxSpendable.toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </span>{" "}
              {fromToken.symbol}
            </span>
          </div>

          <div className={`rounded-xl ring-1 ring-white/10 bg-white/[0.03] p-4 ${exceedsBalance ? "ring-rose-400/40" : ""}`}>
            <div className="flex items-center gap-3">
              {/* Amount */}
              <div className="flex-1">
                <input
                  type="number"
                  inputMode="decimal"
                  value={fromAmount}
                  onChange={(e) =>
                    setFromAmount(clampToDecimals(e.target.value, fromToken.decimals))
                  }
                  placeholder="0.0"
                  className="w-full bg-transparent text-white text-2xl font-semibold placeholder:text-white/30 focus:outline-none"
                />
                <div className="text-xs text-white/40 mt-1">
                  {fmtUSD((parseFloat(fromAmount) || 0) * fromToken.price)}
                </div>
              </div>

              {/* Token selector */}
              <button
                onClick={() => setOpenFromList((s) => !s)}
                className="flex items-center gap-2 rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2 hover:bg-white/10"
              >
                <Image src={fromToken.logo} alt={fromToken.symbol} width={22} height={22} className="rounded-full" />
                <div className="text-left">
                  <div className="text-sm text-white">{fromToken.symbol}</div>
                  <div className="text-[10px] text-white/50">{fromToken.name}</div>
                </div>
                <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className="mt-2 flex justify-between">
              <button
                onClick={() => setFromAmount(Math.max(0, maxSpendable).toString())}
                className="text-xs text-sky-300 hover:text-sky-200"
              >
                Max
              </button>
              {exceedsBalance && (
                <span className="text-xs text-rose-300">Insufficient balance (kept {reserveForGas} ETH for gas)</span>
              )}
            </div>
          </div>

          {/* from list */}
          {openFromList && (
            <div className="rounded-xl ring-1 ring-white/10 bg-black/70 backdrop-blur p-2 max-h-64 overflow-auto">
              {TOKENS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => selectToken("from", t)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <Image src={t.logo} alt={t.symbol} width={20} height={20} className="rounded-full" />
                    <span className="text-sm">{t.symbol}</span>
                    <span className="text-xs text-white/40">{t.name}</span>
                  </div>
                  <span className="text-xs text-white/50 tabular-nums">{t.balance}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Switch */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              const a = fromToken;
              setFromToken(toToken);
              setToToken(a);
              // amounts recalculated by effect
            }}
            className="rounded-full p-2.5 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition-transform active:scale-95"
            aria-label="Swap tokens"
          >
            <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* TO */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/70">To</span>
            <span className="text-white/50">
              Balance: <span className="tabular-nums">{toToken.balance}</span> {toToken.symbol}
            </span>
          </div>

          <div className="rounded-xl ring-1 ring-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              {/* Amount */}
              <div className="flex-1">
                <input
                  type="number"
                  inputMode="decimal"
                  value={toAmount}
                  onChange={(e) => {
                    const clean = clampToDecimals(e.target.value, toToken.decimals);
                    setToAmount(clean);
                    const val = parseFloat(clean) || 0;
                    const back = val * (toToken.price / fromToken.price);
                    setFromAmount(back ? back.toFixed(6) : "");
                  }}
                  placeholder="0.0"
                  className="w-full bg-transparent text-white text-2xl font-semibold placeholder:text-white/30 focus:outline-none"
                />
                <div className="text-xs text-white/40 mt-1">
                  {fmtUSD((parseFloat(toAmount) || 0) * toToken.price)}
                </div>
              </div>

              {/* Token selector */}
              <button
                onClick={() => setOpenToList((s) => !s)}
                className="flex items-center gap-2 rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2 hover:bg-white/10"
              >
                <Image src={toToken.logo} alt={toToken.symbol} width={22} height={22} className="rounded-full" />
                <div className="text-left">
                  <div className="text-sm text-white">{toToken.symbol}</div>
                  <div className="text-[10px] text-white/50">{toToken.name}</div>
                </div>
                <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* to list */}
          {openToList && (
            <div className="rounded-xl ring-1 ring-white/10 bg-black/70 backdrop-blur p-2 max-h-64 overflow-auto">
              {TOKENS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => selectToken("to", t)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  <div className="flex items-center gap-2">
                    <Image src={t.logo} alt={t.symbol} width={20} height={20} className="rounded-full" />
                    <span className="text-sm">{t.symbol}</span>
                    <span className="text-xs text-white/40">{t.name}</span>
                  </div>
                  <span className="text-xs text-white/50 tabular-nums">{t.balance}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rate + Slippage */}
        <div className="rounded-xl ring-1 ring-white/10 bg-white/[0.02] p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Rate</span>
            <button
              onClick={() => setInvertRate((v) => !v)}
              className="text-white hover:text-white/80"
              title="Invert rate"
            >
              {invertRate
                ? `1 ${toToken.symbol} = ${(toToken.price / fromToken.price).toFixed(6)} ${fromToken.symbol}`
                : `1 ${fromToken.symbol} = ${(fromToken.price / toToken.price).toFixed(6)} ${toToken.symbol}`}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Price Impact</span>
            <span className={priceImpactTone}>&lt; {priceImpact}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Slippage</span>
            <div className="flex items-center gap-2">
              {[0.1, 0.5, 1].map((v) => (
                <button
                  key={v}
                  onClick={() => setQuickSlip(v)}
                  className={`px-2 py-1 rounded-lg text-xs ${
                    !customSlip && slippage === v
                      ? "bg-sky-500/20 text-sky-200 ring-1 ring-sky-400/30"
                      : "bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10"
                  }`}
                >
                  {v}%
                </button>
              ))}
              <div className="relative">
                <input
                  value={customSlip}
                  onChange={(e) => setCustomSlip(e.target.value)}
                  placeholder="Custom"
                  className="w-20 px-2 py-1 rounded-lg bg-white/5 text-xs text-white/80 ring-1 ring-white/10 placeholder:text-white/30"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/40">%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Minimum received</span>
            <span className="text-white">
              {toAmount ? `${minReceived.toFixed(6)} ${toToken.symbol}` : "—"}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleSwapClick}
          disabled={!canSwap}
          className="w-full rounded-xl py-3 font-semibold text-white transition-all disabled:bg-white/20 disabled:text-white/60 disabled:cursor-not-allowed bg-[#3B82F6] hover:bg-[#2F6BD8] shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
        >
          {isLoading ? "Swapping…" : !fromAmount ? "Enter amount" : exceedsBalance ? "Insufficient balance" : `Swap ${fromToken.symbol} → ${toToken.symbol}`}
        </button>

        {/* Footnote */}
        <p className="text-[11px] text-white/45 text-center">
          Quotes are simulated; slippage and impact are illustrative.
        </p>
      </div>
    </div>
  );
}
