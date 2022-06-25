export function getVideoData() {
    return fetch("http://localhost:5000/")
      .then((response) => response.json());
}

export function deleteVideo(videoId) {
  fetch(`http://localhost:5000/${videoId}`, {
    method: "DELETE",
  })
  .then((res) => {
    if (res.ok) {
      console.log("HTTP request successful");
    } else {
      console.log("HTTP request unsuccessful");
    }
    return res;
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
  // .then((res) => res.json())
  // .catch(error => {
  //   console.log(error)
  // });
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
    if (res.ok) { console.log("HTTP request successful") }
    else { console.log("HTTP request unsuccessful") }
    return res
})
  .then(res => res.json())
  .catch(error => console.log(error));

}


  