import Iframe from "react-iframe";
import Rate from "./Rate";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Zoom,
} from "@mui/material";
import Delete from "./Delete";
import moment from "moment";
import { useContext } from "react";
import { AppContext } from "../App";

const CreateVideo = (props) => {
  const { id, title, rating, url, time } = props.eachVideo;
  const { isLoading } = useContext(AppContext);

  return (
    <Zoom in={{ isLoading }}>
      <Card
        elevation={16}
        sx={{
          maxWidth: 350,
          height: 400,
        }}
      >
        <Iframe
          url={`https://www.youtube.com/embed/${url.split("=")[1]}`}
          width="370px"
          title={title}
          allow="accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />

        <CardContent sx={{ height: 120 }}>
          <Typography variant="h6">{title}</Typography>
          <Typography fontSize={12}>
            Posted: {moment(time).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </CardContent>

        <CardActions>
          <Rate rating={rating} id={id} />
          <Delete id={id} />
        </CardActions>
      </Card>
    </Zoom>
  );
};

export default CreateVideo;
