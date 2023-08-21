import React from "react";

function VideoForm({ videoData, setVideoData }) {
    
    function addVideoHandler(event) {
    /**
     We are creating a new video object and adding to state 
     */
    event.preventDefault();

    function validateUrl(urlObject) {
        console.log(urlObject)
      if (urlObject.protocol !== "https:") {
          console.log("line number 6")
        throw new Error("Protocol must be https:");
      }
      return true;
      // return either validated URL or an error
    }
    //   const unValidatedTitle = event.target.form.title.value;
    const unValidatedUrl = new URL(event.target.form.url.value);
    //   const isValidated = validateUrl(unValidatedUrl);
    try {
        validateUrl(unValidatedUrl);
    } catch (e) {
        console.log(e);
    }
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
  }
  return (
    <div>
      <form>
        <label for="title">
          Please enter your video title below:
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter video title here"
            required
          />
        </label>
        <label for="url">
          Please enter your video url below:
          <input
            type="url"
            name="url"
            id="url"
            placeholder="Enter video url here"
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
