"use client";

import { Copy, ExternalLink } from "lucide-react";
import { CONTACTS } from "@/data/services";
import { copyToClipboard } from "@/lib/format";
import { DiscordIcon, FacebookIcon, TikTokIcon } from "./BrandIcons";
import { useToast } from "./Toast";

export function ContactSection() {
  const toast = useToast();

  const copyDiscord = async () => {
    const ok = await copyToClipboard(CONTACTS.discord);
    toast(ok ? "Đã sao chép Discord" : "Không sao chép được, hãy copy thủ công", ok ? "success" : "error");
  };

  return (
    <section id="lien-he" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="glass glow-border relative overflow-hidden p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-fuchsia-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-sky-600/20 blur-3xl" />
        <div className="relative text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-violet-300 uppercase">Liên hệ & Đặt lịch</p>
          <h2 className="section-title mt-2">
            Nhắn cho <span className="font-script text-gradient">Jano</span> ngay hôm nay
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Gửi phiếu đặt đã copy qua Messenger hoặc Discord. Theo dõi TikTok để cập nhật lịch nhận đơn, slot combo và các bản cày mới nhất.
          </p>
        </div>

        <div className="relative mt-8 grid gap-4 md:grid-cols-3">
          <a
            href={CONTACTS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-[#4c8dff]/30 bg-[#1877f2]/10 p-5 transition hover:-translate-y-1 hover:bg-[#1877f2]/20"
          >
            <FacebookIcon className="size-8 text-[#4c8dff]" />
            <p className="mt-3 font-display text-lg font-bold text-white">Facebook / Messenger</p>
            <p className="text-sm text-slate-400">facebook.com/janonasukii</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8ab4ff]">
              Đặt lịch / Nhắn tin ngay <ExternalLink className="size-3.5" />
            </span>
          </a>

          <button
            onClick={copyDiscord}
            className="group rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-5 text-left transition hover:-translate-y-1 hover:bg-indigo-500/20"
          >
            <DiscordIcon className="size-8 text-indigo-300" />
            <p className="mt-3 font-display text-lg font-bold text-white">Discord</p>
            <p className="font-mono text-sm text-slate-300">{CONTACTS.discord}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-200">
              <Copy className="size-3.5" /> Copy 1 chạm
            </span>
          </button>

          <a
            href={CONTACTS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-pink-400/30 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 p-5 transition hover:-translate-y-1 hover:from-cyan-500/20 hover:to-pink-500/20"
          >
            <TikTokIcon className="size-8 text-white drop-shadow-[2px_2px_0_rgb(255_0_80/0.7)]" />
            <p className="mt-3 font-display text-lg font-bold text-white">TikTok</p>
            <p className="text-sm text-slate-400">{CONTACTS.tiktokHandle}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pink-200">
              Xem kênh <ExternalLink className="size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950/60 pb-20 lg:pb-0">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-script text-2xl text-white">Jano</span>
          <span>© {new Date().getFullYear()} — Cày thuê Genshin Impact & Honkai: Star Rail</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={CONTACTS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-9 place-items-center rounded-lg hover:bg-white/10 hover:text-white">
            <FacebookIcon className="size-4" />
          </a>
          <a href={CONTACTS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid size-9 place-items-center rounded-lg hover:bg-white/10 hover:text-white">
            <TikTokIcon className="size-4" />
          </a>
          <a href="#lien-he" aria-label="Discord" className="grid size-9 place-items-center rounded-lg hover:bg-white/10 hover:text-white">
            <DiscordIcon className="size-4" />
          </a>
        </div>
      </div>
      <p className="pb-6 text-center text-[11px] text-slate-600">
        Genshin Impact, Honkai: Star Rail và Zenless Zone Zero là thương hiệu của HoYoverse. Jano là dịch vụ cá nhân, không liên kết với HoYoverse.
      </p>
    </footer>
  );
}
