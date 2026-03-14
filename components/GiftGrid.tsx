"use client";

import { useMemo, useState } from "react";
import { gifts } from "@/data/gifts";
import GiftCard from "./GiftCard";
import Filters from "./Filters";

export default function GiftGrid() {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [prefs, setPrefs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = prefs.length > 0
      ? gifts.filter((g) => prefs.includes(g.preference))
      : [...gifts];

    return list.sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [sort, prefs]);

  return (
    <section className="w-full pb-24">
      {/* Botão de filtros visível só no mobile */}
      <div className="flex lg:hidden justify-end px-4 mb-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-xs border border-black/20 rounded-full px-4 py-2 bg-white/80 backdrop-blur"
        >
          {showFilters ? "Fechar filtros" : "Filtros"}
        </button>
      </div>

      {/* Filtros mobile (dropdown) */}
      {showFilters && (
        <div className="lg:hidden px-4 mb-4">
          <Filters sort={sort} setSort={setSort} prefs={prefs} setPrefs={setPrefs} />
        </div>
      )}

      <div className="flex items-start">
        {/* Sidebar — só desktop */}
        <div className="hidden lg:block pl-6 pr-4 pt-2 shrink-0">
          <Filters sort={sort} setSort={setSort} prefs={prefs} setPrefs={setPrefs} />
        </div>

        {/* Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:pr-8 lg:pl-0">
          {filtered.map((gift) => (
            <GiftCard key={gift.slug} gift={gift} />
          ))}
        </div>
      </div>
    </section>
  );
}
