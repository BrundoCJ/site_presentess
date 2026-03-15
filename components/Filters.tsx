"use client";

type Props = {
  sort: "asc" | "desc";
  setSort: (v: "asc" | "desc") => void;
  prefs: string[];
  setPrefs: (v: string[]) => void;
};

const PREFS = [
  { key: "1", label: "Seria Muito Legal" },
  { key: "2", label: "Quero Muito 🔥" },
  { key: "3", label: "Vou Ficar Feliz" },
  { key: "4", label: "Não tem erro" },
];

export default function Filters({ sort, setSort, prefs, setPrefs }: Props) {
  function togglePref(key: string) {
    if (prefs.includes(key)) setPrefs([]);
    else setPrefs([key]);
  }

  return (
    <aside className="w-full lg:w-[180px] shrink-0">
      <div className="sticky top-28 space-y-4">
        {/* Ordenação */}
        <div className="rounded-xl border border-black/10 bg-white/70 p-3 backdrop-blur">
          <p className="text-[11px] font-semibold tracking-wide text-black/70 uppercase">
            Preço
          </p>

          <div className="mt-2 flex flex-col gap-1.5">
            <button
              onClick={() => setSort("asc")}
              className={`rounded-full px-3 py-1.5 text-xs border transition ${
                sort === "asc"
                  ? "bg-black text-white border-black"
                  : "bg-white border-black/10 text-black/70 hover:bg-black/5"
              }`}
            >
              Mais barato
            </button>

            <button
              onClick={() => setSort("desc")}
              className={`rounded-full px-3 py-1.5 text-xs border transition ${
                sort === "desc"
                  ? "bg-black text-white border-black"
                  : "bg-white border-black/10 text-black/70 hover:bg-black/5"
              }`}
            >
              Mais caro
            </button>
          </div>
        </div>

        {/* Preferência */}
        <div className="rounded-xl border border-black/10 bg-white/70 p-3 backdrop-blur">
          <p className="text-[11px] font-semibold tracking-wide text-black/70 uppercase">
            Preferência
          </p>

          <div className="mt-2 space-y-1.5">
            {PREFS.map((p) => (
              <button
                key={p.key}
                onClick={() => togglePref(p.key)}
                className={`w-full rounded-lg px-3 py-1.5 text-left text-xs border transition ${
                  prefs.includes(p.key)
                    ? "bg-black text-white border-black"
                    : "bg-white border-black/10 text-black/70 hover:bg-black/5"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {prefs.length > 0 && (
            <button
              onClick={() => setPrefs([])}
              className="mt-2 text-[11px] text-black/40 hover:text-black/60 transition"
            >
              Limpar
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
