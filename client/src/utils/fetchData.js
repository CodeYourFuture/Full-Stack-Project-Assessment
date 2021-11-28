export default async function fetchData(
  endPoint,
  methodObj = { method: "GET" }
) {
  const response = await fetch(
    `http://127.0.0.1:5000${endPoint}`,
    methodObj
  );
  return response;
}
