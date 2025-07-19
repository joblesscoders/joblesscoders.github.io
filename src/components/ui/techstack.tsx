"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type TechIcon = {
  name: string;
  icon_dark: string;
};

interface PageProps {
  techIcons?: TechIcon[];
  rotate?: boolean;
}

export default function TechStack({techIcons = [], rotate = false}: PageProps) {
  const speed = rotate ? 20 : -20; // seconds for one complete cycle
  const duplicateCount = 5; // Number of times to duplicate the array

  return (
    <div className="relative w-max py-1 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: rotate ? [0, -100 * techIcons.length] : [-100 * techIcons.length, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: Math.abs(speed),
            ease: "linear",
          },
        }}
      >
        {/* Create multiple copies for seamless loop */}
        {[...Array(duplicateCount)].map((_, dupIndex) =>
          techIcons.map((tech, i) => (
            <motion.div
              key={`${dupIndex}-${i}`}
              className="flex items-center justify-center mx-1 min-w-[120px] flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <Image
                  src={`/assets/icons/${tech.icon_dark}`}
                  alt={tech.name}
                  width={32}
                  height={32}
                  className="flex-shrink-0"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap font-arima">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
      
      {/* Gradient fade effects */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>
    </div>
  );
}