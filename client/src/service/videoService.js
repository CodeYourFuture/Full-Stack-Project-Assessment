export function getVideoData() {
    return fetch("http://localhost:5000/", {
      method: "GET"
    })
    .then((response) => response.json());
}

export async function deleteVideo(videoId) {
  await fetch(`http://localhost:5000/${videoId}`, {
    method: "DELETE",
  }).catch(error => {
    console.log('error: ', error);
  });
}

export function insertVideo(videoObj) {
  fetch(`http://localhost:5000/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(videoObj)
  })
  .then(res => {
    if (!res.ok) {
      console.log("HTTP request unsuccessful"); 
    }
    return res
  })
  .catch(error => console.log(error));
}