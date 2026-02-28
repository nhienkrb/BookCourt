"use client";

import {
  Activity,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Grid2X2,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const revenue30d = [
  { day: "01", value: 150000 },
  { day: "02", value: 160000 },
  { day: "03", value: 170000 },
  { day: "04", value: 155000 },
  { day: "05", value: 148000 },
  { day: "06", value: 162000 },
  { day: "07", value: 175000 },
  { day: "08", value: 160000 },
  { day: "09", value: 158000 },
  { day: "10", value: 170000 },
  { day: "11", value: 165000 },
  { day: "12", value: 172000 },
  { day: "13", value: 168000 },
  { day: "14", value: 180000 },
  { day: "15", value: 178000 },
  { day: "16", value: 173000 },
  { day: "17", value: 182000 },
  { day: "18", value: 190000 },
  { day: "19", value: 188000 },
  { day: "20", value: 194000 },
  { day: "21", value: 900000 },
  { day: "22", value: 540000 },
  { day: "23", value: 510000 },
  { day: "24", value: 830000 },
  { day: "25", value: 570000 },
  { day: "26", value: 680000 },
  { day: "27", value: 980000 },
  { day: "28", value: 360000 },
  { day: "29", value: 0 },
  { day: "30", value: 0 },
];

const bookingShare = [
  { name: "Sáng (6-12h)", value: 25, color: "#10b981" },
  { name: "Trưa (12-17h)", value: 15, color: "#f59e0b" },
  { name: "Tối (17-22h)", value: 45, color: "#6366f1" },
];

const upcomingBookings = [
  { name: "Đinh Thị Ngọc", court: "Sân A1", time: "06:00 - 07:30", status: "Đã xác nhận" },
  { name: "Ngô Văn Mạnh", court: "Sân A2", time: "06:00 - 07:30", status: "Đã xác nhận" },
  { name: "Trương Văn Phong", court: "Sân VIP", time: "06:00 - 07:30", status: "Đã xác nhận" },
  { name: "Đặng Văn Khoa", court: "Sân A2", time: "07:30 - 09:00", status: "Đã xác nhận" },
  { name: "Đặng Văn Khoa", court: "Sân A2", time: "09:00 - 10:30", status: "Đã xác nhận" },
];

const currency = new Intl.NumberFormat("vi-VN");
const totalBooking = bookingShare.reduce((sum, item) => sum + item.value, 0);

export default function DashboardPage() {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Tổng quan</h1>
          <p className="mt-2 text-base text-white/60">Xin chào! Đây là tổng quan hoạt động của bạn.</p>
        </div>

        <div className="inline-flex rounded-2xl border border-white/10 bg-[#141414] p-1">
          {["Hôm nay", "Tuần này", "Tháng này"].map((item) => (
            <button
              key={item}
              type="button"
              className={`rounded-xl px-4 py-2 text-sm font-medium ${
                item === "Tháng này"
                  ? "bg-surface text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="box-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="box-card-subtitle">Doanh thu tháng</p>
              <p className="mt-1 text-4xl font-bold text-white">0 ₫</p>
              <p className="mt-2 text-2xl text-red-500">
                -6.9%
                <span className="ml-1 text-white/55">so với kỳ trước</span>
              </p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-surface/15 text-surface">
              <CircleDollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="box-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="box-card-subtitle">Lượt đặt sân</p>
              <p className="mt-1 text-4xl font-bold text-white">13</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-surface/15 text-surface">
              <CalendarDays size={24} />
            </div>
          </div>
        </div>

        <div className="box-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="box-card-subtitle">Khách hàng hoạt động</p>
              <p className="mt-1 text-4xl font-bold text-white">14</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-surface/15 text-surface">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="box-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="box-card-subtitle">Sân trống / Đang chơi</p>
              <p className="mt-1 text-4xl font-bold text-white">0 / 0</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-surface/15 text-surface">
              <Grid2X2 size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="box-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="box-card-title">Doanh thu 30 ngày qua</h3>
            <p className="text-lg font-semibold text-white">Tổng: 19,320,000 ₫</p>
          </div>

          <div className="h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue30d}>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0e0e0e",
                    border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                  formatter={(value: number) => `${currency.format(value)} ₫`}
                  labelFormatter={(label: string) => `Ngày ${label}`}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="box-card">
          <h3 className="box-card-title mb-4">Phân bổ đặt sân</h3>
          <div className="grid gap-3 sm:grid-cols-[190px_1fr] xl:grid-cols-1 2xl:grid-cols-[190px_1fr]">
            <div className="relative mx-auto h-[190px] w-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    {bookingShare.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-4xl font-bold text-white">{totalBooking}</p>
                  <p className="text-sm text-white/60">Lượt đặt</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {bookingShare.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="status-dot" style={{ backgroundColor: item.color }} />
                    <span className="text-base text-white">{item.name}</span>
                  </div>
                  <span className="text-base text-white/80">
                    {item.value} ({Math.round((item.value / totalBooking) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="box-card">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="box-card-title">Lịch đặt sân sắp tới</h3>
            <button type="button" className="text-sm text-white/70 hover:text-white">
              Xem tất cả
            </button>
          </div>

          <div className="space-y-2">
            {upcomingBookings.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface/15 text-base font-semibold text-surface">
                    {item.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-white/55">
                      {item.court} • {item.time}
                    </p>
                  </div>
                </div>
                <div className="hidden items-center gap-2 text-sm text-white/75 sm:flex">
                  <span className="status-dot bg-blue-500" />
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="box-card">
          <h3 className="box-card-title mb-3">Thao tác nhanh</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Đặt sân mới", icon: CalendarDays, tone: "text-surface bg-surface/15" },
              { label: "Thêm khách hàng", icon: Users, tone: "text-surface bg-surface/15" },
              { label: "Check-in", icon: Clock3, tone: "text-yellow-400 bg-yellow-500/15" },
              { label: "Thanh toán", icon: Activity, tone: "text-fuchsia-400 bg-fuchsia-500/15" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:bg-white/10"
                >
                  <div className={`mx-auto mb-2 grid h-11 w-11 place-items-center rounded-2xl ${item.tone}`}>
                    <Icon size={22} />
                  </div>
                  <p className="text-base font-semibold text-white">{item.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
