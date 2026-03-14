"use client";

import { motion } from "framer-motion";
import BackgroundFX from "@/components/BackgroundFX";
import Header from "@/components/Header";


export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      <Header />
      <BackgroundFX />

      <motion.div
        initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl px-6"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          Ideias para me dar  
          <br />
          de presente, se você não faz ideia do que dar.
        </h1>

        <p className="mt-6 text-gray-600 text-base sm:text-lg">
          08 . 04 . 2004
        </p>
      </motion.div>
    </section>
  );
}
 