import VideoForm from "../components/VideoForm";
const AddVideoPage = ({ getAllVideos }) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <VideoForm getAllVideos={getAllVideos} />
      </div>
    </>
  );
};

export default AddVideoPage;
