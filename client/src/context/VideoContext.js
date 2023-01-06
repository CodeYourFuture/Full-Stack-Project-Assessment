import React from 'react';
import { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import axios from 'axios';

export const VideosContext = createContext();

export const useGlobalContext = () => {
  return useContext(VideosContext);
}

const defaultState = {
  videos: [],
  oneVideo: [],
  loading: true,
}

export const VideosContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, defaultState);

  //get all videos

  const fetchVideos = async () => {
    try {
      dispatch({ type: 'SENDING_REQUEST' });
      const response = await axios.get('/api/videos');
      const data = await response.data;
      dispatch({ type: 'REQUEST_FINISHED' });
      dispatch({ type: 'GET_VIDEOS', payload: data });
    } catch (error) {
      console.log(error.response.status);
    }
  }

  // get video by id

  const getOneVideo = async (id) => {
    try {
      dispatch({ type: 'SENDING_REQUEST' });
      const response = await axios.get(`/api/videos/${id}`);
      const data = await response.data;
      dispatch({ type: 'REQUEST_FINISHED' });
      dispatch({ type: 'GET_VIDEO', payload: data });
    } catch (error) {
      console.log(error.response.status);
    }
  };

  //delete video by id

  const handleDelete = async (id) => {
    try {
      dispatch({ type: 'SENDING_REQUEST' });
      const response = await axios.delete(`/api/videos/${id}`);
      const data = await response.data;
      console.log(data)
      dispatch({ type: 'REQUEST_FINISHED' });
      dispatch({ type: 'DELETE_VIDEO', payload: id });

      console.log(`video with id ${id} deleted`)

    } catch (error) {
      console.log("Something went wrong", error)
    }
  }

  return (
    <VideosContext.Provider
      value={{
        fetchVideos,
        getOneVideo,
        handleDelete,
        dispatch,
        ...state
      }}>

      {children}

    </VideosContext.Provider >
  )
}
