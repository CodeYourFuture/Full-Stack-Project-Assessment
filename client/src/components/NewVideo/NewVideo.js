// Styles
import { Wrapper } from "./NewVideo.styles";

import useInput from "../../hooks/use-input";

// general use function
const isNotEmpty = (value) => value.trim() !== "";

const NewVideo = ({ videoSubmitHandler }) => {
  const {
    value: videoTitleValue,
    isValid: videoTitleIsValid,
    hasError: videoTitleHasError,
    valueChangeHandler: videoTitleChangeHandler,
    inputBlurHandler: videoTitleBlurHandler,
    reset: resetVideoTitle,
  } = useInput(isNotEmpty);

  const {
    value: videoUrlValue,
    isValid: videoUrlIsValid,
    hasError: videoUrlHasError,
    valueChangeHandler: videoUrlChangeHandler,
    inputBlurHandler: videoUrlBlurHandler,
    reset: resetVideoUrl,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (videoTitleIsValid && videoUrlIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const submittedVideo = {
      title: videoTitleValue,
      url: videoUrlValue,
    };

    videoSubmitHandler(submittedVideo);

    resetVideoTitle();
    resetVideoUrl();
  };

  const videoTitleClasses = videoTitleHasError
    ? "form-control invalid"
    : "form-control";
  const videoUrlClasses = videoUrlHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <div className={videoTitleClasses}>
          <label htmlFor='title'>Video Title</label>
          <input
            type='text'
            id='title'
            value={videoTitleValue}
            onChange={videoTitleChangeHandler}
            onBlur={videoTitleBlurHandler}
          />
          {videoTitleHasError && (
            <p className='error-text'>Please Enter video Title</p>
          )}
        </div>

        <div className={videoUrlClasses}>
          <label htmlFor='url'>Video URL</label>
          <input
            type='text'
            id='url'
            value={videoUrlValue}
            onChange={videoUrlChangeHandler}
            onBlur={videoUrlBlurHandler}
          />

          {videoUrlHasError && (
            <p className='error-text'>Please Enter a Valid Youtube URL...</p>
          )}
        </div>

        <div className='form-actions'>
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default NewVideo;
