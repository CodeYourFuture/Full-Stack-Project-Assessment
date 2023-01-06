export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_VIDEOS':
      return {
        ...state,
        videos: action.payload
      };
    case 'GET_VIDEO':
      return {
        ...state,
        oneVideo: action.payload
      };
    case 'SENDING_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'REQUEST_FINISHED':
      return {
        ...state,
        loading: false
      };
    case 'DELETE_VIDEO':
      return {
        ...state,
        videos: state.videos.filter(oneVid => oneVid.id !== action.payload)
      };
    case 'ADD_VIDEO':
      return {
        ...state,
        videos: [...state.videos, action.payload],
      };

    default:
      return state;
  }
}
