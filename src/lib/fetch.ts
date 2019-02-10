/**
 * Make a request to the backend. Send with a bearer token if one has been received.
 * @param url URL to send the request to
 * @param method Type of request. Should be one of GET, POST or PATCH
 * @param data If posting, send this as the body
 */
export async function makeRequest(url: string, method = "GET", data = {}) {
  const fetchOptions: RequestInit = {
    method,
    credentials: 'include'
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
