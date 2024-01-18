import React, { useState } from "react";
import { Box, Button, Paper, TextField, Stack } from "@mui/material";

const Add = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const titleHandler = (event) => {
    if (event.keyCode === 13) {
      document.getElementById("add-btn").click();
    }
    setTitle(event.target.value);
  };

  const urlHandler = (event) => {
    if (event.keyCode === 13) {
      document.getElementById("add-btn").click();
    }
    setUrl(event.target.value);
  };

  const addHandler = async (event) => {
    event.preventDefault();

    if (title === "" || title.trim() === "") {
      alert("Please Fill the Title!");
    } else if (url === "" || url.trim() === "") {
      alert("Please Fill the URL!");
    } else {
      // Regex Explanation:
      // It is checking for youtube url validation which is
      // starts by https://www.youtube.com/watch?v= and
      // ends by 11 letters or numbers or special characters.

      const regex =
        /(^https:\/\/www\.youtube\.com\/watch\?v=)([0-9a-zA-Z=\-_+.,:;'?!@#|$%^&*<>()]){11}$/;
      const result = regex.test(url);

      if (!result) {
        alert("URL is not valid!");
      } else {
        try {
          const response = await fetch(
            "https://video-assessment.onrender.com/api/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, url }),
            }
          );
          const data = await response.json();
          if (response.ok) {
            alert(data.message);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  return (
    <Box
      marginX={{ xs: 2, sm: 10, md: 25, lg: 40, xl: 60 }}
      paddingTop={{ xs: 10, md: 5 }}
      sx={{ my: 20 }}
    >
      <Paper elevation={24}>
        <Stack
          paddingX={{ xs: 5, sm: 10, md: 15 }}
          sx={{
            spacing: 2,
            justifyContent: "space-between",
            height: "20rem",
            py: 7,
          }}
        >
          <TextField
            label="Title"
            type="text"
            name="title"
            id="title"
            onKeyUp={titleHandler}
            required
          />
          <TextField
            label="URL"
            type="url"
            name="url"
            id="url"
            onKeyUp={urlHandler}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Box
            sx={{
              direction: "row",
              justifyContent: "",
            }}
          >
            <Button variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              onClick={addHandler}
              variant="contained"
              id="add-btn"
              sx={{ px: 4 }}
            >
              Add
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Add;
