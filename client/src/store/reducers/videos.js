const initialState = {
  videos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIDEOS':
      console.log(action.videos);
      const fetchedVideos = action.videos;
      console.log(fetchedVideos);
      return {
        ...state,
        videos: [...fetchedVideos],
      };
    default:
      return state;
  }
};

export default reducer;
