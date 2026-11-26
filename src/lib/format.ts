/** 30000 -> "30.000đ" */
export function formatVND(value: number): string {
  return `${Math.round(value).toLocaleString("vi-VN")}đ`;
}

/** 30000 -> "30k", 1500000 -> "1.5tr" */
export function formatShort(value: number): string {
  if (value >= 1_000_000) {
    const v = value / 1_000_000;
    return `${Number.isInteger(v) ? v : v.toFixed(1)}tr`;
  }
  if (value >= 1_000) {
    const v = value / 1_000;
    return `${Number.isInteger(v) ? v : v.toFixed(1)}k`;
  }
  return `${value}đ`;
}

/** Bỏ dấu tiếng Việt + lowercase để tìm kiếm */
export function normalizeText(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .trim();
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Copy text, có fallback cho trình duyệt cũ / không phải HTTPS */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      // Chặn trường hợp trình duyệt treo promise (chờ quyền) quá lâu
      await Promise.race([
        navigator.clipboard.writeText(text),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 1500)),
      ]);
      return true;
    }
  } catch {
    // rơi xuống fallback
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
