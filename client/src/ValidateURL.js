import { youtube_regex } from "./youtube_regex.js";

const message1 = "This is an Invalid Youtube URL";
const message2 = "Either this video is unavailable or it is a private video";

function ValidateURL(title, url, setUpdateFunction) {

  /*
   For example, If it is an invalid URL, 
   the function 'youtube_regex()' will return null

   Otherwise it will return the Youtube ID

   EG FOR "https://youtu.be/dQw4w9WgXcQ";
   IT WILL RETURN "dQw4w9WgXcQ"
 */

  let ID = youtube_regex(url);
  if (!ID) {
    return [false, message1];
  }

  /*
  What follows is a 'hack' that shows the legitimacy of a youtube video by checking the size of the thumbnail
  If the thumbnail size is 120 pixels WIDE it is no longer available!

  This will work EXCEPT for a very small number of Youtube IDs that do exist, 
  but nevertheless lack a preview image and have an 120px-wide one instead. 
  Typically this is because the account owner had deleted them then undeleted them, and sometimes the preview images don't come back.

  SOURCE: https://stackoverflow.com/questions/46399223/async-await-in-image-loading
*/

  let imageUrl = "http://img.youtube.com/vi/" + ID + "/mqdefault.jpg";

  // IIFE - Immediately Invoked Function Expression
  (async () => {
    const img = new Image();
    img.src = imageUrl;

    await img.decode();

    // img is ready to use
    return img.width !== 120; // if the WIDTH is NOT 120 then the URL/Video is valid

  })().then((isOK) => {

    if (isOK) {
      // clear fields
      document.getElementById("enteredTitle").value = "";
      document.getElementById("enteredURL").value = "";
      // Update state with video details
      setUpdateFunction({
        title: title,
        url: url,
        youtube_id: ID,
      });
    } else {
      // The timestamp Date.now() is used to ensure that 'useEffect' in App.js triggers when there is a new message
      setUpdateFunction({ messageID: Date.now(), message: message2 });
    }
  });
}

export default ValidateURL;
