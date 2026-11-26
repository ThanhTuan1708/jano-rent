"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (value: number) => void;
  size?: "sm" | "md";
}

export function QuantityStepper({ value, min, max, unit, onChange, size = "md" }: Props) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => setDraft(String(value)), [value]);

  const commit = (raw: string) => {
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) {
      setDraft(String(value));
      return;
    }
    const next = Math.min(max, Math.max(min, n));
    setDraft(String(next));
    if (next !== value) onChange(next);
  };

  const btn =
    size === "sm"
      ? "size-7 rounded-lg"
      : "size-8 rounded-lg";

  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-ink-900/80 p-0.5"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Giảm số lượng"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={`${btn} grid place-items-center text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        <Minus className="size-3.5" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={draft}
        aria-label="Số lượng"
        onChange={(e) => {
          setDraft(e.target.value);
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n) && n >= min && n <= max) onChange(n);
        }}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit((e.target as HTMLInputElement).value);
        }}
        className={`${size === "sm" ? "w-9 text-xs" : "w-11 text-sm"} bg-transparent text-center font-semibold text-white outline-none`}
      />
      <button
        type="button"
        aria-label="Tăng số lượng"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={`${btn} grid place-items-center text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        <Plus className="size-3.5" />
      </button>
      {unit && <span className="pr-2 pl-0.5 text-xs text-slate-400">{unit}</span>}
    </div>
  );
}
