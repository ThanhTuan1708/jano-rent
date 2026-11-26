"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ChevronUp, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useOrderInfo } from "@/hooks/useOrderInfo";
import { formatShort, formatVND } from "@/lib/format";
import { CartPanel } from "./CartPanel";
import { Catalog } from "./Catalog";
import { Header } from "./Header";

interface Props {
  /** Phần mở đầu (Hero, lưu ý) — render phía trên bảng giá */
  intro: ReactNode;
  /** Các section phía dưới bảng giá */
  children: ReactNode;
}

export function Storefront({ intro, children }: Props) {
  const cartApi = useCart();
  const orderInfo = useOrderInfo();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { summary } = cartApi;

  // Khoá cuộn nền khi mở drawer
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onResize = () => mq.matches && setDrawerOpen(false);
    mq.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [drawerOpen]);

  const openCart = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      document.getElementById("gio-dich-vu")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setDrawerOpen(true);
    }
  };

  const totalText = summary.hasRange
    ? `${formatShort(summary.total)} – ${formatShort(summary.totalMax)}`
    : formatVND(summary.total);

  return (
    <>
      <Header itemCount={summary.itemCount} onCartClick={openCart} />

      <main className="pb-24 lg:pb-0">
        {intro}

        <section id="dich-vu" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-violet-300 uppercase">Bảng giá & Tính tiền</p>
            <h2 className="section-title mt-2">Chọn dịch vụ — giá tự động cập nhật</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              Tích chọn dịch vụ từ cả 2 game, chỉnh số lượng bằng nút <b className="text-white">+ / −</b>. Danh sách được lưu tạm trên trình duyệt,
              lỡ reload cũng không mất.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_400px]">
            <Catalog cart={cartApi.cart} onToggle={cartApi.toggle} onQuantity={cartApi.setQuantity} />

            <aside id="gio-dich-vu" className="hidden lg:block">
              <div className="glass glow-border sticky top-[4.5rem] max-h-[calc(100vh-5.5rem)] overflow-y-auto p-4 [scrollbar-width:thin]">
                <CartPanel cartApi={cartApi} orderInfo={orderInfo} />
              </div>
            </aside>
          </div>
        </section>

        {children}
      </main>

      {/* Thanh giỏ dưới cùng (mobile / tablet) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <button onClick={() => setDrawerOpen(true)} className="flex min-w-0 flex-1 items-center gap-3 text-left" aria-label="Mở giỏ dịch vụ">
            <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <ShoppingCart className="size-5 text-white" />
              {summary.itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 grid min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] leading-5 font-bold text-fuchsia-700">
                  {summary.itemCount}
                </span>
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-slate-400">Tổng tạm tính</span>
              <span className="block truncate font-display text-lg leading-tight font-bold text-white">{totalText}</span>
            </span>
          </button>
          <button onClick={() => setDrawerOpen(true)} className="btn-primary shrink-0 px-4">
            Xem đơn <ChevronUp className="size-4" />
          </button>
        </div>
      </div>

      {/* Drawer giỏ (mobile / tablet) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Giỏ dịch vụ">
          <div className="fade-in absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="drawer-in absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-3xl border-t border-white/15 bg-ink-900 p-4 pb-8 shadow-2xl">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/20" />
            <div className="mx-auto max-w-2xl">
              <CartPanel cartApi={cartApi} orderInfo={orderInfo} onClose={() => setDrawerOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
