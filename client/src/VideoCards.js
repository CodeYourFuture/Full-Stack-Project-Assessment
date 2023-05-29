import { VoteUpDown } from "./VoteUpDown";

function VideoCards() {
  return (
    <>
      <div class="card">
        <iframe title="myFrame"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text"> 
            Card Rating
          </p>
        </div>
        <VoteUpDown />
      </div>
    </>
  );
}

export default VideoCards;
