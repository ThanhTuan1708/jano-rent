"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const IMAGES = [
  { src: "/pricing/bang-gia-endgame.jpg", title: "Endgame Genshin & Star Rail", desc: "La Hoàn, Nhà Hát, Ảo Cảnh, MOC/AS/PF, 0 Cycle, AA" },
  { src: "/pricing/bang-gia-genshin.jpg", title: "Bảng giá Genshin Impact", desc: "Chạy map, thần đồng, quest, daily, event, up, combo" },
  { src: "/pricing/bang-gia-hsr.jpg", title: "Bảng giá Honkai: Star Rail", desc: "Quest, daily-nhựa, event, chạy map, VTMP, combo" },
];

export function PriceGallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % IMAGES.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="bang-gia-goc" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-violet-300 uppercase">Bảng giá gốc</p>
        <h2 className="section-title mt-2">Ảnh bảng giá chính thức của Jano</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-400">Bấm vào ảnh để phóng to. Giá trên web được cập nhật đúng theo các bảng giá này.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            className="group glass overflow-hidden p-0 text-left transition hover:-translate-y-1 hover:border-violet-400/40"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image src={img.src} alt={img.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                <ZoomIn className="size-8 text-white" />
              </span>
            </div>
            <div className="p-4">
              <p className="font-display font-bold text-white">{img.title}</p>
              <p className="mt-1 text-xs text-slate-400">{img.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={IMAGES[active].title}
          className="fade-in fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <button aria-label="Đóng" className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X className="size-5" />
          </button>
          <button
            aria-label="Ảnh trước"
            onClick={(e) => {
              e.stopPropagation();
              setActive((active - 1 + IMAGES.length) % IMAGES.length);
            }}
            className="absolute left-2 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={IMAGES[active].src} alt={IMAGES[active].title} width={1920} height={1080} className="h-auto max-h-[85vh] w-full rounded-xl object-contain" />
            <p className="mt-3 text-center text-sm text-slate-300">
              {IMAGES[active].title} <span className="text-slate-500">({active + 1}/{IMAGES.length})</span>
            </p>
          </div>
          <button
            aria-label="Ảnh sau"
            onClick={(e) => {
              e.stopPropagation();
              setActive((active + 1) % IMAGES.length);
            }}
            className="absolute right-2 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}
