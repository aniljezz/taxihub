export const fetchEnquiries = async (token: string): Promise<any[]> => {
  try {
    const res = await fetch(`https://jaishriramtourntravels.com/api/enquiries.php?token=${token}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data : data.data || data.enquiries || [];
    }
    return [];
  } catch {
    return [];
  }
};

export const fetchLeads = async (token: string): Promise<any[]> => {
  try {
    const res = await fetch(`https://jaishriramtourntravels.com/api/leads.php?token=${token}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data : data.data || data.leads || [];
    }
    return [];
  } catch {
    return [];
  }
};
