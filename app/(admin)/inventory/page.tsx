import inventoryData from "@/mocks/inventory/inventory-products.json";
import { Boxes, PackageSearch, Plus } from "lucide-react";

const currency = new Intl.NumberFormat("vi-VN");

function typeLabel(type: string) {
  if (type === "RENTAL") return "Cho thuê";
  if (type === "SERVICE") return "Dịch vụ";
  return "Tiêu hao";
}

export default function InventoryPage() {
  const { products, booking_items_today: bookingItemsToday } = inventoryData;

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-white">Kho & Dịch Vụ</h1>
          <p className="mt-1 text-base text-white/55">Quản lý sản phẩm, dịch vụ và các item gắn booking</p>
        </div>
        <button className="rounded-lg bg-surface px-4 py-2 text-sm font-semibold text-black">
          <Plus className="mr-1 inline h-4 w-4" />
          Thêm sản phẩm
        </button>
      </div>

      <div className="box-card overflow-hidden p-0">
        <div className="border-card grid grid-cols-[120px_1.2fr_120px_100px_130px_100px_110px] bg-white/5 px-4 py-3 text-sm font-semibold text-white/70">
          <p>SKU</p>
          <p>Tên</p>
          <p>Loại</p>
          <p>Đơn vị</p>
          <p>Đơn giá</p>
          <p>Tồn kho</p>
          <p>Trạng thái</p>
        </div>

        {products.map((item) => (
          <div key={item.id} className="grid grid-cols-[120px_1.2fr_120px_100px_130px_100px_110px] items-center gap-2 border-b border-white/10 px-4 py-3 text-sm last:border-b-0">
            <p className="font-semibold text-white">{item.sku}</p>
            <p className="text-white/85">{item.name}</p>
            <p className="text-white/70">{typeLabel(item.type)}</p>
            <p className="text-white/70">{item.unit}</p>
            <p className="text-emerald-300">{currency.format(item.price)} ₫</p>
            <p className="text-white/80">{item.stock_qty}</p>
            <span className={`inline-flex w-fit rounded-md px-2 py-1 text-xs ${item.status === "ACTIVE" ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-500/20 text-slate-300"}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="box-card">
        <p className="mb-3 text-lg font-semibold text-white"><PackageSearch className="mr-1 inline h-5 w-5" />Booking items hôm nay</p>
        <div className="space-y-2 text-sm">
          {bookingItemsToday.map((entry, idx) => (
            <div key={`${entry.booking_id}-${idx}`} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <div>
                <p className="font-medium text-white">Booking #{entry.booking_id} - {entry.product_name}</p>
                <p className="text-white/60">SL: {entry.quantity} x {currency.format(entry.unit_price)} ₫</p>
              </div>
              <p className="font-semibold text-emerald-300"><Boxes className="mr-1 inline h-4 w-4" />{currency.format(entry.amount)} ₫</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
