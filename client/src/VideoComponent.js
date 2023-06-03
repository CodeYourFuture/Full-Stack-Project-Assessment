import React from "react";
// import "./VideoComponent.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

const VideoComponent = ({ video, onRemove, onUpvote, onDownvote }) => {
  const { id, title, url, rating } = video;

  const handleRemoveClick = async () => {
    await fetch(`http://127.0.0.1:5000/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    onRemove(id);
  };

  const handleVoteClick = async (vote) => {
    const isUpVote = vote === "upVote";

    await fetch(`http://127.0.0.1:5000/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ isUpVote }),
    });

    if (isUpVote) {
      onUpvote(id);
    } else {
      onDownvote(id);
    }
  };

  return (
    <Container sx={{ py: 5 }} maxWidth="md">
      <Grid container spacing={4}>
        <Grid item key={video.id} xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="iframe"
              src={url.replace("watch?v=", "embed/")}
              title="YouTube video player"
              sx={{
                // 16:9 aspect ratio
                pt: ".25%",
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Votes: {rating}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleRemoveClick}>
                Remove
              </Button>
              <Button
                size="small"
                onClick={() => {
                  handleVoteClick("upVote");
                }}
              >
                Up Vote
              </Button>
              <Button
                size="small"
                onClick={() => {
                  handleVoteClick("downVote");
                }}
              >
                Down Vote
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VideoComponent;
