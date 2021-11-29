import fetchData from "./fetchData";
export default async function deleteVideo(id, setVideos) {
  const deleteObj = {
    method: "DELETE",
  };
  const response = await fetchData(`/${id}`, deleteObj);
  console.log(response, ">>>>>");
  if (response.status === 204) {
    setVideos((previousVideos) =>
      previousVideos.filter((video) => video.id !== id)
    );
  }
}
