import React, { useState } from "react";
import { Input, Button, Typography, Tooltip, IconButton } from "@mui/joy";
import Grid from "@mui/material/Grid";
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  PostAdd as PostAddIcon,
} from "@mui/icons-material";
import { NavType, originalDataType } from "./utils/types";
import { data_url } from "./utils/url";
import WarningAlert from "./WarningAlert";

const Nav = ({
  fetchData,
  orderStatus,
  setOrderStatus,
  error,
  setError,
}: NavType) => {
  const [addVideo, setAddVideo] = useState<originalDataType>({
    title: "",
    url: "",
  });

  const toggleOrderStatus = () => {
    setOrderStatus((prev) => ({ desc: !prev.desc, asc: !prev.asc }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        !addVideo.title ||
        !addVideo.url ||
        !addVideo.url.includes("https://www.youtube.com/watch?v=")
      ) {
        return setError(true);
      }

      const response = await fetch(data_url, {
        method: "POST",
        body: JSON.stringify(addVideo),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setError(false);
        setAddVideo({
          title: "",
          url: "",
        });
      }
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav>
      <Typography level="h1">Video Recommendation</Typography>
      <Grid container>
        <Grid item xs={11}>
          <form onSubmit={handleSubmit}>
            <Input
              startDecorator={
                <Input
                  startDecorator={<PostAddIcon />}
                  placeholder="Video Title"
                  value={addVideo.title}
                  onChange={(e) =>
                    setAddVideo((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              }
              endDecorator={
                <Tooltip arrow title="Add Video" variant="solid">
                  <Button type="Submit">Submit</Button>
                </Tooltip>
              }
              placeholder="Video Url"
              value={addVideo.url}
              onChange={(e) =>
                setAddVideo((prev) => ({ ...prev, url: e.target.value }))
              }
              required
            />
          </form>
        </Grid>
        <Grid item xs={1}>
          <Tooltip arrow title="Asc" variant="solid">
            <IconButton
              variant="solid"
              disabled={orderStatus.asc}
              onClick={toggleOrderStatus}
            >
              <ArrowDropUpIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            arrow
            title="Desc"
            variant="solid"
            onClick={toggleOrderStatus}
          >
            <IconButton variant="solid" disabled={orderStatus.desc}>
              <ArrowDropDownIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        {error && <WarningAlert setError={setError} />}
      </Grid>
    </nav>
  );
};

export default Nav;
