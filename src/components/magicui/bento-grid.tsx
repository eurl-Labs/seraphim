import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[12rem] grid-cols-1 gap-4 ",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 flex flex-col border border-neutral-900 bg-background dark:bg-neutral-950 justify-between overflow-hidden rounded-xl", // Default to col-span-1
      "hover:shadow-md shadow-sm [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-5 mt-10 border-gray-300 dark:border-gray-600 shadow-inner  min-h-[300px] hover:shadow-lg transition-shadow duration-300">
      {" "}
      {/* Reduced padding */}
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-6">
        {" "}
        {/* Reduced hover translate */}
        <Icon className="h-8 w-8 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />{" "}
        {/* Smaller icon */}
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          {" "}
          {/* Smaller text */}
          {name}
        </h3>
        <p className="max-w-md text-xs text-neutral-400">{description}</p>{" "}
        {/* Smaller text */}
      </div>
      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-col items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <Button
          variant="link"
          asChild
          size="sm"
          className="pointer-events-auto p-0 text-xs" // Smaller text
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-3 w-3 rtl:rotate-180" />{" "}
            {/* Smaller icon */}
          </a>
        </Button>
      </div>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
