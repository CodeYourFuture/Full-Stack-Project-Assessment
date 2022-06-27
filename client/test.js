const quantity = [1, 2, 1];
const shape = ["diamond", "diamond", "snake"];
const color = ["blue", "red", "red"];
const pattern = ["blank", "blank", "striped"];

function isValidSet(quantities, shapes, color, patterns) {
  let isValid;
  let i = 0;
  if (
    ((quantity[i] === quantity[i + 1]) === quantity[i + 2] ||
      (quantity[i] !== quantity[i + 1]) !== quantity[i + 2]) &&
    ((shape[i] === shape[i + 1]) === shape[i + 2] ||
      (shape[i] !== shape[i + 1]) !== shape[i + 2]) &&
    ((shape[i] === shape[i + 1]) === shape[i + 2] ||
      (shape[i] !== shape[i + 1]) !== shape[i + 2]) &&
    ((pattern[i] === pattern[i + 1]) === pattern[i + 2] ||
      (pattern[i] !== pattern[i + 1]) !== pattern[i + 2])
  ) {
    isValid = true;
  } else {
    isValid = false;
  }

  return isValid;
}

console.log(isValidSet(quantity, shape, color, pattern));



return (
  <div className="videos-Container">
    {videoData
      .filter((movie) => !removedId.includes(movie.id))
      .map((movie) => {
        const { id, title, url, rating } = movie;
        return (
          <div key={id} className="video">
            <div className="iframe_div">
              <iframe
                width="300"
                height="215"
                src={url.replace("watch?v=", "embed/")}
                title={title}
              ></iframe>
            </div>

            <div>
              <p>Title : {title}</p>
            </div>

            <Rating rating={rating} />
            <DeleteButton onDelete={handleDelete} />
            <button
              onClick={() => {
                handleClick(id);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
  </div>
);