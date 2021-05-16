import axios from "axios"
import axiosInstance from "../../axios-api"


export const setVideos = (videos) => {
    return {
        type: "SET_VIDEOS",
        videos: videos
    }
}

export const initVideos = () => {
    return(dispatch) => {
        axiosInstance
            .get("api/videos")
            .then((response) => {
                dispatch(setVideos(response.data.data))
        }).catch(err => {
            console.log(err)
        })
    }
}