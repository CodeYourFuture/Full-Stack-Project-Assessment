const DeleteVideo = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
export default DeleteVideo;
