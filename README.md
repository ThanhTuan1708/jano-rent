# Jano — Cày thuê Genshin Impact & Honkai: Star Rail

Website giới thiệu dịch vụ cày thuê. Khách tích chọn dịch vụ để web tự tính tổng tiền và tạo phiếu đặt cày.
Stack: Next.js (App Router), TypeScript, Tailwind CSS v4.

## Chạy local

```bash
npm install
npm run dev        # http://localhost:3000
```

Build production:

```bash
npm run build
npm start
```

## Sửa giá / thêm dịch vụ

Mọi dữ liệu nằm trong `src/data/services.ts`:

- `SERVICES`: danh sách dịch vụ (giá, đơn vị, số lượng tối đa, ghi chú, badge, mục "IB trao đổi").
- `CATEGORIES`: các nhóm dịch vụ.
- `COMBO_RULES`: quy tắc gợi ý combo tiết kiệm.
- `HIGHLIGHT_NOTICES`: các lưu ý nổi bật.
- `CONTACTS`: link Facebook, Discord và TikTok.

Ảnh bảng giá gốc nằm trong `public/pricing/`.
