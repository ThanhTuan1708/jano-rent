"use client";

import { useEffect, useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { CONTACTS } from "@/data/services";
import { FacebookIcon, TikTokIcon } from "./BrandIcons";

const NAV = [
  { href: "#dich-vu", label: "Bảng giá" },
  { href: "#bang-gia-goc", label: "Ảnh bảng giá" },
  { href: "#feedback", label: "Feedback" },
  { href: "#quy-trinh", label: "Quy trình" },
  { href: "#faq", label: "FAQ" },
  { href: "#lien-he", label: "Liên hệ" },
];

interface Props {
  itemCount: number;
  onCartClick: () => void;
}

export function Header({ itemCount, onCartClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || menuOpen ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2" onClick={() => setMenuOpen(false)}>
          <span className="font-script text-3xl leading-none text-white drop-shadow-[0_0_12px_rgb(167_139_250/0.7)]">Jano</span>
          <span className="hidden text-[10px] font-semibold tracking-[0.2em] text-violet-300/80 uppercase sm:inline">Cày thuê</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={CONTACTS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Jano"
            className="hidden size-9 place-items-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-[#4c8dff] sm:grid"
          >
            <FacebookIcon className="size-4.5" />
          </a>
          <a
            href={CONTACTS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok Jano"
            className="hidden size-9 place-items-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white sm:grid"
          >
            <TikTokIcon className="size-4.5" />
          </a>
          <button
            onClick={onCartClick}
            className="relative inline-flex items-center gap-2 rounded-xl border border-violet-400/40 bg-violet-500/15 px-3 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/25"
          >
            <ShoppingCart className="size-4" />
            <span className="hidden sm:inline">Giỏ dịch vụ</span>
            {itemCount > 0 && (
              <span className="grid min-w-5 place-items-center rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-1.5 text-[11px] leading-5 font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Mở menu"
            aria-expanded={menuOpen}
            className="grid size-9 place-items-center rounded-lg text-slate-300 hover:bg-white/10 md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="fade-in border-t border-white/10 px-4 pt-2 pb-4 md:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-slate-200 hover:bg-white/5">
              {n.label}
            </a>
          ))}
          <div className="mt-2 flex gap-2 px-3">
            <a href={CONTACTS.facebook} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 py-2">
              <FacebookIcon className="size-4" /> Facebook
            </a>
            <a href={CONTACTS.tiktok} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 py-2">
              <TikTokIcon className="size-4" /> TikTok
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
