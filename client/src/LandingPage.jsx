import AddVideos from "./AddVideos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

function LandingPage() {
  return (
    <div>
      <section className="info">
        <h2>Welcome to RapNB</h2>
        <h4>Your one stop vlog for all Rap and RnB videos </h4>
      </section>

      <div className="landing-area">
        <section className="landing-section about" id="a">
          <h4>About Us</h4>
          <p>
            RapNB is a platform that showcases Rap and RnB music videos you
            would like to see
          </p>
          <p>
            All videos are recommendations from our users and are subject to
            reviews
          </p>
        </section>

        <section className="landing-section add-video" id="b">
          <h4>Want to add a video</h4>
          <p>Follow the link below to our video submission form</p>
          <p>Only YouTube videos are accepted</p>
          <ol className="ins-points">
            <li className="instructions">
              <FontAwesomeIcon
                icon={faVideo}
                beatFade
                style={{ color: "#e2cd4c" }}
              />
              <span>Find a video you like on YouTube</span>
            </li>
            <li className="instructions">
              <FontAwesomeIcon
                icon={faVideo}
                beatFade
                style={{ color: "#e2cd4c" }}
              />
              <span>Copy link of video</span>
            </li>
            <li className="instructions">
              <FontAwesomeIcon
                icon={faVideo}
                beatFade
                style={{ color: "#e2cd4c" }}
              />
              <span>Paste link and title in submission form</span>
            </li>
            <li className="instructions">
              <FontAwesomeIcon
                icon={faVideo}
                beatFade
                style={{ color: "#e2cd4c" }}
              />
              <span>Sit back and enjoy your video selection</span>
            </li>
          </ol>
          <AddVideos />
        </section>

        <section className="landing-section see-video" id="c">
          <h4>Want to see our video selection</h4>
          <a href="/videos">
            <button className="click-btn btn">Click for All Videos</button>
          </a>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
