"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Package,
  Receipt,
  Users,
  X,
} from "lucide-react";
import { useAdminUI } from "@/components/layout/admin-shell";
import { useEffect } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/bookings", label: "Lịch đặt sân", icon: CalendarDays },
  { href: "/customers", label: "Khách hàng", icon: Users },
  { href: "/courts", label: "Quản lý sân", icon: ClipboardList },
  { href: "/invoices", label: "Hóa đơn", icon: Receipt },
  { href: "/inventory", label: "Kho & Dịch vụ", icon: Package },
  { href: "/reports", label: "Báo cáo", icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, mobileOpen, setMobileOpen, toggleSidebar } =
    useAdminUI();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  const isActive = (href: string) =>
    href === pathname || pathname.startsWith(href + "/");

  const w = sidebarOpen ? "w-60" : "w-[76px]";

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={[
          "hidden md:flex",
          "h-[calc(100dvh-56px)]",
          "sticky top-14",
          "border-r border-white/10",
          "bg-main",
          "transition-[width] duration-200",
          w,
        ].join(" ")}
      >
        <nav className="flex w-full flex-col gap-2 px-3 py-4">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "group flex items-center gap-3 rounded-xl px-3 py-3",
                  "text-white/80 hover:bg-white/5 hover:text-white",
                  active
                    ? "bg-surface/20 text-surface ring-1 ring-surface/20"
                    : "",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={[
                    "h-5 w-5 shrink-0  group-hover:text-white",
                    active ? " text-surface " : "",
                  ].join(" ")}
                />

                {/* label ẩn khi collapse */}
                <span
                  className={[
                    "truncate text-[15px] font-medium",
                    active ? " text-surface " : "",
                    sidebarOpen ? "block" : "hidden",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Optional: nút collapse nằm dưới */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="mt-2 hidden items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:bg-white/10 md:flex"
          >
            {sidebarOpen ? "Thu gọn" : "Mở rộng"}
          </button>
        </nav>
      </aside>

      {/* Mobile overlay */}
      <div className={["md:hidden", mobileOpen ? "block" : "hidden"].join(" ")}>
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
        <aside className="fixed left-0 top-0 z-60 h-dvh w-[85vw] max-w-72 border-r border-white/10 bg-main p-3 shadow-2xl">
          <div className="flex items-center justify-between px-1 py-2">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-surface text-sm font-extrabold">
                B
              </div>
              <span className="font-bold text-2xl text-surface">Court</span>
            </div>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10"
              aria-label="Close sidebar"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-2 flex flex-col gap-2">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-3",
                    "text-white/80 hover:bg-white/5 hover:text-white",
                    active
                      ? "bg-surface/15 text-surface ring-1 ring-surface/20"
                      : "",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5 shrink-0 text-white/70" />
                  <span className="truncate text-[15px] font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
}
