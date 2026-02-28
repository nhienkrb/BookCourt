import courtsData from "@/mocks/courts/courts-management.json";
import { CircleDot, Clock3, Plus } from "lucide-react";

const currency = new Intl.NumberFormat("vi-VN");

function statusLabel(status: string) {
  if (status === "ACTIVE") return "Đang hoạt động";
  if (status === "MAINTENANCE") return "Bảo trì";
  return "Ngưng hoạt động";
}

function statusClass(status: string) {
  if (status === "ACTIVE") return "bg-emerald-500/15 text-emerald-300";
  if (status === "MAINTENANCE") return "bg-amber-500/15 text-amber-300";
  return "bg-rose-500/15 text-rose-300";
}

export default function CourtsPage() {
  const { branch, courts, price_rules: priceRules } = courtsData;
  const activeCourts = courts.filter((court) => court.status === "ACTIVE").length;

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-white">Quản Lý Sân</h1>
          <p className="mt-1 text-base text-white/55">Danh sách sân và cấu hình giá theo khung giờ</p>
        </div>
        <button className="rounded-lg bg-surface px-4 py-2 text-sm font-semibold text-black">
          <Plus className="mr-1 inline h-4 w-4" />
          Thêm sân
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="box-card">
          <p className="box-card-subtitle">Chi nhánh</p>
          <p className="mt-1 text-xl font-semibold text-white">{branch.name}</p>
          <p className="mt-1 text-sm text-white/60">{branch.address}</p>
        </div>
        <div className="box-card">
          <p className="box-card-subtitle">Sân hoạt động</p>
          <p className="mt-1 text-xl font-semibold text-emerald-300">{activeCourts}/{courts.length}</p>
        </div>
        <div className="box-card">
          <p className="box-card-subtitle">SĐT chi nhánh</p>
          <p className="mt-1 text-xl font-semibold text-white">{branch.phone}</p>
        </div>
      </div>

      <div className="box-card overflow-hidden p-0">
        <div className="border-card grid grid-cols-[90px_1.2fr_1fr_1fr_1fr_120px] bg-white/5 px-4 py-3 text-sm font-semibold text-white/70">
          <p>Mã sân</p>
          <p>Tên sân</p>
          <p>Bề mặt</p>
          <p>Lịch hôm nay</p>
          <p>Doanh thu hôm nay</p>
          <p>Trạng thái</p>
        </div>

        {courts.map((court) => (
          <div key={court.id} className="grid grid-cols-[90px_1.2fr_1fr_1fr_1fr_120px] items-center gap-2 border-b border-white/10 px-4 py-3 last:border-b-0">
            <p className="font-semibold text-white">{court.code}</p>
            <p className="text-white/90">{court.name}</p>
            <p className="text-sm text-white/70">{court.surface_type}</p>
            <p className="text-sm text-white/80">{court.today_bookings} lượt</p>
            <p className="text-sm text-emerald-300">{currency.format(court.today_revenue)} ₫</p>
            <span className={`inline-flex w-fit rounded-md px-2 py-1 text-xs ${statusClass(court.status)}`}>
              {statusLabel(court.status)}
            </span>
          </div>
        ))}
      </div>

      <div className="box-card overflow-hidden p-0">
        <div className="border-card flex items-center justify-between bg-white/5 px-4 py-3">
          <h2 className="box-card-title">Bảng giá theo khung giờ (price_rules)</h2>
          <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">
            Thêm rule
          </button>
        </div>

        {priceRules.map((rule) => (
          <div key={rule.id} className="grid grid-cols-[90px_1fr_1fr_1fr_1fr_1fr_90px] items-center gap-2 border-b border-white/10 px-4 py-3 text-sm last:border-b-0">
            <p className="text-white/70">#{rule.id}</p>
            <p className="text-white/80">{rule.court_id ? `Sân ID ${rule.court_id}` : "Toàn chi nhánh"}</p>
            <p className="text-white/80">{rule.day_type}</p>
            <p className="text-white/80"><Clock3 className="mr-1 inline h-4 w-4" />{rule.start_time.slice(0, 5)} - {rule.end_time.slice(0, 5)}</p>
            <p className="font-medium text-emerald-300">{currency.format(rule.price_per_hour)} ₫/giờ</p>
            <p className="text-white/70">Priority: {rule.priority}</p>
            <p className="text-white/80"><CircleDot className="mr-1 inline h-3 w-3" />{rule.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
