import * as actionTypes from '../actions/actionTypes';

const initialState = {
  videos: [],
};

const reducer = (state = initialState, action) => {
  let id;
  let index;

  switch (action.type) {
    case actionTypes.SET_VIDEOS:
      const fetchedVideos = action.videos;
      return {
        ...state,
        videos: [...fetchedVideos],
      };

    case actionTypes.VIDEO_VOTING_SUCCESSFUL:
      id = action.id;
      const patchedVideo = action.patchedVideo;
      index = state.videos.findIndex((item) => item.id === id);

      return {
        ...state,
        videos: [
          ...state.videos.slice(0, index),
          patchedVideo,
          ...state.videos.slice(index + 1),
        ],
      };

    case actionTypes.VIDEO_SUCCESSFULLY_DELETED:
      id = action.id;
      index = state.videos.findIndex((item) => item.id === id);

      return {
        ...state,
        videos: [
          ...state.videos.slice(0, index),
          ...state.videos.slice(index + 1),
        ],
      };

    default:
      return state;
  }
};

export default reducer;
