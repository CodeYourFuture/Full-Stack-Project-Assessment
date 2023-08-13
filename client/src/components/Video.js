import React from "react";
import { Button, Card, CardHeader, CardContent } from "@material-ui/core";

function Video({ video, onDelete, onUpVote, onDownVote }) {
  const { title, url, rating, uploadedAt } = video;
  const videoId = new URL(url).searchParams.get("v");

  return (
    <Card className="card mt-3 col-sm-6 mx-3">
      <CardHeader
        title={title}
        subheader={`Uploaded on ${new Date(
          uploadedAt
        ).toLocaleDateString()} at ${new Date(
          uploadedAt
        ).toLocaleTimeString()}`}
      />
      <CardContent>
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="mt-2">
          <span>Votes: {rating}</span>
          <Button
            color="primary"
            className="ml-3"
            onClick={() => onUpVote(video)}
          >
            Up Vote
          </Button>
          <Button
            color="secondary"
            className="ml-3"
            onClick={() => onDownVote(video)}
          >
            Down Vote
          </Button>
          <Button className="ml-3" onClick={() => onDelete(video)}>
            Remove Video
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Video;
