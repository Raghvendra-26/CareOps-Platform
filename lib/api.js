// -----------------------------
// Generic Fetch Wrapper
// -----------------------------
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "API Error");
  }

  return res.json();
}

// -----------------------------
// CRM APIs
// -----------------------------
export const getLeads = () => request("/api/leads");

export const createLead = (data) =>
  request("/api/leads", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateLeadStatus = (id, status) =>
  request(`/api/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const convertLead = (id) =>
  request(`/api/leads/convert/${id}`, {
    method: "POST",
  });

export const getCustomers = () => request("/api/customers");

// -----------------------------
// Booking APIs
// -----------------------------
export const getAppointments = () => request("/api/appointments");

export const createAppointment = (data) =>
  request("/api/appointments", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateAppointmentStatus = (id, status) =>
  request(`/api/appointments/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const deleteAppointment = (id) =>
  request(`/api/appointments/${id}`, {
    method: "DELETE",
  });

// -----------------------------
// Inventory APIs
// -----------------------------
export const getInventory = () => request("/api/inventory");

export const createInventoryItem = (data) =>
  request("/api/inventory", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateInventory = (id, quantity) =>
  request(`/api/inventory/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

export const deleteInventoryItem = (id) =>
  request(`/api/inventory/${id}`, {
    method: "DELETE",
  });

// -----------------------------
// Forms APIs
// -----------------------------
export const getForms = () => request("/api/forms");

export const createForm = (data) =>
  request("/api/forms", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteForm = (id) =>
  request(`/api/forms/${id}`, {
    method: "DELETE",
  });

// -----------------------------
// Responses APIs
// -----------------------------
export const getResponses = (formId) =>
  request(`/api/forms/${formId}/responses`);

export const submitResponse = (formId, data) =>
  request(`/api/forms/${formId}/responses`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// -----------------------------
// Dashboard APIs
// -----------------------------
export const getDashboardStats = () => request("/api/dashboard");
