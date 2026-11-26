"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ClipboardCopy,
  Eye,
  EyeOff,
  Lightbulb,
  MessageCircle,
  Send,
  ShoppingCart,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import { CATEGORY_MAP, CONTACTS, GAMES, type GameId } from "@/data/services";
import type { CartApi } from "@/hooks/useCart";
import type { OrderInfoApi } from "@/hooks/useOrderInfo";
import { buildOrderText, formatRange, gameTotal, type CustomerInfo } from "@/lib/cart";
import { copyToClipboard, formatShort, formatVND } from "@/lib/format";
import { GAME_THEME } from "@/lib/theme";
import { DiscordIcon, FacebookIcon } from "./BrandIcons";
import { QuantityStepper } from "./QuantityStepper";
import { useToast } from "./Toast";

interface Props {
  cartApi: CartApi;
  orderInfo: OrderInfoApi;
  onClose?: () => void;
}

export function CartPanel({ cartApi, orderInfo, onClose }: Props) {
  const { summary, suggestions, setQuantity, remove, clear, applyCombo, toggle, cart } = cartApi;
  const toast = useToast();
  const { customer, setCustomer, orderCode } = orderInfo;
  const [formOpen, setFormOpen] = useState(true);
  const [preview, setPreview] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    if (!confirmClear) return;
    const t = window.setTimeout(() => setConfirmClear(false), 3000);
    return () => window.clearTimeout(t);
  }, [confirmClear]);

  const update = <K extends keyof CustomerInfo>(key: K, value: CustomerInfo[K]) =>
    setCustomer((prev) => ({ ...prev, [key]: value }));

  const empty = summary.itemCount === 0;
  const gamesInCart = (Object.keys(GAMES) as GameId[]).filter((g) => summary.byGame[g].length > 0);
  const uidGames = gamesInCart.length > 0 ? gamesInCart : (Object.keys(GAMES) as GameId[]);
  const orderText = empty ? "" : buildOrderText(cart, customer, orderCode || "JN");

  const missingUid = gamesInCart.some((g) => !(g === "genshin" ? customer.genshinUid : customer.hsrUid).trim());

  const handleCopy = async (openMessenger = false) => {
    if (empty) {
      toast("Bạn chưa chọn dịch vụ nào", "error");
      return;
    }
    // Gọi copy trước (đồng bộ trong cùng thao tác click), mở tab ngay sau để không bị chặn popup
    const pending = copyToClipboard(orderText);
    if (openMessenger) window.open(CONTACTS.facebook, "_blank", "noopener,noreferrer");
    const ok = await pending;
    if (ok) {
      toast(openMessenger ? "Đã sao chép đơn — dán vào Messenger để gửi Jano nhé!" : "Đã sao chép nội dung đơn!");
    } else {
      toast("Không sao chép được, hãy bấm “Xem trước” và copy thủ công", "error");
      setPreview(true);
    }
  };

  const copyDiscord = async () => {
    const ok = await copyToClipboard(CONTACTS.discord);
    toast(ok ? "Đã sao chép Discord" : "Không sao chép được Discord", ok ? "success" : "error");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-fuchsia-900/40">
            <ShoppingCart className="size-4.5 text-white" />
          </span>
          <div>
            <h3 className="font-display text-lg leading-tight font-bold text-white">Giỏ dịch vụ & Tạm tính</h3>
            <p className="text-xs text-slate-400">{summary.itemCount} mục đã chọn</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!empty && (
            <button
              onClick={() => {
                if (confirmClear) {
                  clear();
                  orderInfo.renewOrderCode();
                  setConfirmClear(false);
                  toast("Đã xoá toàn bộ giỏ dịch vụ");
                } else setConfirmClear(true);
              }}
              className={`rounded-lg px-2 py-1 text-xs font-medium transition ${
                confirmClear ? "bg-rose-500/20 text-rose-200" : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {confirmClear ? "Bấm lần nữa để xoá" : "Xoá hết"}
            </button>
          )}
          {onClose && (
            <button onClick={onClose} aria-label="Đóng giỏ" className="grid size-8 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white">
              <X className="size-5" />
            </button>
          )}
        </div>
      </div>

      {/* Danh sách */}
      {empty ? (
        <div className="rounded-xl border border-dashed border-white/15 px-4 py-8 text-center">
          <p className="text-3xl">🛒</p>
          <p className="mt-2 font-medium text-white">Chưa có dịch vụ nào</p>
          <p className="mt-1 text-xs text-slate-400">Tích chọn dịch vụ ở bảng giá để tự động tính tổng tiền.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {gamesInCart.map((gameId) => {
            const lines = summary.byGame[gameId];
            const t = gameTotal(lines);
            const theme = GAME_THEME[gameId];
            return (
              <div key={gameId} className="rounded-xl border border-white/10 bg-ink-900/50">
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                  <span className={`flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase ${theme.text}`}>
                    <span className={`size-1.5 rounded-full ${theme.dot}`} />
                    {GAMES[gameId].name}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">{formatRange(t.total, t.totalMax)}</span>
                </div>
                <ul className="divide-y divide-white/[0.06]">
                  {lines.map(({ service, quantity, subtotal, subtotalMax }) => (
                    <li key={service.id} className="flex flex-col gap-2 px-3 py-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm leading-snug font-medium text-white">
                            {service.name}
                            {service.variable && <TriangleAlert className="ml-1 inline size-3 -translate-y-px text-amber-300" />}
                          </p>
                          <p className="text-[11px] text-slate-500">{CATEGORY_MAP[service.categoryId]?.title}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <span className="text-sm font-semibold text-slate-100">
                            {service.contact ? (
                              <span className="text-xs text-sky-300">IB trao đổi</span>
                            ) : subtotalMax > subtotal ? (
                              `${formatShort(subtotal)}–${formatShort(subtotalMax)}`
                            ) : (
                              formatVND(subtotal)
                            )}
                          </span>
                          <button
                            onClick={() => remove(service.id)}
                            aria-label={`Bỏ ${service.name}`}
                            className="grid size-7 place-items-center rounded-md text-slate-500 transition hover:bg-rose-500/15 hover:text-rose-300"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                      {service.quantity && service.unit && (
                        <QuantityStepper
                          size="sm"
                          value={quantity}
                          min={service.quantity.min}
                          max={service.quantity.max}
                          unit={service.unit}
                          onChange={(q) => setQuantity(service.id, q)}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* Gợi ý combo */}
      {suggestions.map((s) => (
        <div key={s.rule.id} className="rounded-xl border border-emerald-400/30 bg-emerald-500/[0.08] p-3">
          <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-emerald-300 uppercase">
            <Lightbulb className="size-3.5" /> Gợi ý tiết kiệm
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-emerald-50/90">{s.rule.message}</p>
          <p className="mt-1.5 text-xs text-emerald-200/80">
            Mục lẻ liên quan: <span className="font-semibold">{formatVND(s.coveredTotal)}</span> → {s.combo.name}:{" "}
            <span className="font-semibold">{formatVND(s.combo.price)}</span>
            {s.saving > 0 && <span className="ml-1 rounded bg-emerald-400/20 px-1.5 py-0.5 font-bold text-emerald-200">-{formatShort(s.saving)}</span>}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <button
              onClick={() => {
                applyCombo(s.combo.id, s.coveredLines.map((l) => l.service.id));
                toast(`Đã chuyển sang ${s.combo.name}`);
              }}
              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-emerald-950 transition hover:bg-emerald-400"
            >
              Chuyển sang combo
            </button>
            <button
              onClick={() => {
                toggle(s.combo.id);
                toast(`Đã thêm ${s.combo.name}`);
              }}
              className="rounded-lg border border-emerald-400/40 px-3 py-1.5 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-400/10"
            >
              Thêm combo, giữ mục lẻ
            </button>
          </div>
          <p className="mt-2 text-[11px] text-emerald-200/60">* Phạm vi chính xác của combo Jano sẽ xác nhận khi chốt đơn.</p>
        </div>
      ))}

      {/* Cảnh báo */}
      {summary.variableLines.length > 0 && (
        <div className="rounded-xl border border-amber-300/30 bg-amber-400/[0.08] p-3 text-xs text-amber-100/90">
          <p className="flex items-center gap-1.5 font-bold text-amber-200">
            <TriangleAlert className="size-3.5" /> Giá có thể thay đổi
          </p>
          <p className="mt-1 leading-relaxed">
            Các mục <span className="font-semibold">{summary.variableLines.map((l) => l.service.name).join(", ")}</span> phụ thuộc tình trạng acc /
            tiến độ. Jano sẽ kiểm tra và báo giá chốt.
          </p>
        </div>
      )}
      {summary.contactLines.length > 0 && (
        <div className="rounded-xl border border-sky-300/30 bg-sky-400/[0.08] p-3 text-xs text-sky-100/90">
          <p className="flex items-center gap-1.5 font-bold text-sky-200">
            <MessageCircle className="size-3.5" /> IB trao đổi
          </p>
          <p className="mt-1 leading-relaxed">
            <span className="font-semibold">{summary.contactLines.map((l) => l.service.name).join(", ")}</span> chưa tính vào tổng — báo giá riêng khi
            nhắn tin.
          </p>
        </div>
      )}

      {/* Tổng */}
      <div className="glow-border rounded-xl bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-sky-600/10 p-4">
        <div className="flex items-end justify-between gap-2">
          <span className="text-sm text-slate-300">Tổng tạm tính</span>
          <span className="text-right font-display text-2xl leading-none font-bold text-white">
            {summary.hasRange ? (
              <>
                {formatVND(summary.total)}
                <span className="block text-sm font-semibold text-slate-300">đến {formatVND(summary.totalMax)}</span>
              </>
            ) : (
              formatVND(summary.total)
            )}
          </span>
        </div>
        {(summary.variableLines.length > 0 || summary.contactLines.length > 0) && (
          <p className="mt-2 text-[11px] text-slate-400">* Giá ước tính, chưa gồm các mục IB trao đổi / giá theo tình trạng acc.</p>
        )}
      </div>

      {/* Phiếu đặt */}
      <div className="rounded-xl border border-white/10 bg-ink-900/50">
        <button
          onClick={() => setFormOpen((v) => !v)}
          aria-expanded={formOpen}
          className="flex w-full items-center justify-between px-3 py-2.5 text-left"
        >
          <span className="text-sm font-semibold text-white">📝 Thông tin phiếu đặt cày</span>
          <ChevronDown className={`size-4 text-slate-400 transition ${formOpen ? "rotate-180" : ""}`} />
        </button>
        {formOpen && (
          <div className="space-y-2.5 border-t border-white/10 p-3">
            <div className="grid grid-cols-2 gap-2">
              <label className="col-span-2 sm:col-span-1">
                <span className="mb-1 block text-[11px] font-medium text-slate-400">Tên / Biệt danh</span>
                <input className="input-field" value={customer.name} onChange={(e) => update("name", e.target.value)} placeholder="VD: Lumine" />
              </label>
              <label className="col-span-2 sm:col-span-1">
                <span className="mb-1 block text-[11px] font-medium text-slate-400">Liên hệ (FB / Discord / Zalo)</span>
                <input className="input-field" value={customer.contact} onChange={(e) => update("contact", e.target.value)} placeholder="VD: fb.com/abc" />
              </label>
            </div>

            {uidGames.map((g) => (
              <div key={g} className="grid grid-cols-[1fr_auto] gap-2">
                <label>
                  <span className={`mb-1 block text-[11px] font-medium ${GAME_THEME[g].text}`}>UID {GAMES[g].shortName}</span>
                  <input
                    className="input-field"
                    inputMode="numeric"
                    value={g === "genshin" ? customer.genshinUid : customer.hsrUid}
                    onChange={(e) => update(g === "genshin" ? "genshinUid" : "hsrUid", e.target.value.replace(/[^\d]/g, "").slice(0, 12))}
                    placeholder="VD: 812345678"
                  />
                </label>
                <label>
                  <span className="mb-1 block text-[11px] font-medium text-slate-400">Server</span>
                  <select
                    className="input-field pr-7"
                    value={g === "genshin" ? customer.genshinServer : customer.hsrServer}
                    onChange={(e) => update(g === "genshin" ? "genshinServer" : "hsrServer", e.target.value)}
                  >
                    {GAMES[g].servers.map((sv) => (
                      <option key={sv} value={sv} className="bg-ink-900">
                        {sv}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}

            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-slate-400">Thời gian mong muốn hoàn thành</span>
              <input className="input-field" value={customer.deadline} onChange={(e) => update("deadline", e.target.value)} placeholder="VD: Trước cuối tuần này" />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-medium text-slate-400">Ghi chú tình trạng acc</span>
              <textarea
                rows={3}
                className="input-field resize-y"
                value={customer.note}
                onChange={(e) => update("note", e.target.value)}
                placeholder="VD: Acc AR58, chưa mở map mới, cần làm nhanh"
              />
            </label>
            <p className="text-[11px] leading-relaxed text-slate-500">
              🔒 Không gửi mật khẩu ở đây. Thông tin đăng nhập chỉ trao đổi riêng với Jano qua tin nhắn.
            </p>
          </div>
        )}
      </div>

      {/* Hành động */}
      {!empty && missingUid && (
        <p className="-mb-1 text-[11px] text-amber-200/80">💡 Bạn chưa nhập UID — vẫn có thể gửi đơn, nhưng nhập UID giúp Jano kiểm tra acc nhanh hơn.</p>
      )}
      <div className="grid gap-2">
        <button className="btn-primary w-full py-3" disabled={empty} onClick={() => handleCopy(true)}>
          <FacebookIcon className="size-4" />
          Copy đơn & Nhắn tin đặt lịch
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn-ghost" disabled={empty} onClick={() => handleCopy(false)}>
            <ClipboardCopy className="size-4" />
            Copy đơn
          </button>
          <button className="btn-ghost" disabled={empty} onClick={() => setPreview((v) => !v)}>
            {preview ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            {preview ? "Ẩn phiếu" : "Xem trước"}
          </button>
        </div>
        <button
          onClick={copyDiscord}
          className="flex items-center justify-between gap-2 rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-3 py-2.5 text-sm transition hover:bg-indigo-500/20"
        >
          <span className="flex items-center gap-2 text-indigo-100">
            <DiscordIcon className="size-4 text-indigo-300" />
            Discord: <span className="font-semibold">{CONTACTS.discord}</span>
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-indigo-300">
            <Send className="size-3" /> Copy
          </span>
        </button>
      </div>

      {preview && !empty && (
        <pre className="fade-in max-h-80 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3 font-sans text-xs leading-relaxed whitespace-pre-wrap text-slate-200 select-all">
          {orderText}
        </pre>
      )}
    </div>
  );
}
