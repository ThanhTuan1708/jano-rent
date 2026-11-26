"use client";

import { memo } from "react";
import { Check, MessageCircle, TriangleAlert } from "lucide-react";
import type { Service } from "@/data/services";
import { formatShort, formatVND } from "@/lib/format";
import { GAME_THEME } from "@/lib/theme";
import { QuantityStepper } from "./QuantityStepper";

interface Props {
  service: Service;
  quantity: number;
  onToggle: (id: string) => void;
  onQuantity: (id: string, qty: number) => void;
}

export function priceLabel(service: Service): string {
  if (service.contact) return "IB trao đổi";
  const base = service.priceMax ? `${formatShort(service.price)} – ${formatShort(service.priceMax)}` : formatVND(service.price);
  return service.unit ? `${base} / ${service.unit}` : base;
}

function ServiceCardBase({ service, quantity, onToggle, onQuantity }: Props) {
  const selected = quantity > 0;
  const theme = GAME_THEME[service.game];
  const hasQty = Boolean(service.quantity && service.unit);
  const subtotal = service.price * quantity;
  const subtotalMax = (service.priceMax ?? service.price) * quantity;

  return (
    <div
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onClick={() => onToggle(service.id)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggle(service.id);
        }
      }}
      className={`group relative flex cursor-pointer flex-col gap-2 rounded-xl border p-3.5 transition duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-violet-400/60 ${
        selected
          ? theme.selected
          : "border-white/[0.08] bg-white/[0.025] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition ${
            selected ? theme.check : "border-white/25 bg-ink-900 group-hover:border-white/50"
          }`}
        >
          {selected && <Check className="size-3.5" strokeWidth={3} />}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <h4 className="font-semibold leading-snug text-white">{service.name}</h4>
            {service.badge && (
              <span className="rounded-full border border-amber-300/40 bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-200 uppercase">
                {service.badge}
              </span>
            )}
          </div>
          {service.note && (
            <p className={`mt-1 flex items-start gap-1 text-xs leading-relaxed ${service.variable ? "text-amber-200/80" : "text-slate-400"}`}>
              {service.variable && <TriangleAlert className="mt-0.5 size-3 shrink-0" />}
              <span>{service.note}</span>
            </p>
          )}
        </div>

        <div className="shrink-0 text-right">
          {service.contact ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-sky-300/40 bg-sky-400/10 px-2 py-0.5 text-xs font-semibold text-sky-200">
              <MessageCircle className="size-3" />
              IB trao đổi
            </span>
          ) : (
            <span className={`font-display text-sm font-bold whitespace-nowrap ${theme.text}`}>{priceLabel(service)}</span>
          )}
        </div>
      </div>

      {selected && hasQty && service.quantity && (
        <div className="fade-in flex items-center justify-between gap-2 border-t border-white/10 pt-2.5 pl-8">
          <QuantityStepper
            value={quantity}
            min={service.quantity.min}
            max={service.quantity.max}
            unit={service.unit}
            onChange={(q) => onQuantity(service.id, q)}
            size="sm"
          />
          <span className="text-sm font-semibold text-white">
            {subtotalMax > subtotal ? `${formatShort(subtotal)} – ${formatShort(subtotalMax)}` : formatVND(subtotal)}
          </span>
        </div>
      )}
    </div>
  );
}

export const ServiceCard = memo(ServiceCardBase);
