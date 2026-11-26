import { BadgeCheck, ChevronDown, ClipboardList, CreditCard, Gamepad2, KeyRound, LineChart, MessageSquareText, ShieldCheck, Wrench } from "lucide-react";

const STEPS = [
  { icon: ClipboardList, title: "Chọn dịch vụ", text: "Tích chọn dịch vụ ở bảng giá, chỉnh số lượng và xem tổng tạm tính ngay." },
  { icon: MessageSquareText, title: "Gửi phiếu đặt", text: "Nhập UID, server, ghi chú acc rồi bấm Copy đơn và gửi cho Jano qua Messenger/Discord." },
  { icon: BadgeCheck, title: "Chốt giá & lịch", text: "Jano check acc, báo giá chốt và thời gian (1–7 ngày). Bạn cọc 50% hoặc chuyển khoản full để nhận kèo." },
  { icon: Gamepad2, title: "Cày & báo tiến độ", text: "Jano cày tay, có live Discord minh chứng và cập nhật tiến độ. Xong việc bàn giao lại acc cho bạn." },
];

const COMMITMENTS = [
  { icon: ShieldCheck, title: "Bảo mật tài khoản", text: "Không chia sẻ thông tin acc cho bên thứ ba, không đụng tới nguyên thạch/tinh quỳnh khi chưa được phép." },
  { icon: Wrench, title: "100% cày tay", text: "Không dùng tool, hack, auto hay phần mềm thứ ba. Có live Discord để minh chứng nên không lo bay acc." },
  { icon: LineChart, title: "Tiến độ minh bạch", text: "Báo cáo tiến độ thường xuyên kèm ảnh chụp, bạn có thể hỏi tình hình bất cứ lúc nào." },
  { icon: CreditCard, title: "Thanh toán rõ ràng", text: "Cọc 50% hoặc chuyển khoản full trước khi nhận kèo. Báo giá trước, không phát sinh phí ẩn." },
];

const FAQ = [
  {
    q: "Đăng nhập tài khoản như thế nào để an toàn?",
    a: "Bạn chỉ gửi thông tin đăng nhập qua tin nhắn riêng với Jano (Messenger/Discord), tuyệt đối không ghi mật khẩu vào phiếu đặt. Khuyến khích bạn đổi mật khẩu tạm trước khi giao acc và đổi lại sau khi hoàn thành. Nếu acc có xác minh email/OTP, Jano sẽ hẹn giờ để bạn hỗ trợ đăng nhập.",
  },
  {
    q: "Jano có dùng tool, hack hay auto không?",
    a: "Không. Mọi dịch vụ đều được cày tay 100%. Jano không cài phần mềm thứ ba, không dùng script hay bất kỳ công cụ nào vi phạm điều khoản của HoYoverse.",
  },
  {
    q: "Giá trên web có phải giá cuối cùng không?",
    a: "Tổng trên web là giá tạm tính theo bảng giá. Các mục như La Hoàn, Nhà Hát, AA, VTMP/VTSP/CTTT, quest thế giới… phụ thuộc độ mạnh acc hoặc tiến độ đã làm nên Jano sẽ báo giá chốt sau khi kiểm tra. Mục gắn tag “IB trao đổi” được báo giá riêng.",
  },
  {
    q: "Mình có được dùng acc trong lúc Jano đang cày không?",
    a: "Để tránh đăng nhập đè gây gián đoạn, bạn nên báo trước khi muốn vào game. Jano sẽ sắp xếp khung giờ hợp lý cho cả hai bên.",
  },
  {
    q: "Mình được theo dõi tiến độ thế nào?",
    a: "Jano cập nhật tiến độ kèm ảnh chụp màn hình qua tin nhắn theo từng mốc công việc. Đơn combo phiên bản sẽ được báo cáo định kỳ trong suốt 40 ngày.",
  },
  {
    q: "Thanh toán như thế nào?",
    a: "Jano chỉ nhận cọc 50% hoặc chuyển khoản full trước khi nhận kèo. Thời gian hoàn thành từ 1 đến 7 ngày tuỳ yêu cầu, ưu tiên làm nhanh cho các bạn chuyển khoản full. Không phát sinh chi phí ngoài báo giá đã thống nhất. Có bài check legit trên Facebook để bạn yên tâm.",
  },
  {
    q: "Có nhận Zenless Zone Zero không?",
    a: "Có! Jano nhận cả 3 tựa game của HoYoverse: Genshin Impact, Honkai: Star Rail và Zenless Zone Zero. Bảng giá trên web hiện dành cho Genshin và Star Rail — với ZZZ bạn IB trực tiếp để được báo giá.",
  },
  {
    q: "Cứu acc / try hard content có nhận mọi acc không?",
    a: "Với hard content, Jano cần check acc trước khi chấp nhận giải cứu. Nếu acc đạt yêu cầu sẽ tiết kiệm rất nhiều thời gian cho bạn.",
  },
  {
    q: "Combo 40 ngày HSR vì sao giới hạn 4 khách?",
    a: "Để đảm bảo chất lượng và tiến độ cho từng acc, mỗi phiên bản Jano chỉ nhận tối đa 4 khách cho combo 40 ngày Honkai: Star Rail. Hãy đặt sớm để giữ slot nhé!",
  },
];

export function ProcessSection() {
  return (
    <section id="quy-trinh" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-violet-300 uppercase">Quy trình</p>
        <h2 className="section-title mt-2">Đặt cày chỉ với 4 bước</h2>
      </div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="glass relative p-5">
            <span className="absolute top-4 right-4 font-display text-4xl font-bold text-white/[0.06]">0{i + 1}</span>
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-violet-200">
              <s.icon className="size-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-white">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-violet-300 uppercase">Cam kết & FAQ</p>
        <h2 className="section-title mt-2">An tâm giao acc cho Jano</h2>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COMMITMENTS.map((c) => (
          <div key={c.title} className="glass p-5">
            <c.icon className="size-6 text-emerald-300" />
            <h3 className="mt-3 font-display font-bold text-white">{c.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ.map((item) => (
          <details key={item.q} className="glass group p-0 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-white">
              <span className="flex items-center gap-2.5">
                <KeyRound className="size-4 shrink-0 text-violet-300" />
                {item.q}
              </span>
              <ChevronDown className="size-4 shrink-0 text-slate-400 transition group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-5 pl-12 text-sm leading-relaxed text-slate-300">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
