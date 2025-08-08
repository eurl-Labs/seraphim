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
          <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto pt-4">
            Leverage multiple assets as collateral to maximize your borrowing
            potential
          </p>
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
