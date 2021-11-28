export default async function fetchData(endPoint) {
  const response = await fetch(
    `http://127.0.0.1:5000/${endPoint}`
  );
  return response;
}
