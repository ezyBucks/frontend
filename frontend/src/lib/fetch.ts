export async function makeRequest(url: string, method = "GET", data = {}) {
  let result = await fetch(url, {
    method,
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  let jsonResult = await result.text();
  console.log(result, jsonResult);
}
