export default async function fetchData(
  endPoint,
  methodObj = { method: "GET" }
) {
  const response = await fetch(
    `https://full-stack-project-video-db.herokuapp.com${endPoint}`,
    methodObj
  );
  return response;
}
