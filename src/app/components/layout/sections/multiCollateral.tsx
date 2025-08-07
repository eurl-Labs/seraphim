import { AnimatedBeamMultiCollateral } from "../../ui/beam";
import { FlipText } from "@/components/magicui/flip-text";
import { SparklesCore } from "../../ui/sparkles";

export default function MultiCollateral() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md">
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
      <FlipText className="text-md md:text-4xl font-bold -tracking-widest hidden md:block relative text-center z-20">
        Multiple Collateral Options.
      </FlipText>
      <FlipText className="text-md md:text-4xl font-bold -tracking-widest block md:hidden relative text-center z-20">
        Multiple
      </FlipText>
      <FlipText className="text-md md:text-4xl font-bold -tracking-widest block md:hidden relative text-center z-20">
        Collateral Options
      </FlipText>

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
