import React from 'react'

function Rating(props) {
    const handleIncrease = (id) => {
      props.rt(
        props.v.map((video) => {
          if (video.id === id) {
            return { ...video, rating: video.rating + 1 };
          }
          return video;
        })
      );
    };
    const handleDecrease = (id) => {
      props.rt(
        props.v.map((video) => {
          if (video.id === id) {
            return { ...video, rating: video.rating - 1 };
          }
          return video;
        })
      );
    };
    const handleDelete = (id) => {
      props.rt(props.v.filter((video) => video.id !== id));
    };
  return (
    <>
      <div className="container">
        <button
          style={{ margin: "10px" }}
        //   variant="danger"
          onClick={() => handleDelete(props.id.id)}
        >
          Delete
        </button>
        <button
          style={{ margin: "10px" }}
        //   variant="success"
          onClick={() => handleIncrease(props.id.id)}
        >
          +
        </button>
        <span style={{ color: "darkgoldenrod", margin: "10px" }}>
          {"Rating: " + props.id.rating}
        </span>
        <button
          style={{ margin: "10px" }}
        //   variant="danger"
          onClick={() => handleDecrease(props.id.id)}
        >
          -
        </button>
      </div>
    </>
  );
}

export default Rating
