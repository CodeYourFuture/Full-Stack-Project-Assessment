const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const movies = require("./movieData.json");

// post
app.post("/", function (request, response) {
  let newMovie = request.body;
  const urlRegex = new RegExp(
    "/^((?:https?:)?//)?((?:www|m).)?((?:youtube.com|youtu.be))(/(?:[w-]+?v=|embed/|v/)?)([w-]+)(S+)?$/gm"
  );

  // checks if one of the booking details is empty
  if (
    !newMovie.title ||
    !newMovie.url ||
    !newMovie.id ||
    urlRegex.test(newMovie.url)
  ) {
    response.send({
      result: "failure",
      message: "Video could not be saved",
    });
  }
  // checks is booking id already exists
  else if (movies.find((movie) => movie.id === newMovie.id)) {
    response.status(400);
    response.send("movie already exists");
  } else {
    movies.push(newMovie);
    response.status(201);
    response.send(newMovie);
  }
});

// GET "/"
app.get("/", (req, res) => {
  res.send(movies);
});

// Reading a movies by ID
app.get("/:id", function (request, response) {
  // type conversion to int from string
  console.log(request.params.id);
  let id = parseInt(request.params.id);

  let filteredMovies = movies.find((movie) => movie.id === id);

  // if no booking found
  if (!filteredMovies) {
    response.status(404).send("Nothings found");
    return;
  }
  response.send(filteredMovies);
});

app.delete("/:id", (request, response) => {
  let id = parseInt(request.params.id);
  let deletedMovieIndex = movies.findIndex((movie) => movie.id === id);
  if (deletedMovieIndex > -1) {
    movies.splice(deletedMovieIndex, 1);
    // response.status(204);
    response.send("Movie Successfully deleted");
  } else {
    response.send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
});
