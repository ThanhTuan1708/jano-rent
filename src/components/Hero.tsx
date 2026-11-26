import Image from "next/image";
import { ArrowDown, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { CONTACTS, SERVICES } from "@/data/services";
import { FacebookIcon } from "./BrandIcons";

const STATS = [
  { value: "3", label: "Tựa game HoYoverse" },
  { value: `${SERVICES.length}+`, label: "Dịch vụ" },
  { value: "100%", label: "Cày tay, không tool" },
  { value: "24/7", label: "Báo tiến độ" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute top-20 -left-32 size-96 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 size-80 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
            <Sparkles className="size-3.5" /> Khai trương · Cày thuê Genshin, Star Rail & Zenless Zone Zero
          </span>
          <h1 className="mt-5 font-display text-4xl leading-[1.1] font-bold text-white sm:text-5xl lg:text-6xl">
            Để <span className="font-script text-5xl text-gradient sm:text-6xl lg:text-7xl">Jano</span> lo phần cày,
            <br className="hidden sm:block" /> bạn chỉ việc <span className="text-gradient">quay gacha</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            La Hoàn, Nhà Hát, chạy map, thần đồng, MoC, Pure Fiction, Vũ Trụ Mô Phỏng, combo phiên bản… Tích chọn dịch vụ để xem{" "}
            <span className="font-semibold text-white">giá tạm tính ngay lập tức</span> và gửi phiếu đặt cho Jano chỉ trong 1 phút.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#dich-vu" className="btn-primary px-6 py-3 text-base">
              Xem bảng giá & tính tiền <ArrowDown className="size-4" />
            </a>
            <a href={CONTACTS.facebook} target="_blank" rel="noopener noreferrer" className="btn-ghost px-6 py-3 text-base">
              <FacebookIcon className="size-4 text-[#4c8dff]" /> Đặt lịch / Nhắn tin ngay
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-400" /> Bảo mật tài khoản
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="size-4 text-amber-300" /> Live Discord minh chứng khi làm
            </span>
            <a href="#khai-truong" className="flex items-center gap-1.5 text-pink-200 hover:text-white">
              <Sparkles className="size-4 text-pink-300" /> Giảm 10% cho 10 khách đầu tiên
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="glass px-4 py-3">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-white">{s.value}</dd>
                <dd className="text-xs text-slate-400">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Collage ảnh nhân vật */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-md sm:block lg:max-w-[30rem]">
          <div className="pointer-events-none absolute inset-8 rounded-full bg-gradient-to-br from-violet-600/40 via-fuchsia-500/25 to-sky-500/30 blur-3xl" />

          {/* Ảnh chính — Genshin */}
          <div className="glow-border animate-float absolute top-[8%] left-[6%] w-[68%] overflow-hidden rounded-[2rem] shadow-2xl shadow-violet-950/70">
            <Image src="/hero/genshin.jpg" alt="Genshin Impact" width={1024} height={1024} priority className="h-auto w-full" />
          </div>

          {/* Star Rail */}
          <div className="absolute top-0 right-0 w-[40%] rotate-6 overflow-hidden rounded-3xl border-2 border-hsr-400/60 shadow-2xl shadow-fuchsia-950/70 transition duration-300 hover:rotate-0">
            <Image src="/hero/hsr.jpg" alt="Honkai: Star Rail" width={256} height={256} className="h-auto w-full" />
          </div>

          {/* Avatar tròn */}
          <div className="absolute right-[4%] bottom-[2%] w-[42%] -rotate-6 overflow-hidden rounded-full border-2 border-gi-400/60 shadow-2xl shadow-orange-950/70 transition duration-300 hover:rotate-0">
            <Image src="/hero/avatar.jpg" alt="Avatar Jano" width={512} height={512} className="h-auto w-full" />
          </div>

          <span className="absolute bottom-[10%] left-0 rounded-full border border-white/15 bg-ink-900/80 px-4 py-2 font-script text-2xl text-white shadow-xl backdrop-blur">
            Jano ✦
          </span>
        </div>
      </div>
    </section>
  );
}
