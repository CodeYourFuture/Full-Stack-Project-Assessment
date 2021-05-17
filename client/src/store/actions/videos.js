import axiosInstance from '../../axios-api';
import * as actionTypes from './actionTypes';

/*
setting component after mounting components
*/
export const setVideos = (videos) => {
  return {
    type: actionTypes.SET_VIDEOS,
    videos: videos,
  };
};

export const initVideos = () => {
  return (dispatch) => {
    axiosInstance
      .get('api/videos')
      .then((response) => {
        dispatch(setVideos(response.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

/*
VOTING SYSTEM FOR VIDEOS 
*/

// TODO:" REFACTOR IT - repetitive code

//!IMPORTANT: - create error handling!!!! !TODO:
export const videoUpVote = (id) => {
  const upVoteValue = 1;
  console.log('videoUpVote');
  return (dispatch) => {
    axiosInstance
      .patch('api/videos/' + id, { vote: upVoteValue })
      .then((res) => {
        console.log(res);
        dispatch(videoVotingSuccessful(id, res.data.data));
      });
  };
};

export const videoDownVote = (id) => {
  const upVoteValue = -1;
  console.log('videoUpVote');
  return (dispatch) => {
    axiosInstance
      .patch('api/videos/' + id, { vote: upVoteValue })
      .then((res) => {
        console.log(res);
        dispatch(videoVotingSuccessful(id, res.data.data));
      });
  };
};

export const videoVotingSuccessful = (id, patchedVideo) => {
  return {
    type: actionTypes.VIDEO_VOTING_SUCCESSFUL,
    id,
    patchedVideo,
  };
};

// DELETING VIDEO
export const videoDeleting = (id) => {
  return (dispatch) => {
    axiosInstance.delete('api/videos/' + id).then((res) => {
      console.log(res);
      dispatch(videoDeletedSuccessfully(id));
    });
  };
};

export const videoDeletedSuccessfully = (id) => {
  return {
    type: actionTypes.VIDEO_SUCCESSFULLY_DELETED,
    id,
  };
};
