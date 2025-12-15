export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
  [key: string]: any;
}

export interface Lead {
  id?: number;
  name: string;
  phone: string;
  pickup_location?: string;
  drop_location?: string;
  trip_date?: string;
  status?: "confirmed" | "pending" | "lost";
  notes?: string;
  created_at?: string;
  [key: string]: any;
}

export interface User {
  email: string;
  token: string;
}
