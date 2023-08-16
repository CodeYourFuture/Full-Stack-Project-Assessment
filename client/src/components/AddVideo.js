import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

function AddVideo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isYoutubeUrl = (url) => {
    return /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/i.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || !isYoutubeUrl(url)) {
      alert("Please enter a valid title and a valid YouTube URL.");
      return;
    }

    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, url }),
    });

    if (response.ok) {
      const data = await response.json();
      onAdd({ id: data.id, title, url, rating: 0 });
      setTitle("");
      setUrl("");
    } else {
      console.error("Video could not be saved.");
    }
  };

  return (
    <Card className="card mt-5 mb-5 p-4 add-video-card">
      <CardHeader
        title="Add a Video"
        action={
          <Button color="primary" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? "Open" : "Close"}
          </Button>
        }
      />
      {!isCollapsed && (
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="URL"
              fullWidth
              type="url"
              className="mt-3"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <div className="mt-3">
              <Button type="submit" color="primary" variant="contained">
                Add Video
              </Button>
              <Button
                className="ml-2"
                onClick={() => {
                  setTitle("");
                  setUrl("");
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
}

export default AddVideo;
