import invoicesData from "@/mocks/invoices/invoices-list.json";
import { Receipt, Wallet } from "lucide-react";

const currency = new Intl.NumberFormat("vi-VN");

function paymentBadge(status: string) {
  if (status === "PAID") return "bg-emerald-500/15 text-emerald-300";
  if (status === "PARTIAL") return "bg-amber-500/15 text-amber-300";
  return "bg-rose-500/15 text-rose-300";
}

export default function InvoicesPage() {
  const { invoices } = invoicesData;
  const totalRevenue = invoices.reduce((sum, item) => sum + item.grand_total, 0);
  const totalDebt = invoices.reduce((sum, item) => sum + item.debt, 0);

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Hóa Đơn</h1>
        <p className="mt-1 text-base text-white/55">Theo dõi thanh toán, công nợ và lịch sử thu tiền</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="box-card">
          <p className="box-card-subtitle">Tổng hóa đơn</p>
          <p className="mt-1 text-xl font-semibold text-white">{invoices.length}</p>
        </div>
        <div className="box-card">
          <p className="box-card-subtitle">Doanh thu ghi nhận</p>
          <p className="mt-1 text-xl font-semibold text-emerald-300">{currency.format(totalRevenue)} ₫</p>
        </div>
        <div className="box-card">
          <p className="box-card-subtitle">Công nợ còn lại</p>
          <p className="mt-1 text-xl font-semibold text-amber-300">{currency.format(totalDebt)} ₫</p>
        </div>
      </div>

      <div className="space-y-3">
        {invoices.map((invoice) => (
          <div key={invoice.booking_id} className="box-card">
            <div className="flex flex-wrap items-center justify-between gap-2 border-card pb-3">
              <div>
                <p className="text-sm text-white/55">Booking #{invoice.booking_id}</p>
                <p className="text-lg font-semibold text-white">{invoice.customer_name} - {invoice.court_name}</p>
                <p className="text-sm text-white/60">{invoice.start_at.slice(11, 16)} - {invoice.end_at.slice(11, 16)} | {invoice.customer_phone}</p>
              </div>
              <span className={`rounded-md px-2 py-1 text-xs ${paymentBadge(invoice.payment_status)}`}>
                {invoice.payment_status}
              </span>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                <p className="text-white/60">Tiền sân</p>
                <p className="mt-1 font-semibold text-white">{currency.format(invoice.price_court)} ₫</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                <p className="text-white/60">Dịch vụ</p>
                <p className="mt-1 font-semibold text-white">{currency.format(invoice.items_total)} ₫</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                <p className="text-white/60">Đã thanh toán</p>
                <p className="mt-1 font-semibold text-emerald-300">{currency.format(invoice.paid_total)} ₫</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                <p className="text-white/60">Còn nợ</p>
                <p className="mt-1 font-semibold text-amber-300">{currency.format(invoice.debt)} ₫</p>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-[#101010] p-3">
              <p className="mb-2 text-sm font-semibold text-white/85"><Wallet className="mr-1 inline h-4 w-4" />Lịch sử thanh toán</p>
              {invoice.payments.length === 0 ? (
                <p className="text-sm text-white/50">Chưa có thanh toán.</p>
              ) : (
                <div className="space-y-1.5 text-sm">
                  {invoice.payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-white/70">{payment.method} - {payment.paid_at.slice(11, 16)}</span>
                      <span className="font-semibold text-emerald-300">{currency.format(payment.amount)} ₫</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <p className="text-white/60"><Receipt className="mr-1 inline h-4 w-4" />Tổng thanh toán: {currency.format(invoice.grand_total)} ₫</p>
              <button className="rounded-lg border border-white/10 px-3 py-1.5 text-white/80 hover:bg-white/5">Xem chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
