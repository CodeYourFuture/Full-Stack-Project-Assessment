// Taken from https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
// Just the regex. Output is in [7].
// (https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*
//                        (v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;

// For testing.
// 19 answered Aug 16, 2018 at 5:31 tsdorsey

/*
   ID will always be in match group 7.
   
   Full Explanation:

   Lets break down the RegExp.

   ^ Lock the string to the start of the string. (https?:\/\/)? 
   Optional protocols http:// or https:// 
   The ? makes the preceding item optional so the s and then the entire group
   (anything enclosed in a set of parenthesis) are optional.

   Ok, this next part is the meat of it. 
   Basically we have two options, the various versions of www.youtube.com/...[id] 
   and the link shortened youtu.be/[id] version.

(                                                  // Start a group which will match everything after the protocol 
                                                      and up to just before the video id.

  (www\.)?                                         // Optional www.

  (youtube(-nocookie)?|youtube.googleapis)         // There are three domains where youtube videos can be accessed. 
                                                      This matches them.

  \.com                                            // The .com at the end of the domain. 

  .*                                               // Match anything 

  (v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/) // These are all the things that can come right before the video id.
                                                      The | character means OR so the first one in the "list" matches.

  |                                                // There is one more domain where you can get to youtube, 
                                                      it's the link shortening url which is just followed by 
                                                      the video id. 
                                                      This OR separates all the stuff in this group 
                                                      and the link shortening url.

  youtu\.be\/                                      // The link shortening domain

)                                                  // End of group

Finally we have the group to select the video ID.
At least one character that is a number, letter, underscore, or dash.

([_0-9a-z-]+)



edited Oct 27, 2021 at 17:35
answered Aug 16, 2018 at 5:31           tsdorsey
*/

export function youtube_regex(text) {
  const rx =
    /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;

  let result = text.match(rx);
  //  null if no matches are found.
  if (!result) return null;

  return result[7]; // ID will always be in match group 7.
}
