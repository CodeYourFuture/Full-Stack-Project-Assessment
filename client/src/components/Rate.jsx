import { IconButton, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import React, { useContext, useState } from "react";
import { AppContext } from "../App";

const Rate = ({ id, rating }) => {
  const { isRating, setIsRating } = useContext(AppContext);
  const [rate, setRate] = useState(rating);

  const rateHandler = async (direction) => {
    const newRate = direction === "up" ? rate + 1 : rate - 1;
    setRate(newRate);

    try {
      const response = fetch(
        `https://video-assessment.onrender.com/api/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newRate }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        setIsRating(!isRating);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <IconButton
        aria-label="down"
        size="large"
        sx={{ m: "5px", color: "#ab003c" }}
        onClick={() => rateHandler("down")}
      >
        <ThumbDownIcon sx={{ fontSize: "inherit" }} />
      </IconButton>

      <Typography>{rate}</Typography>

      <IconButton
        aria-label="up"
        size="large"
        sx={{ m: "5px", color: "#ab003c" }}
        onClick={() => rateHandler("up")}
      >
        <ThumbUpIcon sx={{ fontSize: "inherit" }} />
      </IconButton>
    </>
  );
};

export default Rate;
