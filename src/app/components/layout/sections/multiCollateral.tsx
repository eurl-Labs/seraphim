import { AnimatedBeamMultiCollateral } from "../../ui/beam";
import { FlipText } from "@/components/magicui/flip-text";
import { SparklesCore } from "../../ui/sparkles";

export default function MultiCollateral() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md py-20">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Main Content Container with improved padding */}
      <div className="text-center space-y-8 relative z-20 max-w-4xl mx-auto px-6 md:px-8">
        {/* Title with adjusted spacing */}
        <div className="space-y-3 mb-12">
          <FlipText className="text-md md:text-4xl font-bold -tracking-widest hidden md:block">
            Multiple Collateral Options
          </FlipText>
          <FlipText className="text-md md:text-4xl font-bold -tracking-widest block md:hidden">
            Multiple
          </FlipText>
          <FlipText className="text-md md:text-4xl font-bold -tracking-widest block md:hidden">
            Collateral Options
          </FlipText>

          {/* Subtitle with improved spacing */}
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto pt-4">
            Leverage multiple assets as collateral to maximize your borrowing
            potential
          </p>
        </div>

        {/* Feature Grid with enhanced spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-8">
          {[
            {
              title: "Diverse Assets",
              description:
                "ETH, BTC, stablecoins and more supported as collateral",
            },
            {
              title: "Flexible Ratios",
              description: "Different collateral factors for various asset types",
            },
            {
              title: "Risk Management",
              description: "Smart rebalancing to maintain healthy positions",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 text-center hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-white text-sm font-medium mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section with proper spacing */}
        <div className="mt-12 pb-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-sm transition-all duration-300">
            Explore Collateral Options
          </button>
        </div>
      </div>

      <AnimatedBeamMultiCollateral />
    </main>
  );
}

export function SparklesPreview() {
  return (
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Build great products
      </h1>
    </div>
  );
}
