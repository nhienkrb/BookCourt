"use client";

import AdminSidebar from "@/components/layout/admin-sidebar";
import AdminTopbar from "@/components/layout/admin-topbar";
import { createContext, useContext, useMemo, useState } from "react";

type AdminUIContextValue = {
  sidebarOpen: boolean; 
  toggleSidebar: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
};

const AdminUIContext = createContext<AdminUIContextValue | null>(null);

export function useAdminUI() {
  const ctx = useContext(AdminUIContext);
  if (!ctx) throw new Error("useAdminUI must be used within AdminShell");
  return ctx;
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const value = useMemo<AdminUIContextValue>(
    () => ({
      sidebarOpen,
      toggleSidebar: () => setSidebarOpen((s) => !s),
      mobileOpen,
      setMobileOpen,
    }),
    [sidebarOpen, mobileOpen]
  );

  return (
    <AdminUIContext.Provider value={value}>
      <div className="min-h-dvh bg-second text-white">
        <AdminTopbar />

        <div className="flex">
          <AdminSidebar />

          <main className="min-w-0 flex-1 px-4 py-4">{children}</main>
        </div>
      </div>
    </AdminUIContext.Provider>
  );
}