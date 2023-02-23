function AddVideo() {
  return (
    <div>
      <label>
        <input placeholder="add title here"></input>
      </label>
      <label>
        <input placeholder="add url here"></input>
      </label>
      <div className="add-video"></div>
      <button className="btn-add-vid">add video</button>
    </div>
  );
}

export default AddVideo;
