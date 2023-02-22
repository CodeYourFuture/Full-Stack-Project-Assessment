import "../../assets/css/general.css";

import Video from "./Video";
import { Card } from "antd";
// const { Meta } = Card;

export default function VideoList({
  videos,
  deleteVideo,
  incRating,
  decRating,
}) {
  return (
    <div>
      {videos.map(video => (
        <Card
          hoverable
          style={{
            width: 300,
            display: "inline-block",
            margin: "10px",
          }}
          cover={
            <div className="text-overflow">
              <Video
                key={video.id}
                video={video}
                deleteVideo={deleteVideo}
                incRating={incRating}
                decRating={decRating}
              />
            </div>
          }
        >
          {/* <Meta title={video.title} description={video.rating} /> */}
        </Card>
      ))}
    </div>
  );
}
