"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { CircleCheck, CircleAlert } from "lucide-react";

type ToastType = "success" | "error";
interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2600);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-20 z-[100] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast-in pointer-events-auto flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-2xl backdrop-blur-xl ${
              t.type === "success"
                ? "border-emerald-400/40 bg-emerald-950/80 text-emerald-100"
                : "border-rose-400/40 bg-rose-950/80 text-rose-100"
            }`}
          >
            {t.type === "success" ? <CircleCheck className="size-4" /> : <CircleAlert className="size-4" />}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
