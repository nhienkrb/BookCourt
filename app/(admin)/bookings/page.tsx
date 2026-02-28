import scheduleData from "@/mocks/bookings/daily-schedule.json";
import { Calendar, ChevronLeft, ChevronRight, List, Plus, RefreshCcw } from "lucide-react";

const HOUR_HEIGHT = 56;
const BOOKING_BLOCK_GAP = 6;

const statusTone: Record<string, string> = {
  HOLD: "border-amber-400/50 bg-amber-500/20 text-amber-100",
  CONFIRMED: "border-sky-400/50 bg-sky-500/20 text-sky-100",
  CHECKED_IN: "border-emerald-400/50 bg-emerald-500/20 text-emerald-100",
  COMPLETED: "border-slate-400/50 bg-slate-500/20 text-slate-100",
  CANCELLED: "border-rose-400/50 bg-rose-500/20 text-rose-100",
  NO_SHOW: "border-violet-400/50 bg-violet-500/20 text-violet-100",
};

function toMinutes(isoDatetime: string): number {
  const hhmm = isoDatetime.slice(11, 16);
  const [hh, mm] = hhmm.split(":").map(Number);
  return hh * 60 + mm;
}

function makeHours(startHour: number, endHour: number): string[] {
  return Array.from({ length: endHour - startHour + 1 }, (_, idx) =>
    String(startHour + idx).padStart(2, "0") + ":00"
  );
}

function monthCalendar(dateText: string) {
  const date = new Date(dateText);
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstWeekDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const blanks = Array.from({ length: firstWeekDay }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  return [...blanks, ...days];
}

export default function BookingsPage() {
  const { courts, bookings, date, time_window, summary_today, branch } = scheduleData;
  const monthDays = monthCalendar(date);
  const currentDay = new Date(date).getDate();
  const hours = makeHours(time_window.start_hour, time_window.end_hour);
  const dayHeight = (time_window.end_hour - time_window.start_hour) * HOUR_HEIGHT;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Lịch Đặt Sân</h1>
          <p className="mt-1 text-base text-white/55">Quản lý lịch đặt sân theo ngày</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-white/10 bg-[#161616] px-3 py-2 text-sm text-white/80">
            <RefreshCcw className="mr-2 inline h-4 w-4" />
            Lịch cố định
          </button>
          <button className="rounded-xl bg-surface px-3 py-2 text-sm font-semibold text-black">
            <Plus className="mr-2 inline h-4 w-4" />
            Đặt sân mới
          </button>
        </div>
      </div>

      <div className="box-card flex flex-wrap items-center justify-between gap-3 bg-[#111111] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">Cơ sở:</span>
          <button className="rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm">
            {branch.name}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-md p-2 text-white/70 hover:bg-white/5">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm">
            <Calendar className="mr-2 inline h-4 w-4" />
            06/02/2026
          </button>
          <button className="rounded-md p-2 text-white/70 hover:bg-white/5">
            <ChevronRight className="h-4 w-4" />
          </button>
          <button className="rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm">
            Hôm nay
          </button>
        </div>

        <div className="inline-flex rounded-xl border border-white/10 bg-[#171717] p-1">
          <button className="rounded-lg bg-surface px-4 py-1.5 text-sm font-semibold text-black">
            <Calendar className="mr-1 inline h-4 w-4" />
            Ngày
          </button>
          <button className="rounded-lg px-4 py-1.5 text-sm text-white/70">Tuần</button>
          <button className="rounded-lg px-4 py-1.5 text-sm text-white/70">
            <List className="mr-1 inline h-4 w-4" />
            Danh sách
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <div className="box-card p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <button className="rounded p-1 text-white/50 hover:bg-white/5">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-lg font-semibold text-white">Tháng 2 2026</p>
              <button className="rounded p-1 text-white/50 hover:bg-white/5">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((name) => (
                <div key={name} className="py-1 text-xs text-white/45">
                  {name}
                </div>
              ))}
              {monthDays.map((day, idx) => (
                <div key={`${day ?? "x"}-${idx}`} className="py-1">
                  {day ? (
                    <button
                      className={`h-8 w-8 rounded-full text-sm ${
                        day === currentDay
                          ? "bg-surface font-semibold text-black"
                          : "text-white/80 hover:bg-white/5"
                      }`}
                    >
                      {day}
                    </button>
                  ) : (
                    <span className="inline-block h-8 w-8" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="rounded-xl border border-white/10 bg-[#1a1a1a] py-2 text-sm">
                Hôm nay
              </button>
              <button className="rounded-xl border border-white/10 bg-[#1a1a1a] py-2 text-sm">
                Ngày mai
              </button>
            </div>
          </div>

          <div className="box-card p-3">
            <h3 className="text-base font-semibold text-white">Tổng quan hôm nay</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-white/75">
                <span>Tổng lịch đặt</span>
                <span className="font-semibold text-white">{summary_today.total_bookings}</span>
              </div>
              <div className="flex justify-between text-white/75">
                <span>Đang chơi</span>
                <span className="font-semibold text-emerald-400">{summary_today.playing_now}</span>
              </div>
              <div className="flex justify-between text-white/75">
                <span>Sắp tới</span>
                <span className="font-semibold text-sky-400">{summary_today.upcoming}</span>
              </div>
              <div className="flex justify-between text-white/75">
                <span>Hủy/No-show</span>
                <span className="font-semibold text-rose-400">
                  {summary_today.cancelled_or_no_show}
                </span>
              </div>
            </div>
          </div>
        </aside>

        <div className="box-card overflow-hidden p-0">
          <div
            className="grid border-b border-white/10 bg-[#1f1f1f]"
            style={{ gridTemplateColumns: `60px repeat(${courts.length}, minmax(180px, 1fr))` }}
          >
            <div />
            {courts.map((court) => (
              <div key={court.id} className="py-3 text-center text-lg font-semibold text-white">
                {court.name}
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <div
              className="grid min-w-[840px]"
              style={{
                gridTemplateColumns: `60px repeat(${courts.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="relative border-r border-white/10">
                {hours.map((hour, idx) => (
                  <div
                    key={hour}
                    className="absolute left-0 right-0 -translate-y-1/2 px-2 text-xs text-white/60"
                    style={{ top: idx * HOUR_HEIGHT }}
                  >
                    {hour}
                  </div>
                ))}
              </div>

              {courts.map((court) => (
                <div
                  key={court.id}
                  className="relative border-r border-white/10 last:border-r-0"
                  style={{ height: dayHeight }}
                >
                  {Array.from({ length: time_window.end_hour - time_window.start_hour + 1 }).map(
                    (_, i) => (
                      <div
                        key={`${court.id}-${i}`}
                        className="absolute left-0 right-0 border-t border-white/5"
                        style={{ top: i * HOUR_HEIGHT }}
                      />
                    )
                  )}

                  {bookings
                    .filter((booking) => booking.court_id === court.id)
                    .map((booking) => {
                      const startOffset = toMinutes(booking.start_at) - time_window.start_hour * 60;
                      const endOffset = toMinutes(booking.end_at) - time_window.start_hour * 60;
                      const top = (startOffset / 60) * HOUR_HEIGHT;
                      const height = ((endOffset - startOffset) / 60) * HOUR_HEIGHT;
                      const adjustedTop = top + BOOKING_BLOCK_GAP / 2;
                      const adjustedHeight = Math.max(height - BOOKING_BLOCK_GAP, 28);
                      const tone =
                        statusTone[booking.status as keyof typeof statusTone] ??
                        "border-white/20 bg-white/10 text-white";

                      return (
                        <div
                          key={booking.id}
                          className={`absolute left-1 right-1 rounded-lg border p-2 text-xs shadow-lg ${tone} `}
                          style={{ top: adjustedTop, height: adjustedHeight }}
                        >
                          <p className="truncate text-sm font-semibold">{booking.customer_name}</p>
                          <p className="truncate text-[11px] opacity-90">
                            {booking.start_at.slice(11, 16)} - {booking.end_at.slice(11, 16)}
                          </p>
                          <p className="mt-1 text-[11px] uppercase tracking-wide opacity-90">
                            {booking.status}
                          </p>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
