"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BadgeCheck, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { CONTACTS } from "@/data/services";

/**
 * Ảnh feedback / giao dịch thật của khách.
 * Thêm ảnh: chép file vào public/feedback/ rồi thêm 1 dòng vào mảng dưới.
 * Lưu ý: che họ tên, số tài khoản, mã OTP trước khi đưa ảnh lên.
 */
const FEEDBACKS = [
  { src: "/feedback/fb-01.jpg", game: "Genshin", title: "Ảo Cảnh Hiểm Ác — full huy hiệu" },
  { src: "/feedback/fb-02.jpg", game: "Genshin", title: "Ảo Cảnh Tuyệt Cảnh — “Quá ghê gớm”" },
  { src: "/feedback/fb-03.jpg", game: "Genshin", title: "Ảo Cảnh Hiểm Ác — có quay video" },
  { src: "/feedback/fb-04.jpg", game: "Genshin", title: "Nhà Hát Giả Tưởng — full thưởng" },
  { src: "/feedback/fb-05.jpg", game: "Genshin", title: "Chạy map 100% khám phá" },
  { src: "/feedback/fb-06.jpg", game: "Genshin", title: "Ảo Cảnh — chuyển khoản 50k" },
  { src: "/feedback/fb-07.jpg", game: "Genshin", title: "Cày roll — dư thêm 3 roll" },
  { src: "/feedback/fb-08.jpg", game: "Đơn xả nhựa", title: "Up thiên phú & farm — 195k" },
  { src: "/feedback/fb-09.jpg", game: "ZZZ", title: "Zenless Zone Zero — hoàn thành" },
  { src: "/feedback/fb-10.jpg", game: "Star Rail", title: "“Á đù nhanh dữ” — cảm ơn sốp" },
  { src: "/feedback/fb-11.jpg", game: "Genshin", title: "Chạy map 100% — Đỉnh Sải Cánh" },
  { src: "/feedback/fb-12.jpg", game: "ZZZ", title: "Zenless Zone Zero — hoàn thành & bột nhựa" },
  { src: "/feedback/fb-13.jpg", game: "Genshin", title: "Ảo Cảnh Tuyệt Cảnh — “Đù cháy”" },
  { src: "/feedback/fb-14.jpg", game: "Giao dịch", title: "Chuyển khoản + bonus thêm cho Jano" },
];

const GAME_TONE: Record<string, string> = {
  Genshin: "border-amber-300/40 bg-amber-400/15 text-amber-100",
  "Star Rail": "border-fuchsia-300/40 bg-fuchsia-400/15 text-fuchsia-100",
  ZZZ: "border-lime-300/40 bg-lime-400/15 text-lime-100",
};

export function FeedbackGallery() {
  const [active, setActive] = useState<number | null>(null);
  const n = FEEDBACKS.length;

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % n));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + n) % n));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, n]);

  return (
    <section id="feedback" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-violet-300 uppercase">Feedback & Giao dịch</p>
        <h2 className="section-title mt-2">Khách nói gì về Jano</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-400">
          Ảnh chụp tin nhắn bàn giao đơn và giao dịch thật với khách. Bấm vào ảnh để phóng to.
        </p>
        <a
          href={CONTACTS.legit}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mt-5 inline-flex px-5 py-2.5 text-sm"
        >
          <BadgeCheck className="size-4 text-emerald-300" /> Xem thêm bài check legit <ExternalLink className="size-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {FEEDBACKS.map((fb, i) => (
          <button
            key={fb.src}
            onClick={() => setActive(i)}
            className="group glass block w-full overflow-hidden p-0 text-left transition hover:-translate-y-1 hover:border-violet-400/40"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-black">
              <Image
                src={fb.src}
                alt={`Feedback: ${fb.title}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <span
                className={`absolute top-2 left-2 rounded-full border px-2 py-0.5 text-[11px] font-semibold backdrop-blur ${
                  GAME_TONE[fb.game] ?? "border-sky-300/40 bg-sky-400/15 text-sky-100"
                }`}
              >
                {fb.game}
              </span>
            </div>
            <p className="px-3 py-2.5 text-xs leading-snug font-medium text-slate-200">{fb.title}</p>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={FEEDBACKS[active].title}
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
              setActive((active - 1 + n) % n);
            }}
            className="absolute left-2 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="relative flex max-h-full w-full max-w-xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={FEEDBACKS[active].src}
              alt={FEEDBACKS[active].title}
              width={1179}
              height={2000}
              className="h-auto max-h-[82vh] w-auto rounded-xl object-contain"
            />
            <p className="mt-3 text-center text-sm text-slate-300">
              {FEEDBACKS[active].title} <span className="text-slate-500">({active + 1}/{n})</span>
            </p>
          </div>
          <button
            aria-label="Ảnh sau"
            onClick={(e) => {
              e.stopPropagation();
              setActive((active + 1) % n);
            }}
            className="absolute right-2 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}
