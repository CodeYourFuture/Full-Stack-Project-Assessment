
1. Videos should be loaded from a local javascript variable containing the data included in `exampleresponse.json`
  ```json
  {
    "id": 523523,
    "title": "Never Gonna Give You Up",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "rating": 23
  },
  ```
    - Log `exampleresponse.json` into app to check data is arriving into frontend. ✅

    - We will create a VideoCard component. This will contain a single videos data.✅
    - Hardcode the VideoCard component with information from the object above.✅
        * replace watch?v= with embed/;
        * data.url.replace("watch?v=", "embed/");

  **Notes** We will use props to send the data from exampleresponse.json file to our VideoList component

2. For each video, display a React component that contains
   - The videos title ✅
   - An embedded video ✅
   - The number of votes the video has ✅
   - A button that when clicked removes the video ✅

    - Create a VideoList component with videoList prop (which is state from app level) ✅
    - We need to map through each of the objects from the state that we are passing as a single prop to the VideoList component ✅
    - For each of these objects we are rendering a VideoCard component ✅
    - Each VideoCard component will take the props [id={id}, title={title}, url={url}, rating={rating}] ✅

3. On each video submission there should be two buttons
  - "Up Vote" - This increases the vote score when clicked ✅
  - "Down Vote" - This decreases the vote score when clicked ✅

    - Hard code one button at time add state where necessary
   
4. On the page there must be another React component that will add a Video.
   - It should include fields to add a
     - Title ✅
     - Url ✅
   - When a button is clicked the video should be added to the list ✅

a. Create a VideoForm component ✅
b. Create mock structure below ✅
  ```html
  <form>
    <label for="title">
      Please enter your video title below:
      <input type="text" name="title" id="title" placeholder="Enter video title here" required/>
    </label>
    <label for="url">
      Please enter your video url below:
      <input type="url" name="url" id="url" placeholder="Enter video url here"/>
    </label>
    <button type="submit">Submit</button>
  </form>
  ```
  notes: Check implementation above is correct



5. Your website must follow accessibility guidelines (see below for more details)

==========================================================

  App.jsx

  State variable to hold videoList (initial value will be the data we get from exampleresponse.json)
  
    VideoList.jsx -> props will be [videoList={videoList}]
      VideoCard.jsx -> props will be [id={id}, title={title}, url={url}, rating={rating}]
    VideoForm.jsx -> props will be [videoList={videoList} setVideoList={setVideoList}]

    State variable to hold information that will be updating the videoList state variable declared in App.jsx



## Youtube URL
embedded version:
https://www.youtube.com/embed/lJIrF4YjHfQ
watch version:
https://www.youtube.com/watch?v=lJIrF4YjHfQ


## Youtube URL from data
embedded version:
https://www.youtube.com/embed/dQw4w9WgXcQ
watch version:
https://www.youtube.com/watch?v=dQw4w9WgXcQ


Helpful related articles:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace



===========================================

Make reusable button

We will always need to hand down the following:

- content (can be a text or icon; this goes between the button tags)
- type attribute (eg. submit or delete)
- onClickHandler
- 

=============================================

 Validate URL Workings:

     function validateUrl(urlObject) {
      console.log(urlObject);
      if (urlObject.protocol !== "https:") {
        throw new Error("Protocol must be https:");
      }
      return true;
      // return either validated URL or an error
    }
    //   const unValidatedTitle = event.target.form.title.value;
    const unValidatedUrl = new URL(event.target.form.url.value);
    //   const isValidated = validateUrl(unValidatedUrl);




