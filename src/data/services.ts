/**
 * ============================================================
 *  BẢNG GIÁ DỊCH VỤ CÀY THUÊ JANO
 * ============================================================
 *  Chủ shop chỉ cần sửa file này để cập nhật giá / thêm dịch vụ.
 *
 *  Quy ước:
 *  - price      : giá (VNĐ) cho 1 đơn vị. Với mục "IB trao đổi" để 0.
 *  - priceMax   : (tuỳ chọn) giá tối đa nếu dịch vụ có khoảng giá (VD 2k – 100k).
 *  - unit       : (tuỳ chọn) đơn vị tính. Có unit + quantity = cho phép tăng/giảm số lượng.
 *  - quantity   : (tuỳ chọn) cấu hình số lượng { min, max, step }.
 *  - variable   : true nếu giá có thể thay đổi theo tình trạng acc / tiến độ.
 *  - contact    : true nếu là mục "IB trao đổi" (không tính vào tổng tiền).
 *  - note       : ghi chú hiển thị dưới tên dịch vụ.
 *  - badge      : nhãn nổi bật (VD "Hot", "Giới hạn slot").
 *  - keywords   : từ khoá phụ để tìm kiếm (không dấu / tên tiếng Anh...).
 * ============================================================
 */

export type GameId = "genshin" | "hsr";

export interface QuantityConfig {
  min: number;
  max: number;
  step?: number;
}

export interface Service {
  id: string;
  game: GameId;
  categoryId: string;
  name: string;
  price: number;
  priceMax?: number;
  unit?: string;
  quantity?: QuantityConfig;
  variable?: boolean;
  contact?: boolean;
  note?: string;
  badge?: string;
  keywords?: string[];
}

export interface Category {
  id: string;
  game: GameId;
  title: string;
  icon: string;
  description?: string;
  /** Lưu ý chung của cả nhóm, hiển thị nổi bật ở đầu nhóm */
  notice?: string;
}

export interface GameInfo {
  id: GameId;
  name: string;
  shortName: string;
  tagline: string;
  /** Danh sách server gợi ý khi nhập phiếu đặt */
  servers: string[];
}

/* ------------------------------------------------------------------ */
/*  THÔNG TIN GAME                                                     */
/* ------------------------------------------------------------------ */

export const GAMES: Record<GameId, GameInfo> = {
  genshin: {
    id: "genshin",
    name: "Genshin Impact",
    shortName: "Genshin",
    tagline: "Teyvat • La Hoàn • Nhà Hát • Thần đồng",
    servers: ["Asia", "America", "Europe", "TW/HK/MO"],
  },
  hsr: {
    id: "hsr",
    name: "Honkai: Star Rail",
    shortName: "Star Rail",
    tagline: "MoC • Pure Fiction • Apocalyptic Shadow • VTMP",
    servers: ["Asia", "America", "Europe", "TW/HK/MO"],
  },
};

/* ------------------------------------------------------------------ */
/*  NHÓM DỊCH VỤ                                                       */
/* ------------------------------------------------------------------ */

export const CATEGORIES: Category[] = [
  // ---------- GENSHIN IMPACT ----------
  {
    id: "gi-endgame",
    game: "genshin",
    title: "Endgame / Chế độ đặc biệt",
    icon: "⚔️",
    description: "La Hoàn sâu thẳm, Nhà Hát Ảo Mộng, Ảo Cảnh",
    notice: "Tùy theo độ mạnh của acc sẽ liên quan tới số sao chạy được.",
  },
  {
    id: "gi-map",
    game: "genshin",
    title: "Chạy Map",
    icon: "🗺️",
    description: "Mở khoá bản đồ, dịch chuyển, tượng thần, rương, câu đố",
  },
  {
    id: "gi-collect",
    game: "genshin",
    title: "Nhặt Thần Đồng & Vật Phẩm",
    icon: "🔮",
    description: "Thần đồng 7 vùng và vật phẩm thu thập đặc biệt",
  },
  {
    id: "gi-quest",
    game: "genshin",
    title: "Quest",
    icon: "📜",
    description: "Ma thần, Truyền thuyết, Đồng hành, Sử kí, Thế giới",
  },
  {
    id: "gi-daily",
    game: "genshin",
    title: "Daily & Event",
    icon: "📅",
    description: "Ủy thác hằng ngày, xả nhựa, sự kiện phiên bản",
  },
  {
    id: "gi-up",
    game: "genshin",
    title: "Up Nhân Vật / Kỹ Năng / Vũ Khí",
    icon: "⬆️",
    description: "Nhặt nguyên liệu, nâng cấp nhân vật, thiên phú, vũ khí",
  },
  {
    id: "gi-other",
    game: "genshin",
    title: "Other / Combo",
    icon: "💎",
    description: "Cày roll, combo map, combo phiên bản & dịch vụ trao đổi thêm",
  },

  // ---------- HONKAI: STAR RAIL ----------
  {
    id: "hsr-endgame",
    game: "hsr",
    title: "Endgame & Thử Thách",
    icon: "🌌",
    description: "Memory of Chaos, Apocalyptic Shadow, Pure Fiction, AA",
  },
  {
    id: "hsr-quest",
    game: "hsr",
    title: "Quest",
    icon: "📜",
    description: "Cốt truyện Khai Phá, Đồng hành, Thám hiểm",
  },
  {
    id: "hsr-daily",
    game: "hsr",
    title: "Daily - Nhựa & Event",
    icon: "📅",
    description: "Nhiệm vụ hằng ngày, xả Sức Mạnh Khai Phá, sự kiện",
  },
  {
    id: "hsr-map",
    game: "hsr",
    title: "Chạy Map",
    icon: "🪐",
    description: "Mở rương, câu đố, khám phá 100% từng hành tinh",
  },
  {
    id: "hsr-su",
    game: "hsr",
    title: "Vũ Trụ Mô Phỏng",
    icon: "🌀",
    description: "VTMP, VTSP (Vũ Trụ Sai Phân), CTTT",
    notice: "VTMP, VTSP, CTTT giá tùy theo tiến độ bạn đã hoàn thành mà giảm giá.",
  },
  {
    id: "hsr-other",
    game: "hsr",
    title: "Other / Combo",
    icon: "💎",
    description: "Cày roll, combo phiên bản & dịch vụ trao đổi thêm",
  },
];

/* ------------------------------------------------------------------ */
/*  DỊCH VỤ                                                            */
/* ------------------------------------------------------------------ */

const ACC_STRENGTH_NOTE = "Tùy theo độ mạnh của acc sẽ liên quan tới số sao chạy được";
const SU_PROGRESS_NOTE = "Giá tùy theo tiến độ bạn đã hoàn thành mà giảm giá";
const IB = "IB trao đổi";

export const SERVICES: Service[] = [
  /* ======================= GENSHIN IMPACT ======================= */

  // 1. Endgame / Chế độ đặc biệt
  { id: "gi-la-hoan", game: "genshin", categoryId: "gi-endgame", name: "La Hoàn", price: 30_000, variable: true, note: ACC_STRENGTH_NOTE, keywords: ["spiral abyss", "abyss", "la hoan"] },
  { id: "gi-nha-hat", game: "genshin", categoryId: "gi-endgame", name: "Nhà Hát", price: 80_000, variable: true, note: ACC_STRENGTH_NOTE, keywords: ["imaginarium theater", "nha hat", "theater"] },
  { id: "gi-ao-canh-5", game: "genshin", categoryId: "gi-endgame", name: "Ảo Cảnh - Diff 5", price: 40_000, keywords: ["ao canh", "stygian onslaught", "diff 5"] },
  { id: "gi-ao-canh-6", game: "genshin", categoryId: "gi-endgame", name: "Ảo Cảnh - Diff 6", price: 100_000, keywords: ["ao canh", "stygian onslaught", "diff 6"] },

  // 2. Chạy Map
  { id: "gi-map-mondstadt", game: "genshin", categoryId: "gi-map", name: "Monstadt", price: 55_000, unit: "khu", quantity: { min: 1, max: 20 }, keywords: ["mondstadt", "monstadt", "map"] },
  { id: "gi-map-liyue", game: "genshin", categoryId: "gi-map", name: "Liyue", price: 55_000, unit: "khu", quantity: { min: 1, max: 20 }, keywords: ["liyue", "map"] },
  { id: "gi-map-inazuma", game: "genshin", categoryId: "gi-map", name: "Inazuma", price: 55_000, unit: "khu", quantity: { min: 1, max: 20 }, keywords: ["inazuma", "map"] },
  { id: "gi-map-sumeru", game: "genshin", categoryId: "gi-map", name: "Sumeru", price: 65_000, unit: "khu", quantity: { min: 1, max: 20 }, keywords: ["sumeru", "map"] },
  { id: "gi-map-fontaine", game: "genshin", categoryId: "gi-map", name: "Fontaine", price: 65_000, unit: "khu", quantity: { min: 1, max: 20 }, keywords: ["fontaine", "map"] },
  { id: "gi-map-natlan", game: "genshin", categoryId: "gi-map", name: "Natlan", price: 65_000, unit: "khu", quantity: { min: 1, max: 20 }, keywords: ["natlan", "map"] },
  { id: "gi-map-nodkrai", game: "genshin", categoryId: "gi-map", name: "Nodkrai", price: 65_000, unit: "khu", quantity: { min: 1, max: 20 }, keywords: ["nod-krai", "nodkrai", "map"] },
  { id: "gi-map-snezhnaya", game: "genshin", categoryId: "gi-map", name: "Snezhaya", price: 65_000, unit: "khu", quantity: { min: 1, max: 20 }, keywords: ["snezhnaya", "snezhaya", "map"] },
  { id: "gi-map-vuc-da-sau", game: "genshin", categoryId: "gi-map", name: "Vực đá sâu", price: 185_000, keywords: ["the chasm", "chasm", "vuc da sau", "map"] },
  { id: "gi-map-enkanomiya", game: "genshin", categoryId: "gi-map", name: "Enkanomiya", price: 205_000, keywords: ["enkanomiya", "map"] },
  { id: "gi-map-tram-ngoc-coc", game: "genshin", categoryId: "gi-map", name: "Trầm ngọc cốc", price: 185_000, keywords: ["chenyu vale", "tram ngoc coc", "map"] },
  { id: "gi-map-bien-ky-nguyen-cu", game: "genshin", categoryId: "gi-map", name: "Biển kỷ nguyên cũ", price: 205_000, keywords: ["sea of bygone eras", "bien ky nguyen cu", "map"] },
  { id: "gi-map-nui-thanh-vien-co", game: "genshin", categoryId: "gi-map", name: "Núi thánh viễn cổ", price: 185_000, keywords: ["ancient sacred mountain", "nui thanh vien co", "map"] },
  { id: "gi-map-than-dien-khong-gian", game: "genshin", categoryId: "gi-map", name: "Thần điện không gian", price: 205_000, keywords: ["than dien khong gian", "map"] },
  { id: "gi-map-suong-nguyet", game: "genshin", categoryId: "gi-map", name: "Sương nguyệt", price: 205_000, keywords: ["suong nguyet", "map"] },

  // 3. Nhặt Thần Đồng & Vật Phẩm Thu Thập
  { id: "gi-oculus-anemo", game: "genshin", categoryId: "gi-collect", name: "Phong thần đồng", price: 55_000, keywords: ["anemoculus", "phong than dong", "than dong"] },
  { id: "gi-oculus-geo", game: "genshin", categoryId: "gi-collect", name: "Nham thần đồng", price: 85_000, keywords: ["geoculus", "nham than dong", "than dong"] },
  { id: "gi-oculus-electro", game: "genshin", categoryId: "gi-collect", name: "Lôi thần đồng", price: 135_000, keywords: ["electroculus", "loi than dong", "than dong"] },
  { id: "gi-oculus-hydro", game: "genshin", categoryId: "gi-collect", name: "Thủy thần đồng", price: 235_000, keywords: ["hydroculus", "thuy than dong", "than dong"] },
  { id: "gi-oculus-dendro", game: "genshin", categoryId: "gi-collect", name: "Thảo thần đồng", price: 235_000, keywords: ["dendroculus", "thao than dong", "than dong"] },
  { id: "gi-oculus-pyro", game: "genshin", categoryId: "gi-collect", name: "Hoả thần đồng", price: 235_000, keywords: ["pyroculus", "hoa than dong", "than dong"] },
  { id: "gi-oculus-moon", game: "genshin", categoryId: "gi-collect", name: "Nguyệt thần đồng", price: 235_000, keywords: ["nguyet than dong", "than dong"] },
  { id: "gi-crimson-agate", game: "genshin", categoryId: "gi-collect", name: "Mã não đỏ thẳm", price: 85_000, keywords: ["crimson agate", "ma nao do tham"] },
  { id: "gi-lumenstone", game: "genshin", categoryId: "gi-collect", name: "Lưu minh thạch", price: 65_000, keywords: ["lumenspar", "luu minh thach"] },
  { id: "gi-sigil", game: "genshin", categoryId: "gi-collect", name: "Đá thánh chương", price: 75_000, keywords: ["da thanh chuong", "sigil"] },
  { id: "gi-koi", game: "genshin", categoryId: "gi-collect", name: "Cá chép thương linh", price: 45_000, keywords: ["ca chep thuong linh"] },

  // 4. Quest
  { id: "gi-quest-archon", game: "genshin", categoryId: "gi-quest", name: "Ma thần", price: 35_000, unit: "quest", quantity: { min: 1, max: 50 }, keywords: ["archon quest", "ma than", "cot truyen"] },
  { id: "gi-quest-legend", game: "genshin", categoryId: "gi-quest", name: "Truyền thuyết", price: 25_000, unit: "quest", quantity: { min: 1, max: 50 }, keywords: ["legend quest", "truyen thuyet"] },
  { id: "gi-quest-hangout", game: "genshin", categoryId: "gi-quest", name: "Đồng hành", price: 15_000, unit: "quest", quantity: { min: 1, max: 50 }, keywords: ["hangout", "dong hanh"] },
  { id: "gi-quest-chronicle", game: "genshin", categoryId: "gi-quest", name: "Sử kí", price: 25_000, unit: "quest", quantity: { min: 1, max: 50 }, keywords: ["chronicled", "su ki"] },
  { id: "gi-quest-world", game: "genshin", categoryId: "gi-quest", name: "Thế giới", price: 2_000, priceMax: 100_000, unit: "quest", quantity: { min: 1, max: 200 }, variable: true, note: "Khoảng 2k – 100k tùy quest, IB trao đổi sau", keywords: ["world quest", "the gioi", "nhiem vu the gioi"] },

  // 5. Daily & Event
  { id: "gi-daily-day", game: "genshin", categoryId: "gi-daily", name: "Daily - Ngày", price: 3_000, unit: "ngày", quantity: { min: 1, max: 60 }, keywords: ["daily", "uy thac", "ngay", "nhua"] },
  { id: "gi-daily-week", game: "genshin", categoryId: "gi-daily", name: "Daily - Tuần", price: 15_000, unit: "tuần", quantity: { min: 1, max: 12 }, keywords: ["daily", "tuan", "nhua"] },
  { id: "gi-daily-month", game: "genshin", categoryId: "gi-daily", name: "Daily - Tháng", price: 75_000, unit: "tháng", quantity: { min: 1, max: 6 }, badge: "Tiết kiệm", keywords: ["daily", "thang", "nhua"] },
  { id: "gi-event-small", game: "genshin", categoryId: "gi-daily", name: "Event Nhỏ", price: 30_000, unit: "event", quantity: { min: 1, max: 10 }, keywords: ["event", "su kien", "nho"] },
  { id: "gi-event-big", game: "genshin", categoryId: "gi-daily", name: "Event Lớn", price: 50_000, unit: "event", quantity: { min: 1, max: 10 }, keywords: ["event", "su kien", "lon"] },

  // 6. Up nhân vật / kỹ năng / vũ khí / nguyên liệu
  { id: "gi-up-char", game: "genshin", categoryId: "gi-up", name: "Nhân vật - Vũ khí", price: 30_000, unit: "char", quantity: { min: 1, max: 20 }, note: "30k / 1 nhân vật", keywords: ["up nhan vat", "level", "char", "build"] },
  { id: "gi-up-talent", game: "genshin", categoryId: "gi-up", name: "Kĩ năng", price: 15_000, unit: "kn", quantity: { min: 1, max: 60 }, note: "15k / 1 kĩ năng, dù lv kĩ năng đang là bao nhiêu", keywords: ["talent", "ki nang", "thien phu"] },
  { id: "gi-up-weapon", game: "genshin", categoryId: "gi-up", name: "Vũ khí", price: 15_000, unit: "vũ khí", quantity: { min: 1, max: 20 }, keywords: ["weapon", "vu khi"] },
  { id: "gi-up-material", game: "genshin", categoryId: "gi-up", name: "Nguyên liệu", price: 15_000, unit: "100 nl", quantity: { min: 1, max: 50 }, note: "15k / 100 nguyên liệu", keywords: ["nguyen lieu", "farm", "nhat nguyen lieu", "material"] },
  { id: "gi-fishing-full", game: "genshin", categoryId: "gi-up", name: "Tinh luyện vũ khí câu cá (Full)", price: 85_000, note: "Tinh luyện full 1 vũ khí câu cá", keywords: ["cau ca", "fishing", "tinh luyen"] },
  { id: "gi-fishing-level", game: "genshin", categoryId: "gi-up", name: "Tinh luyện vũ khí câu cá (Theo cấp)", price: 21_000, unit: "cấp", quantity: { min: 1, max: 4 }, keywords: ["cau ca", "fishing", "tinh luyen"] },

  // 7. Other / Combo
  { id: "gi-roll", game: "genshin", categoryId: "gi-other", name: "Cày Roll", price: 7_000, unit: "roll", quantity: { min: 1, max: 500, step: 1 }, note: "7k / 1 roll", keywords: ["roll", "nguyen thach", "primogem", "gacha"] },
  { id: "gi-combo-map-small", game: "genshin", categoryId: "gi-other", name: "Combo cày map nhỏ", price: 300_000, note: "Gồm map, thần đồng, nhiệm vụ thế giới", badge: "Combo", keywords: ["combo", "map", "than dong"] },
  { id: "gi-combo-map-big", game: "genshin", categoryId: "gi-other", name: "Combo cày map lớn", price: 500_000, note: "Gồm map, thần đồng, nhiệm vụ thế giới", badge: "Combo", keywords: ["combo", "map", "than dong"] },
  { id: "gi-combo-version", game: "genshin", categoryId: "gi-other", name: "Combo theo phiên bản 40 ngày", price: 195_000, badge: "Best seller", note: "Trọn gói 40 ngày của 1 phiên bản", keywords: ["combo", "phien ban", "40 ngay", "pb"] },
  { id: "gi-ib-quest-day", game: "genshin", categoryId: "gi-other", name: "Quest ngày", price: 0, contact: true, keywords: ["quest ngay", "daily"] },
  { id: "gi-ib-resin", game: "genshin", categoryId: "gi-other", name: "Xả Nhựa theo ngày", price: 0, contact: true, keywords: ["xa nhua", "resin"] },
  { id: "gi-ib-bp", game: "genshin", categoryId: "gi-other", name: "BP", price: 0, contact: true, keywords: ["battle pass", "bp"] },
  { id: "gi-ib-weekly-boss", game: "genshin", categoryId: "gi-other", name: "Boss tuần", price: 0, contact: true, keywords: ["weekly boss", "boss tuan"] },
  { id: "gi-ib-event", game: "genshin", categoryId: "gi-other", name: "Event lớn nhỏ", price: 0, contact: true, keywords: ["event", "su kien"] },

  /* ===================== HONKAI: STAR RAIL ===================== */

  // 1. Endgame & Thử thách
  { id: "hsr-moc-as-pf", game: "hsr", categoryId: "hsr-endgame", name: "MOC / AS / PF", price: 30_000, unit: "chế độ", quantity: { min: 1, max: 3 }, note: "30k mỗi chế độ: Memory of Chaos, Apocalyptic Shadow, Pure Fiction", keywords: ["moc", "memory of chaos", "hon loan", "as", "apocalyptic shadow", "pf", "pure fiction", "endgame"] },
  { id: "hsr-0cycle-1", game: "hsr", categoryId: "hsr-endgame", name: "0 Cycle Starward Mode (1 tầng)", price: 15_000, unit: "tầng", quantity: { min: 1, max: 3 }, note: "15k / 1 tầng", keywords: ["0 cycle", "starward", "zero cycle"] },
  { id: "hsr-0cycle-3", game: "hsr", categoryId: "hsr-endgame", name: "0 Cycle Starward Mode (3 tầng)", price: 40_000, note: "Trọn 3 tầng chỉ 40k", badge: "Tiết kiệm", keywords: ["0 cycle", "starward", "zero cycle"] },
  { id: "hsr-aa-gold", game: "hsr", categoryId: "hsr-endgame", name: "AA Khung Vàng", price: 50_000, variable: true, note: "Tùy theo tình hình của acc", keywords: ["aa", "anomaly arbitration", "khung vang"] },
  { id: "hsr-aa-diamond", game: "hsr", categoryId: "hsr-endgame", name: "AA Khung Kim Cương", price: 80_000, variable: true, note: "Tùy theo tình hình của acc", keywords: ["aa", "anomaly arbitration", "kim cuong"] },

  // 2. Quest
  { id: "hsr-quest-story", game: "hsr", categoryId: "hsr-quest", name: "Story và Khai phá tiếp diễn đồng", price: 25_000, unit: "quest", quantity: { min: 1, max: 50 }, note: "25k / 1 quest", keywords: ["story", "trailblaze", "khai pha", "cot truyen"] },
  { id: "hsr-quest-companion", game: "hsr", categoryId: "hsr-quest", name: "Quest đồng hành", price: 15_000, unit: "quest", quantity: { min: 1, max: 50 }, keywords: ["companion", "dong hanh"] },
  { id: "hsr-quest-adventure", game: "hsr", categoryId: "hsr-quest", name: "Quest thám hiểm", price: 5_000, priceMax: 10_000, unit: "quest", quantity: { min: 1, max: 200 }, variable: true, note: "5k – 10k, tùy vào thời gian hoàn thành quest", keywords: ["adventure", "tham hiem"] },

  // 3. Daily - Nhựa & Event
  { id: "hsr-daily-day", game: "hsr", categoryId: "hsr-daily", name: "Daily - Nhựa (Ngày)", price: 2_000, unit: "ngày", quantity: { min: 1, max: 60 }, keywords: ["daily", "nhua", "stamina", "ngay"] },
  { id: "hsr-daily-week", game: "hsr", categoryId: "hsr-daily", name: "Daily - Nhựa (Tuần)", price: 10_000, unit: "tuần", quantity: { min: 1, max: 12 }, keywords: ["daily", "nhua", "tuan"] },
  { id: "hsr-daily-month", game: "hsr", categoryId: "hsr-daily", name: "Daily - Nhựa (Tháng)", price: 50_000, unit: "tháng", quantity: { min: 1, max: 6 }, badge: "Tiết kiệm", keywords: ["daily", "nhua", "thang"] },
  { id: "hsr-event-small", game: "hsr", categoryId: "hsr-daily", name: "Event Nhỏ", price: 30_000, unit: "event", quantity: { min: 1, max: 10 }, keywords: ["event", "su kien", "nho"] },
  { id: "hsr-event-big", game: "hsr", categoryId: "hsr-daily", name: "Event Lớn", price: 50_000, unit: "event", quantity: { min: 1, max: 10 }, keywords: ["event", "su kien", "lon"] },

  // 4. Chạy Map
  { id: "hsr-map-herta", game: "hsr", categoryId: "hsr-map", name: "Trạm không gian", price: 50_000, keywords: ["herta space station", "tram khong gian", "map"] },
  { id: "hsr-map-jarilo", game: "hsr", categoryId: "hsr-map", name: "Jarilo-VI", price: 100_000, keywords: ["jarilo", "belobog", "map"] },
  { id: "hsr-map-xianzhou", game: "hsr", categoryId: "hsr-map", name: "Xianzhou", price: 150_000, keywords: ["xianzhou", "luofu", "tien chu", "map"] },
  { id: "hsr-map-penacony", game: "hsr", categoryId: "hsr-map", name: "Penacony", price: 250_000, keywords: ["penacony", "map"] },
  { id: "hsr-map-amphoreus", game: "hsr", categoryId: "hsr-map", name: "Amphoreus", price: 350_000, keywords: ["amphoreus", "map"] },
  { id: "hsr-map-planarcadia", game: "hsr", categoryId: "hsr-map", name: "Planarcadia", price: 250_000, keywords: ["planarcadia", "map"] },

  // 5. Vũ Trụ Mô Phỏng
  { id: "hsr-su-normal", game: "hsr", categoryId: "hsr-su", name: "VTMP thường", price: 250_000, variable: true, note: "Đồng giá 250k", keywords: ["vu tru mo phong", "simulated universe", "vtmp"] },
  { id: "hsr-su-swarm", game: "hsr", categoryId: "hsr-su", name: "VTMP côn trùng", price: 250_000, variable: true, note: SU_PROGRESS_NOTE, keywords: ["vu tru mo phong", "swarm disaster", "con trung", "vtmp"] },
  { id: "hsr-su-gold-gears", game: "hsr", categoryId: "hsr-su", name: "VTMP vàng và máy móc", price: 250_000, variable: true, note: SU_PROGRESS_NOTE, keywords: ["vu tru mo phong", "gold and gears", "vang may moc", "vtmp"] },
  { id: "hsr-su-unknowable", game: "hsr", categoryId: "hsr-su", name: "VTMP vùng không biết", price: 250_000, variable: true, note: SU_PROGRESS_NOTE, keywords: ["vu tru mo phong", "unknowable domain", "vung khong biet", "vtmp"] },
  { id: "hsr-su-divergent", game: "hsr", categoryId: "hsr-su", name: "VTSP", price: 250_000, variable: true, note: SU_PROGRESS_NOTE, keywords: ["vu tru sai phan", "divergent universe", "vtsp"] },
  { id: "hsr-su-cttt", game: "hsr", categoryId: "hsr-su", name: "CTTT", price: 250_000, variable: true, note: SU_PROGRESS_NOTE, keywords: ["cttt", "vu tru"] },

  // 6. Other / Combo
  { id: "hsr-roll", game: "hsr", categoryId: "hsr-other", name: "Cày roll", price: 7_000, unit: "roll", quantity: { min: 1, max: 500 }, note: "7k / 1 roll", keywords: ["roll", "tinh quynh", "stellar jade", "gacha"] },
  { id: "hsr-combo-version", game: "hsr", categoryId: "hsr-other", name: "Combo theo phiên bản 40 ngày", price: 190_000, badge: "Chỉ nhận 4 khách / PB", note: "Mình chỉ nhận 4 khách mỗi PB — đặt sớm để giữ slot", keywords: ["combo", "phien ban", "40 ngay", "pb"] },
  { id: "hsr-ib-daily", game: "hsr", categoryId: "hsr-other", name: "Nhựa và daily", price: 0, contact: true, keywords: ["nhua", "daily"] },
  { id: "hsr-ib-bp", game: "hsr", categoryId: "hsr-other", name: "BP", price: 0, contact: true, keywords: ["battle pass", "bp", "nameless honor"] },
  { id: "hsr-ib-weekly-boss", game: "hsr", categoryId: "hsr-other", name: "Boss tuần", price: 0, contact: true, keywords: ["weekly boss", "echo of war", "boss tuan"] },
  { id: "hsr-ib-vtsp-week", game: "hsr", categoryId: "hsr-other", name: "VTSP theo tuần", price: 0, contact: true, keywords: ["vtsp", "vu tru sai phan", "tuan"] },
  { id: "hsr-ib-all-event", game: "hsr", categoryId: "hsr-other", name: "All event của 1 PB", price: 0, contact: true, keywords: ["event", "phien ban", "pb"] },
];

export const CONTACT_TAG = IB;

/* ------------------------------------------------------------------ */
/*  GỢI Ý COMBO THÔNG MINH                                             */
/* ------------------------------------------------------------------ */

export interface ComboRule {
  id: string;
  /** Combo được gợi ý */
  comboId: string;
  /** Các dịch vụ lẻ thuộc phạm vi combo */
  coveredIds: string[];
  /** Gợi ý khi tổng tiền các mục lẻ >= ngưỡng này (mặc định = giá combo) */
  threshold?: number;
  /** Hoặc gợi ý khi tổng số lượng các mục lẻ >= minQuantity */
  minQuantity?: number;
  /** Các rule cùng group chỉ hiện 1 gợi ý (rule đứng trước ưu tiên hơn) */
  group?: string;
  message: string;
}

export const COMBO_RULES: ComboRule[] = [
  {
    id: "rule-gi-version",
    comboId: "gi-combo-version",
    coveredIds: ["gi-daily-day", "gi-daily-week", "gi-daily-month", "gi-event-small", "gi-event-big", "gi-la-hoan", "gi-nha-hat"],
    message: "Bạn đang chọn nhiều Daily / Event / Endgame Genshin lẻ. Combo phiên bản 40 ngày chỉ 195k — trọn gói, đỡ phải đặt lẻ từng mục.",
  },
  {
    id: "rule-gi-map-big",
    comboId: "gi-combo-map-big",
    group: "gi-map",
    coveredIds: SERVICES.filter((s) => s.categoryId === "gi-map" || s.categoryId === "gi-collect" || s.id === "gi-quest-world").map((s) => s.id),
    message: "Tổng chạy map + thần đồng + quest thế giới đã vượt 500k. Combo cày map lớn (500k) gồm map, thần đồng và nhiệm vụ thế giới sẽ tối ưu hơn.",
  },
  {
    id: "rule-gi-map-small",
    comboId: "gi-combo-map-small",
    group: "gi-map",
    coveredIds: SERVICES.filter((s) => s.categoryId === "gi-map" || s.categoryId === "gi-collect" || s.id === "gi-quest-world").map((s) => s.id),
    message: "Tổng chạy map + thần đồng + quest thế giới đã vượt 300k. Thử Combo cày map nhỏ (300k) gồm map, thần đồng và nhiệm vụ thế giới nhé.",
  },
  {
    id: "rule-hsr-version",
    comboId: "hsr-combo-version",
    coveredIds: ["hsr-daily-day", "hsr-daily-week", "hsr-daily-month", "hsr-event-small", "hsr-event-big", "hsr-moc-as-pf"],
    message: "Bạn đang chọn nhiều Daily / Event / Endgame Star Rail lẻ. Combo phiên bản 40 ngày chỉ 190k (giới hạn 4 khách mỗi PB).",
  },
  {
    id: "rule-hsr-0cycle",
    comboId: "hsr-0cycle-3",
    coveredIds: ["hsr-0cycle-1"],
    minQuantity: 3,
    message: "Chạy 0 Cycle đủ 3 tầng lẻ là 45k — chọn gói 3 tầng chỉ 40k để tiết kiệm 5k.",
  },
];

/* ------------------------------------------------------------------ */
/*  LƯU Ý NỔI BẬT                                                      */
/* ------------------------------------------------------------------ */

export const HIGHLIGHT_NOTICES: { icon: string; title: string; text: string; tone: "pink" | "gold" | "blue" | "red" }[] = [
  { icon: "🔥", title: "Combo 40 ngày HSR", text: "Chỉ nhận 4 khách mỗi phiên bản — đặt sớm để giữ slot.", tone: "pink" },
  { icon: "🌀", title: "VTMP / VTSP / CTTT", text: "Giá giảm theo tiến độ bạn đã hoàn thành. IB để được báo giá chính xác.", tone: "blue" },
  { icon: "⭐", title: "La Hoàn • Nhà Hát • AA", text: "Số sao / khung đạt được phụ thuộc độ mạnh của acc.", tone: "gold" },
  { icon: "💬", title: "Dịch vụ IB trao đổi", text: "BP, Boss tuần, xả nhựa, event… báo giá riêng theo nhu cầu.", tone: "red" },
];

/* ------------------------------------------------------------------ */
/*  KÊNH LIÊN HỆ                                                       */
/* ------------------------------------------------------------------ */

export const CONTACTS = {
  facebook: "https://www.facebook.com/janonasukii/",
  discord: "Jano170825",
  tiktok: "https://www.tiktok.com/@jano1708",
  tiktokHandle: "@jano1708",
  /** Bài check legit trên Facebook */
  legit: "https://www.facebook.com/share/p/1PimbGWMcN/?mibextid=wwXIfr",
} as const;

/* ------------------------------------------------------------------ */
/*  KHAI TRƯƠNG & RULE GIAO DỊCH                                       */
/* ------------------------------------------------------------------ */

export const LAUNCH_PROMO = {
  title: "Khai trương dịch vụ cày thuê, cứu acc, try hard content",
  subtitle:
    "Dành cho những người lười và muốn có chiến tích cao để “phong bạc” chỉ với 1 bát phở full topping.",
  discount: "Giảm 10% tổng hoá đơn cho 10 người book dịch vụ đầu tiên",
  games: [
    { name: "Genshin Impact", note: "Có bảng giá" },
    { name: "Honkai: Star Rail", note: "Có bảng giá" },
    { name: "Zenless Zone Zero", note: "IB nếu có nhu cầu" },
  ],
} as const;

export const TRADE_RULES: { icon: string; title: string; text: string }[] = [
  {
    icon: "🛡️",
    title: "Về hard content",
    text: "Bên mình cần check acc trước khi chấp nhận giải cứu acc của bạn. Nếu acc đạt yêu cầu sẽ tiết kiệm rất nhiều thời gian cho bạn.",
  },
  {
    icon: "💸",
    title: "Rule giao dịch",
    text: "Chỉ nhận cọc 50% hoặc chuyển khoản full trước khi nhận kèo. Thời gian hoàn thành từ 1 đến 7 ngày tuỳ yêu cầu. Ưu tiên làm nhanh cho các bạn chuyển khoản full.",
  },
  {
    icon: "🎮",
    title: "Làm tay 100%, no tool",
    text: "Có live Discord để minh chứng trong lúc làm nên không cần lo lắng chuyện bay acc.",
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

export const SERVICE_MAP: Record<string, Service> = Object.fromEntries(SERVICES.map((s) => [s.id, s]));

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
