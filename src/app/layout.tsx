import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Chakra_Petch, Dancing_Script } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const display = Chakra_Petch({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
});

const script = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
  variable: "--font-script-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jano — Cày thuê Genshin, Star Rail & Zenless Zone Zero",
  description:
    "Dịch vụ cày thuê, cứu acc, try hard content cho Genshin Impact, Honkai: Star Rail và Zenless Zone Zero: La Hoàn, Nhà Hát, chạy map, thần đồng, MoC, Pure Fiction, Vũ Trụ Mô Phỏng, combo phiên bản. Tự tính giá & tạo phiếu đặt nhanh.",
  keywords: ["cày thuê genshin", "cày thuê honkai star rail", "cày thuê HSR", "Jano", "la hoàn", "vũ trụ mô phỏng"],
  openGraph: {
    title: "Jano — Cày thuê Genshin, Star Rail & Zenless Zone Zero",
    description: "Chọn dịch vụ, xem giá tạm tính và gửi phiếu đặt cày cho Jano chỉ trong 1 phút.",
    images: ["/pricing/bang-gia-endgame.jpg"],
    locale: "vi_VN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07060f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${body.variable} ${display.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
