export type BookingStatus =
  | "HOLD" | "CONFIRMED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

export interface Court {
  id: number;
  branch_id: number;
  code: string;
  name: string | null;
  surface_type: string | null;
  status: "ACTIVE" | "MAINTENANCE" | "INACTIVE";
}

export interface Booking {
  id: number;
  branch_id: number;
  court_id: number;
  customer_id: number | null;
  customer_name: string | null;
  customer_phone: string | null;
  start_at: string; // ISO datetime
  end_at: string;
  status: BookingStatus;
  price_court: number;
  discount_amount: number;
  note: string | null;
}
