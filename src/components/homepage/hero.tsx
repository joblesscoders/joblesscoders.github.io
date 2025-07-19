import React from "react";
import { Subtitle } from "@/components/homepage/subtite";
import { Globe } from "@/components/magicui/globe";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="relative flex items-center justify-center min-h-[45vh] sm:min-h-[55vh] md:min-h-[80vh] lg:min-h-[70vh]">
      {/* Globe Background - positioned absolutely to cover the area */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative h-[350px] xs:h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[700px] w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px]">
          <Globe className="opacity-20 sm:opacity-25 md:opacity-30" />
        </div>
      </div>

      {/* Text Content - positioned above the globe */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-7xl">
        <h1 className="pointer-events-none text-5xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-6 md:mb-8 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/60 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-200/10">
          <span className="font-bitcount font-bold">Welcome to</span>
          <div className="block sm:inline text-white dark:text-gray-200">
            <SparklesText>
              <span className="text-violet-500">{"<"}</span>Job
              <span className="text-red-400">less</span>
              Coders<span className="text-violet-500">{"/>"}</span>
            </SparklesText>
          </div>
        </h1>
        <Subtitle />
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] cursor-pointer">
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
          <AnimatedGradientText className="text-sm font-medium">
            Get Started with <strong>Jobless Coders</strong>
          </AnimatedGradientText>
          <ChevronRight
            className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </div>
  );
}
