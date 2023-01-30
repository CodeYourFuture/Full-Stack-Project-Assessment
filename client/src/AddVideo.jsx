import React from "react";

function AddVideo({
  titleValue,
  urlValue,
  titleChange,
  urlChange,
  ratingValue,
  ratingChange,
  submit,
}) {
  return (
    <form onSubmit={submit}>
      <div className="title">
        <p>Title :</p>
        <input type="text" value={titleValue} onChange={titleChange} />
      </div>
      <div className="url">
        <p>URL :</p>
        <input type="text" value={urlValue} onChange={urlChange} />
      </div>
      <div className="title">
        <p>Rating:</p>
        <input type="text" value={ratingValue} onChange={ratingChange} />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default AddVideo;
