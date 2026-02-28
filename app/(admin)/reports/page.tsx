"use client";

import reportsData from "@/mocks/reports/reports-overview.json";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const currency = new Intl.NumberFormat("vi-VN");

export default function ReportsPage() {
  const { kpis, bookings_by_daypart: daypartData, top_courts: topCourts, period } = reportsData;

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Báo Cáo</h1>
        <p className="mt-1 text-base text-white/55">Tổng hợp vận hành từ {period.from} đến {period.to}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="box-card"><p className="box-card-subtitle">Tổng booking</p><p className="mt-1 text-2xl font-semibold text-white">{kpis.total_bookings}</p></div>
        <div className="box-card"><p className="box-card-subtitle">Tỉ lệ lấp sân</p><p className="mt-1 text-2xl font-semibold text-emerald-300">{kpis.occupancy_rate}%</p></div>
        <div className="box-card"><p className="box-card-subtitle">Doanh thu tổng</p><p className="mt-1 text-2xl font-semibold text-white">{currency.format(kpis.revenue_total)} ₫</p></div>
        <div className="box-card"><p className="box-card-subtitle">Công nợ</p><p className="mt-1 text-2xl font-semibold text-amber-300">{currency.format(kpis.outstanding_debt)} ₫</p></div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="box-card">
          <h2 className="box-card-title mb-3">Phân bổ booking theo khung giờ</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daypartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.1)" />
                <XAxis dataKey="label" stroke="rgba(255,255,255,.7)" />
                <YAxis stroke="rgba(255,255,255,.7)" />
                <Tooltip
                  contentStyle={{
                    background: "#111",
                    border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: 12,
                    color: "#fff",
                  }}
                />
                <Bar dataKey="bookings" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="box-card">
          <h2 className="box-card-title mb-3">Top sân theo doanh thu</h2>
          <div className="space-y-2">
            {topCourts.map((court) => (
              <div key={court.court_code} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">Sân {court.court_code}</p>
                  <p className="text-sm text-white/60">{court.bookings} lượt</p>
                </div>
                <p className="mt-1 text-sm text-emerald-300">{currency.format(court.revenue)} ₫</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="box-card"><p className="box-card-subtitle">Completed</p><p className="mt-1 text-xl font-semibold text-emerald-300">{kpis.completed_bookings}</p></div>
        <div className="box-card"><p className="box-card-subtitle">Cancelled</p><p className="mt-1 text-xl font-semibold text-amber-300">{kpis.cancelled_bookings}</p></div>
        <div className="box-card"><p className="box-card-subtitle">No-show</p><p className="mt-1 text-xl font-semibold text-violet-300">{kpis.no_show_bookings}</p></div>
        <div className="box-card"><p className="box-card-subtitle">DV kèm theo</p><p className="mt-1 text-xl font-semibold text-white">{currency.format(kpis.revenue_services)} ₫</p></div>
      </div>
    </section>
  );
}
