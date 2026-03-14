"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const prefLabel: Record<string, string> = {
  essencial: "Essencial",
  muito: "Quero muito",
  ok: "Opcional",
};

export default function GiftCard({ gift }: any) {
  return (
    <Link href={`/gifts/${gift.slug}`} prefetch={false}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
      >
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <motion.img
            src={gift.image}
            alt={gift.name}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[3/4] object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <div className="mt-4">
          <h2 className="text-base font-medium leading-snug">{gift.name}</h2>

          <div className="mt-2 flex items-center gap-3">
            <span className="text-sm text-black/70">
              R$ {gift.price.toFixed(2).replace(".", ",")}
            </span>

            <span className="text-xs rounded-full border border-black/10 px-3 py-1 text-black/60">
              {prefLabel[gift.preference]}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
