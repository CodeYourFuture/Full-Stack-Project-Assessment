const PostVideo = async (obj) => {
  try {
    const res = await fetch(`http://localhost:5000/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
export default PostVideo;
