"use client";

import customersData from "@/mocks/customers/customers-list.json";
import {
  Medal,
  Pencil,
  Phone,
  Plus,
  Search,
  Star,
  Trash2,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

type Segment = "ALL" | "THUONG" | "THANH_VIEN" | "VIP";

const segmentOptions: { value: Segment; label: string }[] = [
  { value: "ALL", label: "Tất cả hạng" },
  { value: "THUONG", label: "Khách thường" },
  { value: "THANH_VIEN", label: "Thành viên" },
  { value: "VIP", label: "VIP" },
];

const currency = new Intl.NumberFormat("vi-VN");

function getTagLabel(tag: string) {
  if (tag === "VIP") return "VIP";
  if (tag === "THANH_VIEN") return "Thành viên";
  return "Thường";
}

export default function CustomersPage() {
  const [keyword, setKeyword] = useState("");
  const [segment, setSegment] = useState<Segment>("ALL");

  const filteredCustomers = useMemo(() => {
    const normalized = keyword.trim().toLowerCase();
    return customersData.customers.filter((customer) => {
      const matchKeyword =
        !normalized ||
        customer.full_name.toLowerCase().includes(normalized) ||
        customer.phone.includes(normalized) ||
        (customer.email ?? "").toLowerCase().includes(normalized);

      const matchSegment =
        segment === "ALL" || customer.tags.includes(segment as "THUONG" | "THANH_VIEN" | "VIP");

      return matchKeyword && matchSegment;
    });
  }, [keyword, segment]);

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-white">Khách Hàng</h1>
          <p className="mt-1 text-base text-white/55">Quản lý thông tin khách hàng và thành viên</p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-surface px-4 py-2 text-sm font-semibold text-black hover:brightness-95"
        >
          <Plus className="mr-1 inline h-4 w-4" />
          Thêm khách hàng
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm theo tên, số điện thoại..."
            className="h-11 w-full rounded-xl border border-surface/70 bg-[#101010] pl-10 pr-3 text-sm text-white outline-none focus:border-surface"
          />
        </div>

        <select
          value={segment}
          onChange={(e) => setSegment(e.target.value as Segment)}
          className="h-11 rounded-xl border border-white/10 bg-[#151515] px-3 text-sm text-white outline-none"
        >
          {segmentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#121212]">
        {filteredCustomers.map((customer) => {
          const firstTag = customer.tags[0] ?? "THUONG";
          const badgeTone =
            firstTag === "VIP"
              ? "bg-yellow-500/15 text-yellow-300"
              : firstTag === "THANH_VIEN"
              ? "bg-sky-500/15 text-sky-300"
              : "bg-white/10 text-white/70";

          return (
            <div
              key={customer.id}
              className="flex items-start justify-between gap-3 border-b border-white/10 p-4 last:border-b-0"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface/15 text-surface">
                  <UserRound className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-lg font-semibold text-white">{customer.full_name}</p>
                    <span className={`rounded-md px-2 py-0.5 text-xs ${badgeTone}`}>
                      {getTagLabel(firstTag)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm text-white/60">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-yellow-300">
                      <Medal className="h-4 w-4" />
                      <span>{customer.booking_count} lần đặt</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-200">
                      <Star className="h-4 w-4" />
                      <span>{customer.loyalty_points} điểm</span>
                    </div>
                    <div className="font-semibold text-surface">
                      {currency.format(customer.balance_due)} ₫
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1 text-white/60">
                <button type="button" className="hover:text-white" aria-label="Edit customer">
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" className="text-rose-400 hover:text-rose-300" aria-label="Delete customer">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredCustomers.length === 0 ? (
          <div className="p-8 text-center text-sm text-white/55">Không tìm thấy khách hàng phù hợp.</div>
        ) : null}
      </div>
    </section>
  );
}
