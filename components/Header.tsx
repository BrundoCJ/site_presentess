"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const fullText = "Lista de presentes";
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6">
      <div className="relative flex items-center justify-center">
        {/* BCJ canto superior esquerdo */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute left-0 text-lg font-semibold tracking-[0.28em] text-black/80"
        >
          BCJ
        </motion.div>

        {/* Texto central com máquina de escrever */}
        <div className="text-lg tracking-wide text-black/60">
          {text}
          <span
            className={`ml-0.5 inline-block w-[2px] h-[18px] bg-black/50 align-middle ${
              done ? "animate-pulse" : ""
            }`}
          />
        </div>
      </div>
    </header>
  );
}
