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

export const videoVotingSuccessful = (id, patchedVideo) => {
  return {
    type: actionTypes.VIDEO_VOTING_SUCCESSFUL,
    id,
    patchedVideo,
  };
};

// TODO:" REFACTOR IT - repetitive code
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
