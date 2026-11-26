import {
  CATEGORY_MAP,
  COMBO_RULES,
  GAMES,
  SERVICE_MAP,
  SERVICES,
  type ComboRule,
  type GameId,
  type Service,
} from "@/data/services";
import { formatVND } from "./format";

/** id dịch vụ -> số lượng */
export type CartState = Record<string, number>;

export interface CustomerInfo {
  name: string;
  contact: string;
  genshinUid: string;
  genshinServer: string;
  hsrUid: string;
  hsrServer: string;
  deadline: string;
  note: string;
}

export const EMPTY_CUSTOMER: CustomerInfo = {
  name: "",
  contact: "",
  genshinUid: "",
  genshinServer: "Asia",
  hsrUid: "",
  hsrServer: "Asia",
  deadline: "",
  note: "",
};

export interface CartLine {
  service: Service;
  quantity: number;
  subtotal: number;
  subtotalMax: number;
}

export interface CartSummary {
  lines: CartLine[];
  byGame: Record<GameId, CartLine[]>;
  total: number;
  totalMax: number;
  hasRange: boolean;
  variableLines: CartLine[];
  contactLines: CartLine[];
  itemCount: number;
}

const SERVICE_ORDER: Record<string, number> = Object.fromEntries(SERVICES.map((s, i) => [s.id, i]));

export function buildSummary(cart: CartState): CartSummary {
  const lines: CartLine[] = [];
  for (const [id, quantity] of Object.entries(cart)) {
    const service = SERVICE_MAP[id];
    if (!service || quantity <= 0) continue;
    const subtotal = service.contact ? 0 : service.price * quantity;
    const subtotalMax = service.contact ? 0 : (service.priceMax ?? service.price) * quantity;
    lines.push({ service, quantity, subtotal, subtotalMax });
  }

  // Sắp xếp theo thứ tự trong bảng giá
  lines.sort((a, b) => SERVICE_ORDER[a.service.id] - SERVICE_ORDER[b.service.id]);

  const byGame: Record<GameId, CartLine[]> = { genshin: [], hsr: [] };
  for (const line of lines) byGame[line.service.game].push(line);

  const total = lines.reduce((sum, l) => sum + l.subtotal, 0);
  const totalMax = lines.reduce((sum, l) => sum + l.subtotalMax, 0);

  return {
    lines,
    byGame,
    total,
    totalMax,
    hasRange: totalMax > total,
    variableLines: lines.filter((l) => l.service.variable),
    contactLines: lines.filter((l) => l.service.contact),
    itemCount: lines.length,
  };
}

export function gameTotal(lines: CartLine[]): { total: number; totalMax: number } {
  return {
    total: lines.reduce((s, l) => s + l.subtotal, 0),
    totalMax: lines.reduce((s, l) => s + l.subtotalMax, 0),
  };
}

export function formatRange(min: number, max: number): string {
  return max > min ? `${formatVND(min)} – ${formatVND(max)}` : formatVND(min);
}

/* ---------------------- Gợi ý combo ---------------------- */

export interface ComboSuggestion {
  rule: ComboRule;
  combo: Service;
  coveredLines: CartLine[];
  coveredTotal: number;
  saving: number;
}

export function getComboSuggestions(cart: CartState): ComboSuggestion[] {
  const result: ComboSuggestion[] = [];
  const usedGroups = new Set<string>();

  for (const rule of COMBO_RULES) {
    if (rule.group && usedGroups.has(rule.group)) continue;
    const combo = SERVICE_MAP[rule.comboId];
    if (!combo || cart[combo.id]) continue;

    const coveredLines: CartLine[] = rule.coveredIds
      .filter((id) => (cart[id] ?? 0) > 0)
      .map((id) => {
        const service = SERVICE_MAP[id];
        const quantity = cart[id];
        return {
          service,
          quantity,
          subtotal: service.price * quantity,
          subtotalMax: (service.priceMax ?? service.price) * quantity,
        };
      });
    if (coveredLines.length === 0) continue;

    const coveredTotal = coveredLines.reduce((s, l) => s + l.subtotal, 0);
    const coveredQty = coveredLines.reduce((s, l) => s + l.quantity, 0);

    const triggered =
      rule.minQuantity !== undefined
        ? coveredQty >= rule.minQuantity
        : coveredTotal >= (rule.threshold ?? combo.price);

    if (!triggered) continue;
    if (rule.group) usedGroups.add(rule.group);
    result.push({ rule, combo, coveredLines, coveredTotal, saving: Math.max(0, coveredTotal - combo.price) });
  }
  return result;
}

/* ---------------------- Phiếu đặt cày ---------------------- */

function lineText(line: CartLine): string {
  const { service, quantity } = line;
  const category = CATEGORY_MAP[service.categoryId]?.title ?? "";
  const qty = service.unit ? ` × ${quantity} ${service.unit}` : "";
  let price: string;
  if (service.contact) price = "IB trao đổi";
  else if (line.subtotalMax > line.subtotal) price = formatRange(line.subtotal, line.subtotalMax);
  else price = formatVND(line.subtotal);
  const flag = service.variable ? " (*)" : "";
  return `  • [${category}] ${service.name}${qty}: ${price}${flag}`;
}

export function generateOrderCode(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `JN${pad(now.getDate())}${pad(now.getMonth() + 1)}-${rand}`;
}

export function buildOrderText(cart: CartState, info: CustomerInfo, orderCode: string): string {
  const summary = buildSummary(cart);
  const out: string[] = [];
  const divider = "━━━━━━━━━━━━━━━━━━━━";

  out.push("✨ PHIẾU ĐẶT CÀY THUÊ — JANO ✨");
  out.push(`Mã đơn: ${orderCode}`);
  out.push(`Ngày tạo: ${new Date().toLocaleString("vi-VN")}`);
  out.push(divider);
  out.push("👤 KHÁCH HÀNG");
  out.push(`  • Tên / Biệt danh: ${info.name || "(chưa nhập)"}`);
  out.push(`  • Liên hệ: ${info.contact || "(chưa nhập)"}`);
  if (info.deadline) out.push(`  • Thời gian mong muốn: ${info.deadline}`);

  (Object.keys(GAMES) as GameId[]).forEach((gameId) => {
    const lines = summary.byGame[gameId];
    if (lines.length === 0) return;
    const game = GAMES[gameId];
    const uid = gameId === "genshin" ? info.genshinUid : info.hsrUid;
    const server = gameId === "genshin" ? info.genshinServer : info.hsrServer;
    const t = gameTotal(lines);
    out.push(divider);
    out.push(`${gameId === "genshin" ? "🌍" : "🚂"} ${game.name.toUpperCase()}`);
    out.push(`  UID: ${uid || "(chưa nhập)"} | Server: ${server || "(chưa chọn)"}`);
    lines.forEach((l) => out.push(lineText(l)));
    out.push(`  → Tạm tính: ${formatRange(t.total, t.totalMax)}`);
  });

  out.push(divider);
  out.push(`💰 TỔNG TẠM TÍNH: ${formatRange(summary.total, summary.totalMax)}`);
  if (summary.variableLines.length > 0) {
    out.push("(*) Giá có thể thay đổi tùy tình trạng acc / tiến độ — Jano sẽ báo lại giá chốt.");
  }
  if (summary.contactLines.length > 0) {
    out.push(`💬 Cần IB trao đổi thêm: ${summary.contactLines.map((l) => l.service.name).join(", ")}`);
  }
  if (info.note.trim()) {
    out.push(divider);
    out.push("📝 GHI CHÚ / TÌNH TRẠNG ACC");
    out.push(info.note.trim());
  }
  out.push(divider);
  out.push("Mình muốn đặt lịch cày, Jano kiểm tra và báo giá chốt giúp mình nhé! 💜");
  return out.join("\n");
}
