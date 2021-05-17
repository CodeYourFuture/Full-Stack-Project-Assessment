import * as actionTypes from '../actions/actionTypes';

const initialState = {
  videos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VIDEOS:
      const fetchedVideos = action.videos;
      return {
        ...state,
        videos: [...fetchedVideos],
      };

    case actionTypes.VIDEO_VOTING_SUCCESSFUL:
      const id = action.id;
      const patchedVideo = action.patchedVideo;
      const index = state.videos.findIndex((item) => item.id === id);

      return {
        ...state,
        videos: [
          ...state.videos.slice(0, index),
          patchedVideo,
          ...state.videos.slice(index + 1),
        ],
      };

    default:
      return state;
  }
};

export default reducer;
