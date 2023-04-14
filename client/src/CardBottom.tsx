import { useState } from "react";
import CardOverflow from "@mui/joy/CardOverflow";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import Button from "@mui/joy/Button";
import { CardBottomType, voteStatusType } from "./utils/types";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

const CardBottom = ({ item, setOriginalData }: CardBottomType) => {
  const [voteState, setVoteState] = useState<voteStatusType>({
    like: false,
    unlike: false,
  });

  const handleVote = (
    id: number,
    rating: number,
    actionName: "like" | "unlike"
  ) => {
    setVoteState((prev) =>
      prev[actionName === "like" ? "unlike" : "like"]
        ? {
            ...prev,
            [actionName]: true,
            [actionName === "like" ? "unlike" : "like"]: false,
          }
        : {
            ...prev,
            [actionName]: !prev[actionName],
          }
    );

    setOriginalData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              rating:
                actionName === "like" && voteState.unlike === true
                  ? rating + 2
                  : actionName === "like" && voteState.like === true
                  ? rating - 1
                  : actionName === "like" && voteState.like === false
                  ? rating + 1
                  : actionName === "unlike" && voteState.like === true
                  ? rating - 2
                  : actionName === "unlike" && voteState.unlike === true
                  ? rating + 1
                  : actionName === "unlike" && voteState.unlike === false
                  ? rating - 1
                  : rating + 1,
            }
          : item
      )
    );
  };
  return (
    <CardOverflow
      variant="soft"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 1.5,
        py: 1.5,
        px: "var(--Card-padding)",
        bgcolor: "background.level1",
      }}
    >
      <Button
        aria-label="Like"
        variant={voteState.like ? "outlined" : "soft"}
        color={voteState.like ? "success" : "neutral"}
        onClick={() => handleVote(item.id!, item.rating!, "like")}
      >
        {voteState.like ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
      </Button>

      <Divider orientation="vertical" />
      <Typography mt={1} fontWeight="lg" textColor="#fff">
        {item.rating} votes
      </Typography>
      <Divider orientation="vertical" />
      <Button
        aria-label="unLike"
        variant={voteState.unlike ? "outlined" : "soft"}
        color={voteState.unlike ? "danger" : "neutral"}
        onClick={() => handleVote(item.id!, item.rating!, "unlike")}
      >
        {voteState.unlike ? <ThumbDownAltIcon /> : <ThumbDownAltOutlinedIcon />}
      </Button>
    </CardOverflow>
  );
};

export default CardBottom;
