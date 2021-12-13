import fetchData from "./fetchData";
export default async function fetchVideos(
  endPoint,
  setVideos
) {
  console.log(
    `Data will fetch with-> ${endPoint} endpoint`
  ); //DELETE LATER
  try {
    const response = await fetchData(endPoint);
    if (response.status === 200) {
      const data = await response.json();
      setVideos(data);
    } else {
      const data = await response.json();
      window.alert(data.msg);
    }
  } catch (error) {
    console.log(error, "-------error");
  }
}
