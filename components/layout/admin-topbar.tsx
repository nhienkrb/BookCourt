"use client";

import { useAdminUI } from "@/components/layout/admin-shell";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";

export default function AdminTopbar() {
  const { toggleSidebar, setMobileOpen, sidebarOpen } = useAdminUI();
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex h-14 w-full items-center border-b border-white/10 bg-main text-white">
        <div className="flex items-center gap-2 border-r border-white/10 px-3 md:hidden">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10"
            aria-label="Open sidebar"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="grid h-8 w-8 place-items-center rounded-md bg-surface text-sm font-extrabold text-white">
            B
          </div>
          <span className="text-base font-black tracking-wide text-surface">
            Court
          </span>
        </div>

        <div className={["hidden items-center gap-2 border-r border-white/10 px-3  md:flex justify-between", "transition-[width] duration-200 ease-out", sidebarOpen ? "w-60" : "w-[76px]"].join(" ")}>
          <div className={[" items-center justify-center gap-3",sidebarOpen ? "flex":"duration-200 hidden"].join(" ")}>
             <div className="grid h-8 w-8 place-items-center rounded-md bg-surface text-sm font-extrabold text-white">
            B
          </div>
          <span className="text-2xl font-black tracking-wide text-surface">
            Court
          </span>
          </div>
           <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10"
            aria-label="Toggle sidebar"
            onClick={() => toggleSidebar()}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-w-0 flex-1 items-center px-2 md:px-4">
          <div className="relative w-full max-w-[320px] md:max-w-[380px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/20 focus:bg-white/10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 px-2 md:gap-3 md:px-4">
          <button
            type="button"
            className="hidden h-9 items-center gap-2 rounded-md bg-white/5 px-3 text-sm hover:bg-white/10 sm:flex"
          >
            <span className="max-w-[180px] truncate">Court Phú Nhuận</span>
            <ChevronDown className="h-4 w-4 text-white/70" />
          </button>

          <button
            type="button"
            className="relative grid h-9 w-9 place-items-center rounded-md hover:bg-white/10"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-white/80" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-md bg-red-500" />
          </button>

          <div className="hidden h-6 w-px bg-white/10 md:block" />
          <div className="flex items-center gap-2 md:gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-surface/20 text-sm font-bold text-surface">
              S
            </div>
            <div className="hidden leading-tight lg:block">
              <div className="text-sm font-semibold">Super Admin</div>
              <div className="text-[11px] text-white/60">SUPERADMIN</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
