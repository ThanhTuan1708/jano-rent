import type { GameId } from "@/data/services";

/** Class Tailwind theo từng game (viết đầy đủ để Tailwind quét được) */
export const GAME_THEME: Record<
  GameId,
  {
    badge: string;
    text: string;
    selected: string;
    check: string;
    dot: string;
    tab: string;
    gradient: string;
    emoji: string;
  }
> = {
  genshin: {
    badge: "border-gi-400/40 bg-gi-500/15 text-gi-400",
    text: "text-gi-400",
    selected: "border-gi-400/70 bg-gi-500/[0.09] shadow-[0_0_28px_-8px_rgb(255_106_43/0.55)]",
    check: "border-gi-400 bg-gi-500 text-white",
    dot: "bg-gi-400",
    tab: "from-orange-500 to-red-600 shadow-red-900/50",
    gradient: "from-orange-400 via-amber-300 to-red-500",
    emoji: "🌍",
  },
  hsr: {
    badge: "border-hsr-400/40 bg-hsr-500/15 text-hsr-400",
    text: "text-hsr-400",
    selected: "border-hsr-400/70 bg-hsr-500/[0.09] shadow-[0_0_28px_-8px_rgb(217_70_176/0.6)]",
    check: "border-hsr-400 bg-hsr-500 text-white",
    dot: "bg-hsr-400",
    tab: "from-fuchsia-500 to-violet-600 shadow-fuchsia-900/50",
    gradient: "from-pink-400 via-fuchsia-400 to-violet-500",
    emoji: "🚂",
  },
};
