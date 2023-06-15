import Video from "./Video";
import { motion, AnimatePresence } from "framer-motion";

export default function VideosContainer({ videos, deleteVideo, incRating, decRating }) {
  return (
    <div className="container-videos">
      <AnimatePresence>
        {videos.map((video, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 1.5 }}
          >
            <Video key={video.id} video={video} deleteVideo={deleteVideo} incRating={incRating} decRating={decRating} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}