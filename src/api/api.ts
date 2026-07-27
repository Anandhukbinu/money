const API = "https://money-api.anandhukbinu561.workers.dev";

async function request(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

export async function getExpenses() {
  return request(`${API}/expenses`);
}

export async function addExpense(expense: any) {
  return request(`${API}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
}

export async function deleteExpense(id: string) {
  return request(`${API}/expenses/${id}`, {
    method: "DELETE",
  });
}

export async function updateExpense(id: string, expense: any) {
  return request(`${API}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
}