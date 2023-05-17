import "./Steps.css";
import { MiniCard } from "./MiniCard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import AdsClickIcon from "@mui/icons-material/AdsClick";

export const Steps = () => {
  return (
    <div id="addvideo" className="steps-wrapper">
      <h2 className="steps-title">Upload a video in 4 Easy Steps</h2>
      <div className="steps-section-wrapper">
        <ContentCopyIcon
          className="steps-icon"
          style={{
            fontSize: "2.5rem",
            color: "#c990ee",
          }}
        />
        <MiniCard
          miniCardNumber="01"
          miniCardText="Copy the video url from your browser."
        />
      </div>
      <div className="steps-section-wrapper">
        <ContentPasteIcon style={{ fontSize: "2.5rem", color: "#c990ee" }} />
        <MiniCard
          miniCardNumber="02"
          miniCardText="Paste the video url to the url field on the form."
        />
      </div>
      <div className="steps-section-wrapper">
        <KeyboardIcon style={{ fontSize: "2.5rem", color: "#c990ee" }} />
        <MiniCard
          miniCardNumber="03"
          miniCardText="Type a title for your video."
        />
      </div>
      <div className="steps-section-wrapper">
        <AdsClickIcon style={{ fontSize: "2.5rem", color: "#c990ee" }} />
        <MiniCard
          miniCardNumber="04"
          miniCardText="Click the submit button or simply press enter."
        />
      </div>
    </div>
  );
};
