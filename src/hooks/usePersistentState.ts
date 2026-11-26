"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useState có lưu vào localStorage.
 * Đọc giá trị sau khi mount để tránh lệch HTML giữa server và client (hydration).
 */
export function usePersistentState<T>(key: string, initial: T, validate?: (value: unknown) => value is T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  const initialRef = useRef(initial);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        if (!validate || validate(parsed)) {
          const base = initialRef.current;
          // Gộp với giá trị mặc định để không thiếu field khi cấu trúc thay đổi
          const merged =
            base && typeof base === "object" && !Array.isArray(base) && parsed && typeof parsed === "object"
              ? ({ ...base, ...(parsed as object) } as T)
              : (parsed as T);
          setValue(merged);
        }
      }
    } catch {
      // dữ liệu hỏng -> bỏ qua
    }
    setHydrated(true);
  }, [key, validate]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // hết quota / chế độ ẩn danh -> bỏ qua
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}
