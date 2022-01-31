// Style
import classes from "./VideoComponent.module.css";

import videoData from "../../exampleresponse.json";

const VideoComponent = () => {
  return (
    <div className={classes.wrapper}>
      Placeholder, check console :p{console.log(videoData)}
    </div>
  );
};

export default VideoComponent;
