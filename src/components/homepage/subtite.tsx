"use client";

import React, { useState, useEffect, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// A simple utility function to combine class names, similar to `clsx` or `tailwind-merge`.
// Your project seems to have this at `@/lib/utils`.
const cn = (...inputs: (string | undefined | null | false)[]): string => {
  return inputs.filter(Boolean).join(' ');
}

// Defining the types for the component props for better type safety.
type Word = {
  text: string;
  className?: string;
};

type TypewriterEffectSmoothProps = {
  words: Word[];
  className?: string;
  cursorClassName?: string;
};

/**
 * A smooth typewriter effect component that reveals text word by word.
 * @param {TypewriterEffectSmoothProps} props - The props for the component.
 */
const TypewriterEffectSmooth: FC<TypewriterEffectSmoothProps> = ({
  words,
  className,
  cursorClassName,
}) => {
  // Maps the words array to split each word into an array of characters.
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  // Renders the words with their respective styling.
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <span
                key={`char-${index}`}
                className={cn(`dark:text-zinc-400 text-black`, word.className)}
              >
                {char}
              </span>
            ))}
            &nbsp;
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        animate={{ width: "fit-content" }}
        transition={{ duration: 2, ease: "linear", delay: 0.5 }}
      >
        <div
          className="text-xl sm:text-base md:text-lg lg:text-xl xl:text-4xl font-bold"
          style={{ whiteSpace: "nowrap" }}
        >
          {renderWords()}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px] h-7 sm:h-8 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};


/**
 * The Subtitle component that displays an infinite loop of sentences
 * using the TypewriterEffectSmooth component.
 */
const Subtitle: FC = () => {
  // The array of sentences to be displayed.
  const sentences: Word[][] = [
    [
      { text: "Welcome" },
      { text: "to" },
      { text: "Your"},
      { text: "Ultimate", className: "text-red-400 dark:text-red-400" },
      { text: "Solution." },
    ],
    [
      { text: "We" },
      { text: "build" },
      { text: "awesome", className: "text-blue-400 dark:text-blue-400" },
      { text: "apps." },
    ],
    [
      { text: "Your" },
      { text: "Vision," },
      { text: "Our", className: "text-green-400 dark:text-green-400" },
      { text: "Thinking." },
    ],
    [
      { text: "Turning" },
      { text: "Ideas", className: "text-purple-400 dark:text-purple-400" },
      { text: "Into" },
      { text: "Reality." },
    ],
    [
      { text: "Innovation" },
      { text: "Through", className: "text-yellow-400 dark:text-yellow-400" },
      { text: "Code." },
    ],
  ];

  // State to keep track of the current sentence index.
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // This timer will update the current index every 5 seconds.
    // The duration includes the animation time (2.5s) and time for the user to read (2.5s).
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 5000); // Change sentence every 5 seconds

    // Cleanup function to clear the interval when the component unmounts.
    return () => clearInterval(interval);
  }, [sentences.length]);

  return (
    // AnimatePresence ensures smooth transitions between sentences.
    <AnimatePresence mode="wait">
      <motion.div key={currentIndex}>
        <TypewriterEffectSmooth
          words={sentences[currentIndex]}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-2xl lg:text-3xl font-semibold text-center mb-4"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export { Subtitle };