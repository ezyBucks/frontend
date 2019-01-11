export async function makeRequest(url: string, method = "GET", data = {}) {
  const token = localStorage.getItem("token");
  const fetchOptions: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  if (method.toUpperCase() === "POST") {
    fetchOptions.headers = {
      ...fetchOptions.headers,
      "Content-Type": "application/json"
    };
    fetchOptions.body = JSON.stringify(data);
  }
  let result = await fetch(url, fetchOptions);
  return result;
}
