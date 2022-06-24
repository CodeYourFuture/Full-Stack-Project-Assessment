import React, { useContext } from "react";

import DeleteIcon from "@mui/icons-material/Delete";

import Rating from "./Rating";

import Context from "../Context/Context";

const Video = ({ id, title, url, rating, posted }) => {
  const ctx = useContext(Context);

  // Trims the title if it's too long
  let trimmedTitle = "";
  for (let i = 0; i < 20; i++) {
    trimmedTitle += title[i];
  }
  trimmedTitle = trimmedTitle.concat("...");
  const displayTitle = title.length < 20 ? title : trimmedTitle;

  // Modal
  const deleteConfirm = () => {
    ctx.setModal(true);
    ctx.setToDelete(id);
  };

  return (
    <div className="Video">
      <h2 className="video-title">{displayTitle}</h2>
      <iframe className="frame" title={title} src={url}></iframe>
      <Rating videoId={id} rating={rating} />
      <DeleteIcon variant="contained" color="error" onClick={deleteConfirm}>
        Delete
      </DeleteIcon>
      {/* If the date exist, the date is split to only show the date. Also, Alternate text if the video
      does not have a posted date */}
      <p>Posted: {posted ? posted.toString().split("T")[0] : "N/A"}</p>
    </div>
  );
};

export default Video;
