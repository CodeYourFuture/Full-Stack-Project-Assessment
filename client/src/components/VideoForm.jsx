import React from "react";

function VideoForm({ videoData, setVideoData }) {
  function addVideoHandler(event) {
    /**
     We are creating a new video object and adding to state 
     */

    event.preventDefault();

    console.log("reportValidity part --->", event.target.form.reportValidity());
    if (!event.target.form.reportValidity()) {
      return;
    }

    const formTitle = event.target.form.title.value;
    const formUrl = event.target.form.url.value;

    const newData = {
      id: parseInt(Math.random() * 1000),
      title: formTitle,
      url: formUrl,
      rating: 0,
    };

    try {
      // validateUrl(unValidatedUrl);
      setVideoData([...videoData, newData]);
      console.log("Video Data from VideoForm--> ", videoData);
    } catch (e) {
      console.log(e);
    }
    event.target.form.reset();

  }
  return (
    <div>
      <form>
        <label htmlFor="title">
          Please enter your video title below:
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter video title here"
            required
          />
        </label>
        <label htmlFor="url">
          Please enter your YouTube video url below:
          <input
            type="url"
            name="url"
            id="url"
            placeholder="Enter YouTube video url here"
          />
        </label>
        <button onClick={addVideoHandler} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default VideoForm;

/*   
https://www.youtube.com/watch?v=4Zyr5a3m0Fc&t=8s
    Using the URL above we will supply it along with a title to be submitted
    When the query is submitted  we will update State with the URL as it is and the title
    Later we will generate  a unique ID and a rating as zero;
*/

/*
    Check the protocol ✅
        - the title can be any string- 200 characters

        urls we will accept:
         - embed url
         (if embed, then load directly into the object source)
         - watch url
         (if watch, then use regex to create valid embed url before adding to object source)
         - https//
         - www.
         - https://www.youtube.com/watch?v=
         - https://www.youtube.com/embed/
         - https://m.youtube.com/watch?app=
         - https://m.youtube.com/embed/

hash: ""
host:"www.youtube.com"
hostname:"www.youtube.com"
href:"https://www.youtube.com/watch?v=oEjZk15SXaU"
origin:"https://www.youtube.com"
password: ""
pathname: "/watch"
port: ""
protocol: "https:"
search: "?v=oEjZk15SXaU"
searchParams: URLSearchParams {size: 1}
username:""

https://www.youtube.com/embed/dQw4w9WgXcQ
hash:""
host: "www.youtube.com"
hostname: "www.youtube.com"
href: "https://www.youtube.com/embed/dQw4w9WgXcQ"
origin: "https://www.youtube.com"
password: ""
pathname:"/embed/dQw4w9WgXcQ"
port: ""
protocol: "https:"
search: ""
searchParams:URLSearchParams {size: 0}
username:""

*/
