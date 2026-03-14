"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TopBackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 right-6 z-50"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-black backdrop-blur hover:bg-white transition"
      >
        ← Voltar
      </Link>
    </motion.div>
  );
}