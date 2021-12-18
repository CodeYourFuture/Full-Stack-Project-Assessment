export default function deleteHandler(id, setVideos) {
  setVideos((oldVids) => {
    const newVideos = oldVids.filter((video) => video.id !== id);
    return newVideos;
  });
}
