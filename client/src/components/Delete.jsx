import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../App";

const Delete = ({ id }) => {
  const { isDeleting, setIsDeleting } = useContext(AppContext);

  const deleteHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://video-assessment.onrender.com/api/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        setIsDeleting(!isDeleting);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IconButton
      onClick={deleteHandler}
      aria-label="delete"
      size="large"
      sx={{ m: "15px", color: "#ab003c" }}
    >
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  );
};

export default Delete;
