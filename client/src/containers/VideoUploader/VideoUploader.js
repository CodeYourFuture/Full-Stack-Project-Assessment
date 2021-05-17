import { connect } from 'react-redux';
import { useState } from 'react';

import { checkValidity } from '../../utility/utility';
import * as actions from '../../store/actions/videos';
import InputForm from '../../components/inputForm/InputForm';

function VideoUploader(props) {
  const [videoForm, setVideoForm] = useState({
    name: {
      invalidInputInfo: 'Have to contains only letters',
      name: 'Title',
      placeholder: 'Title',
      value: '',

      validation: {
        required: true,
        isName: true,
      },
      valid: false,
      touched: false,
    },
    link: {
      invalidInputInfo: 'It has to be valid YouTube link',
      name: 'YouTubeLink',
      placeholder: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
      value: '',

      validation: {
        required: true,
        isYouTubeLink: true,
      },
      valid: false,
      touched: false,
    },
  });

  const inputChangeHandler = (e, formName) => {
    const updatedForm = {
      ...videoForm,
      [formName]: {
        ...videoForm[formName],
        value: e.target.value,
        touched: true,
        valid: checkValidity(e.target.value, videoForm[formName].validation),
      },
    };
    setVideoForm(updatedForm);
  };

  const formConfirmation = () => {
    const title = videoForm.name.value;
    const url = videoForm.link.value;
    props.videoAdding({ title, url });
  };

  const formElementKeyArray = [];
  for (let key in videoForm) {
    formElementKeyArray.push({
      id: key,
      config: videoForm[key],
    });
  }

  const form = (
    <InputForm
      form={formElementKeyArray}
      formInputHandler={inputChangeHandler}
      clicked={formConfirmation}
      buttonDisable={!(videoForm.name.valid && videoForm.link.valid)}
    />
  );

  return <div>{form}</div>;
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    videoAdding: (video) => dispatch(actions.videoAdding(video)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoUploader);
