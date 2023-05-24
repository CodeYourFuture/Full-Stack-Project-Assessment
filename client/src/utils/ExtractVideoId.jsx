const ExtractVideoId = (url) => {
  if (url.includes("youtube.com/watch")) {
    return url.split("v=")[1];
  } else if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1];
  }
  return "";
};

export default ExtractVideoId;
