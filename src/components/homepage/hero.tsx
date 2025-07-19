import React from 'react'
import { Subtitle } from "@/components/homepage/subtite";
import { Globe } from "@/components/magicui/globe";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { InteractiveHoverButton } from '../magicui/interactive-hover-button';
import { ShimmerButton } from '../magicui/shimmer-button';
import { InteractiveShimmerButton } from '../magicui/interactive-shimmer-btn';

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
          <span className='font-bitcount font-bold'>Welcome to</span>
          <div className="block sm:inline text-white dark:text-gray-200">
            <SparklesText><span className='text-violet-500'>{'<'}</span>Job
            <span className="text-red-400">less</span>
            Coders<span className='text-violet-500'>{'/>'}</span></SparklesText>
          </div>
        </h1>
        <Subtitle />
        <InteractiveShimmerButton className="mt-4">Get Started</InteractiveShimmerButton>
      </div>
      
    </div>
  )
}
