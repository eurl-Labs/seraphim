import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
  LayersIcon,
  LockClosedIcon,
  BarChartIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import {
  srUSDLogo,
  usdsLogo,
  stEthLogo,
  wBtcLogo,
  ethOriginalLogo,
  cbBtcLogo,
  chainlinkLogo,
  thegraphLogo,
} from "../../../../../public/assets/logos";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { AuroraText } from "@/components/magicui/aurora-text";

const darkGradient = (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-800 opacity-80" />
);

const collateralGradient = (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" />
);

const theGraphGradient = (
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-teal-900/20" />
);

const analyticsGradient = (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-900/20 to-gray-900/20" />
);

const features = [
  {
    name: "Multi-Collateral Stablecoin with Automated Rebalancing",
    description:
      "Diversified collateral backing with ETH, wBTC, stETH, and cbBTC — automatically rebalanced for optimal stability and risk distribution.",
    href: "/collateral",
    cta: "Explore Collaterals",
    background: collateralGradient,
    className: "col-span-1 md:col-start-2 md:row-span-2 md:row-start-1 items-center flex justify-center",
    logos: [ethOriginalLogo, wBtcLogo, stEthLogo, cbBtcLogo],
  },
  {
    icon: (
      <Image
        src={thegraphLogo}
        alt="the graph Logo"
        width={32}
        height={32}
        className="rounded-full mb-5"
      />
    ),
    name: "Indexed Transparency with The Graph",
    description:
      "Utilizing The Graph for decentralized data indexing, srUSD enables fast and reliable access to historical and real-time protocol data.",
    href: "/indexing",
    cta: "View Subgraphs",
    background: theGraphGradient,
    className: "col-span-1 md:col-span-1 md:row-start-1",
  },

  {
    icon: (
      <Image
        src={chainlinkLogo}
        alt="chainlink Logo"
        width={32}
        height={32}
        className="rounded-full mb-5"
      />
    ),
    name: "Chainlink-Powered Oracle Feeds",
    description:
      "Powered by Chainlink, srUSD ensures accurate, tamper-proof price data for all collateral assets — enabling secure, real-time rebalancing and liquidation.",
    href: "/chainlink",
    cta: "Learn More",
    background: analyticsGradient,
    className: "col-span-1 md:col-start-3 md:row-start-2",
  },
  {
    icon: (
      <Image
        src={usdsLogo}
        alt="usds Logo"
        width={32}
        height={32}
        className="rounded-full mb-5"
      />
    ),
    name: "Support Any Stablecoin",
    description:
      "Integrates with multiple stablecoins like USDC, DAI, USDT, and more — enabling seamless deposits, swaps, and collateral options.",
    href: "/stablecoin-support",
    cta: "View Supported Assets",
    background: darkGradient,
    className: "col-span-1 md:col-start-1 md:row-start-2",
  },
  {
    icon: (
      <Image
        src={srUSDLogo}
        alt="srUSD Logo"
        width={32}
        height={32}
        className="rounded-full mb-5"
      />
    ),
    name: "srUSD: The Adaptive, Multi-Collateral Stablecoin",
    description:
      "srUSD is a decentralized stablecoin backed by a dynamic basket of assets like ETH, stETH, wBTC, and cbETH — powered by Seraphim’s real-time rebalancing engine for optimal stability and decentralization.",
    href: "/notifications",
    cta: "Setup Alerts",
    background: darkGradient,
    className: "col-span-1 md:col-start-1 md:row-start-1",
  },
];

const CustomBentoCard = ({ feature }: { feature: any }) => (
  <div
    key={feature.name}
    className={`group relative col-span-1 flex flex-col border border-neutral-900 bg-background dark:bg-neutral-950 justify-between overflow-hidden rounded-xl hover:shadow-md shadow-sm transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] ${feature.className}`}
  >
    <div>{feature.background}</div>
    <div className="p-5 mt-10 border-gray-300 dark:border-gray-600 shadow-inner min-h-[300px] hover:shadow-lg transition-shadow duration-300">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-6">
        {/* <feature.Icon className="h-8 w-8 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" /> */}
        {feature.icon && (
          <div className="h-8 w-10 mb-2 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75">
            {feature.icon}
          </div>
        )}
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          {feature.name}
        </h3>
        <p className="max-w-md text-xs text-neutral-400">
          {feature.description}
        </p>
        {feature.logos && (
          <div className="flex gap-2 mt-2">
            {feature.logos.map((logo: any, index: number) => (
              <Image
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                width={20}
                height={20}
                className="rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export function Features() {
  return (
    <section className="relative mx-auto pb-24 sm:pb-32 bg-slate-950">
      <BentoGrid className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 max-w-3xl mx-auto px-4">
        {features.map((feature) => (
          <CustomBentoCard key={feature.name} feature={feature} />
        ))}
      </BentoGrid>

      <div className="text-center mt-16 px-4">
        <h2 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-white">
          Experience the future of <AuroraText>DeFi</AuroraText> & Stablecoin.
        </h2>
        <p className="mt-6 text-md md:text-lg text-gray-300 max-w-2xl mx-auto">
          Built with cutting-edge technology to provide the most stable and
          secure multi-collateral stablecoin ecosystem.
        </p>
      </div>
    </section>
  );
}
