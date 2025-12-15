export interface Enquiry {
  id: number;
  name: string;
  phone: string;
  service: string;
  message: string;
  created_at?: string;
  [key: string]: any;
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  status?: string;
  notes?: string;
  created_at?: string;
  [key: string]: any;
}

export interface User {
  email: string;
  token: string;
}
