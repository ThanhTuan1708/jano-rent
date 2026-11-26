"use client";

import { useCallback, useMemo } from "react";
import { SERVICE_MAP } from "@/data/services";
import { buildSummary, getComboSuggestions, type CartState } from "@/lib/cart";
import { clamp } from "@/lib/format";
import { usePersistentState } from "./usePersistentState";

function isCartState(value: unknown): value is CartState {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value as Record<string, unknown>).every((v) => typeof v === "number" && Number.isFinite(v));
}

export function useCart() {
  const [rawCart, setCart, hydrated] = usePersistentState<CartState>("jano-cart-v1", {}, isCartState);

  // Bỏ các id không còn tồn tại (khi chủ shop xoá/sửa dịch vụ)
  const cart = useMemo(() => {
    const clean: CartState = {};
    for (const [id, qty] of Object.entries(rawCart)) {
      if (SERVICE_MAP[id] && qty > 0) clean[id] = qty;
    }
    return clean;
  }, [rawCart]);

  const setQuantity = useCallback(
    (id: string, quantity: number) => {
      const service = SERVICE_MAP[id];
      if (!service) return;
      setCart((prev) => {
        const next = { ...prev };
        if (!Number.isFinite(quantity) || quantity <= 0) {
          delete next[id];
        } else {
          const max = service.quantity?.max ?? 1;
          next[id] = service.quantity ? clamp(Math.floor(quantity), 1, max) : 1;
        }
        return next;
      });
    },
    [setCart],
  );

  const toggle = useCallback(
    (id: string) => {
      setCart((prev) => {
        const next = { ...prev };
        if (next[id]) delete next[id];
        else next[id] = SERVICE_MAP[id]?.quantity?.min ?? 1;
        return next;
      });
    },
    [setCart],
  );

  const remove = useCallback(
    (id: string) =>
      setCart((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      }),
    [setCart],
  );

  const clear = useCallback(() => setCart({}), [setCart]);

  /** Thay các mục lẻ bằng combo */
  const applyCombo = useCallback(
    (comboId: string, coveredIds: string[]) =>
      setCart((prev) => {
        const next = { ...prev };
        coveredIds.forEach((id) => delete next[id]);
        next[comboId] = 1;
        return next;
      }),
    [setCart],
  );

  const summary = useMemo(() => buildSummary(cart), [cart]);
  const suggestions = useMemo(() => getComboSuggestions(cart), [cart]);

  return { cart, hydrated, setQuantity, toggle, remove, clear, applyCombo, summary, suggestions };
}

export type CartApi = ReturnType<typeof useCart>;
