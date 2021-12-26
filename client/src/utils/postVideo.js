import fetchData from "./fetchData";
export default async function postVideo(
  title,
  url,
  setVideos
) {
  const fullDate = new Date();
  const newVideo = {
    title: title,
    url: url,
    rating: 0,
    date: fullDate.toLocaleDateString(),
    time: `${fullDate.getHours()}:${fullDate.getMinutes()}:${fullDate.getSeconds()}`,
  };
  const postObject = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(newVideo),
  };
  fetchData("/", postObject)
    .then((response) => {
      //if response ok, server will return new id, take id and update page..
      //OR fetch data again but it takes time
      console.log(`response`, response);
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((idObj) => {
      newVideo.id = idObj.id;
      setVideos((prev) => prev.concat(newVideo));
    });
}
