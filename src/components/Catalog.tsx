"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Info, ListChecks, Search, SearchX, X } from "lucide-react";
import { CATEGORIES, GAMES, SERVICES, type GameId, type Service } from "@/data/services";
import type { CartState } from "@/lib/cart";
import { normalizeText } from "@/lib/format";
import { GAME_THEME } from "@/lib/theme";
import { ServiceCard } from "./ServiceCard";

type Filter = "all" | GameId;

interface Props {
  cart: CartState;
  onToggle: (id: string) => void;
  onQuantity: (id: string, qty: number) => void;
}

const SEARCH_SUGGESTIONS = ["La Hoàn", "Penacony", "Vũ trụ", "Map", "Thần đồng", "Combo", "Roll", "MOC"];

// Chuẩn bị sẵn chuỗi tìm kiếm cho từng dịch vụ
const SEARCH_INDEX: Record<string, string> = Object.fromEntries(
  SERVICES.map((s) => {
    const category = CATEGORIES.find((c) => c.id === s.categoryId);
    const haystack = [s.name, s.note, category?.title, category?.description, GAMES[s.game].name, s.contact ? "ib trao doi" : "", ...(s.keywords ?? [])]
      .filter(Boolean)
      .join(" | ");
    return [s.id, normalizeText(haystack)];
  }),
);

export function Catalog({ cart, onToggle, onQuantity }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [onlySelected, setOnlySelected] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const grouped = useMemo(() => {
    const phrase = normalizeText(deferredQuery).replace(/\s+/g, " ");
    const terms = phrase.split(" ").filter(Boolean);
    const baseMatch = (s: Service) => {
      if (filter !== "all" && s.game !== filter) return false;
      if (onlySelected && !cart[s.id]) return false;
      return true;
    };
    // Ưu tiên khớp nguyên cụm từ; nếu không có kết quả mới khớp từng từ riêng lẻ
    const phraseMatch = (s: Service) => SEARCH_INDEX[s.id].includes(phrase);
    const termsMatch = (s: Service) => terms.every((t) => SEARCH_INDEX[s.id].includes(t));
    let matcher: (s: Service) => boolean = () => true;
    if (terms.length > 0) {
      matcher = SERVICES.some((s) => baseMatch(s) && phraseMatch(s)) ? phraseMatch : termsMatch;
    }
    return CATEGORIES.map((category) => ({
      category,
      services: SERVICES.filter((s) => s.categoryId === category.id && baseMatch(s) && matcher(s)),
    })).filter((g) => g.services.length > 0);
  }, [filter, deferredQuery, onlySelected, cart]);

  const resultCount = grouped.reduce((n, g) => n + g.services.length, 0);
  const selectedCount = Object.keys(cart).length;

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Tất cả", count: SERVICES.length },
    { id: "genshin", label: "Genshin Impact", count: SERVICES.filter((s) => s.game === "genshin").length },
    { id: "hsr", label: "Honkai: Star Rail", count: SERVICES.filter((s) => s.game === "hsr").length },
  ];

  return (
    <div className="min-w-0">
      {/* Thanh điều khiển */}
      <div className="glass relative z-30 mb-6 bg-ink-900/85 md:sticky md:top-[4.5rem] space-y-3 p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          <div role="tablist" aria-label="Chọn game" className="grid grid-cols-3 gap-1 rounded-xl bg-ink-900/80 p-1">
            {tabs.map((tab) => {
              const active = filter === tab.id;
              const activeClass =
                tab.id === "all"
                  ? "from-violet-600 to-indigo-600 shadow-violet-900/50"
                  : GAME_THEME[tab.id].tab;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-lg px-2 py-2 text-xs font-semibold whitespace-nowrap transition sm:px-3 sm:text-sm ${
                    active ? `bg-gradient-to-r text-white shadow-lg ${activeClass}` : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {tab.id === "hsr" ? (
                    <>
                      <span className="sm:hidden">Star Rail</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </>
                  ) : tab.id === "genshin" ? (
                    <>
                      <span className="sm:hidden">Genshin</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </>
                  ) : (
                    tab.label
                  )}
                  <span className="ml-1 hidden opacity-70 lg:inline">({tab.count})</span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Tìm dịch vụ: "Penacony", "La Hoàn", "Vũ trụ", "Map"...'
              aria-label="Tìm kiếm dịch vụ"
              className="input-field py-2.5 pr-9 pl-9"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Xoá tìm kiếm"
                className="absolute top-1/2 right-2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setOnlySelected((v) => !v)}
            aria-pressed={onlySelected}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium whitespace-nowrap transition ${
              onlySelected
                ? "border-violet-400/60 bg-violet-500/20 text-violet-100"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <ListChecks className="size-4" />
            <span className="hidden sm:inline">Đã chọn</span> ({selectedCount})
          </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 text-xs [scrollbar-width:none]">
          <span className="shrink-0 text-slate-500">Gợi ý:</span>
          {SEARCH_SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300 transition hover:border-violet-400/50 hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {(query || onlySelected) && (
        <p className="mb-4 text-sm text-slate-400">
          Tìm thấy <span className="font-semibold text-white">{resultCount}</span> dịch vụ
          {query && (
            <>
              {" "}
              cho “<span className="text-violet-300">{query}</span>”
            </>
          )}
        </p>
      )}

      {grouped.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 px-6 py-14 text-center">
          <SearchX className="size-10 text-slate-500" />
          <p className="font-semibold text-white">Không tìm thấy dịch vụ phù hợp</p>
          <p className="max-w-sm text-sm text-slate-400">
            Thử từ khoá khác hoặc nhắn Jano để được báo giá riêng cho yêu cầu của bạn nhé.
          </p>
          <button
            className="btn-ghost mt-1"
            onClick={() => {
              setQuery("");
              setOnlySelected(false);
              setFilter("all");
            }}
          >
            Xoá bộ lọc
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {(["genshin", "hsr"] as GameId[]).map((gameId) => {
            const groups = grouped.filter((g) => g.category.game === gameId);
            if (groups.length === 0) return null;
            const theme = GAME_THEME[gameId];
            return (
              <section key={gameId} id={`game-${gameId}`} className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{theme.emoji}</span>
                  <h3 className={`bg-gradient-to-r bg-clip-text font-display text-2xl font-bold text-transparent sm:text-3xl ${theme.gradient}`}>
                    {GAMES[gameId].name}
                  </h3>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                </div>

                {groups.map(({ category, services }) => (
                  <div key={category.id} id={category.id} className="glass p-4 sm:p-5">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="flex items-center gap-2 font-display text-lg font-bold text-white">
                          <span aria-hidden>{category.icon}</span>
                          {category.title}
                        </h4>
                        {category.description && <p className="mt-0.5 text-xs text-slate-400">{category.description}</p>}
                      </div>
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${theme.badge}`}>
                        {services.length} dịch vụ
                      </span>
                    </div>
                    {category.notice && (
                      <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-300/25 bg-amber-400/[0.07] px-3 py-2 text-xs text-amber-100/90">
                        <Info className="mt-0.5 size-3.5 shrink-0 text-amber-300" />
                        {category.notice}
                      </div>
                    )}
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {services.map((service) => (
                        <ServiceCard
                          key={service.id}
                          service={service}
                          quantity={cart[service.id] ?? 0}
                          onToggle={onToggle}
                          onQuantity={onQuantity}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
