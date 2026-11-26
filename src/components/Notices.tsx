import { BadgeCheck, ExternalLink, PartyPopper } from "lucide-react";
import { CONTACTS, HIGHLIGHT_NOTICES, LAUNCH_PROMO, TRADE_RULES } from "@/data/services";

const TONE: Record<(typeof HIGHLIGHT_NOTICES)[number]["tone"], string> = {
  pink: "border-pink-400/30 from-pink-500/15",
  blue: "border-sky-400/30 from-sky-500/15",
  gold: "border-amber-300/30 from-amber-400/15",
  red: "border-orange-400/30 from-orange-500/15",
};

function LaunchBanner() {
  return (
    <div
      id="khai-truong"
      className="glass glow-border relative mb-6 scroll-mt-24 overflow-hidden p-5 sm:p-7"
    >
      <div className="pointer-events-none absolute -top-20 -right-16 size-64 rounded-full bg-fuchsia-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-amber-500/15 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-xs font-bold tracking-wide text-amber-200 uppercase">
            <PartyPopper className="size-3.5" /> Khai trương
          </span>
          <h2 className="mt-3 font-display text-2xl leading-tight font-bold text-white sm:text-3xl">{LAUNCH_PROMO.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">{LAUNCH_PROMO.subtitle}</p>

          <div className="mt-4 rounded-2xl border border-pink-400/40 bg-gradient-to-r from-pink-500/20 to-violet-500/10 px-4 py-3">
            <p className="font-display text-lg font-bold text-white">🎉 −10% tổng hoá đơn</p>
            <p className="text-sm text-pink-100/90">{LAUNCH_PROMO.discount}.</p>
          </div>

          <p className="mt-5 text-xs font-semibold tracking-[0.15em] text-violet-300 uppercase">Nhận cả 3 tựa game HoYoverse</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {LAUNCH_PROMO.games.map((g) => (
              <li key={g.name} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm">
                <span className="font-semibold text-white">{g.name}</span>
                <span className="ml-1.5 text-xs text-slate-400">· {g.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-[0.15em] text-violet-300 uppercase">Một số điều cần lưu ý</p>
          {TRADE_RULES.map((r) => (
            <div key={r.title} className="rounded-2xl border border-white/10 bg-ink-900/60 p-4">
              <p className="flex items-center gap-2 font-display font-bold text-white">
                <span className="text-lg">{r.icon}</span>
                {r.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{r.text}</p>
            </div>
          ))}
          <a
            href={CONTACTS.legit}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost justify-center py-2.5 text-sm"
          >
            <BadgeCheck className="size-4 text-emerald-300" /> Xem bài check legit <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Notices() {
  return (
    <section aria-label="Khai trương & lưu ý quan trọng" className="mx-auto max-w-7xl px-4 sm:px-6">
      <LaunchBanner />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHT_NOTICES.map((n) => (
          <div key={n.title} className={`rounded-2xl border bg-gradient-to-br to-transparent p-4 backdrop-blur ${TONE[n.tone]}`}>
            <p className="flex items-center gap-2 font-display font-bold text-white">
              <span className="text-xl">{n.icon}</span>
              {n.title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{n.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
