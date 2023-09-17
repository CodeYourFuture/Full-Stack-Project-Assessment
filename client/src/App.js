import {ConfigProvider, Layout} from "antd";
import {useEffect, useState} from "react";
import {myTheme} from "./antd-theme-overrides";
import "./App.css";
import AppHeader from "./components/AppHeader";
import FormAddVideo from "./components/FormAddVideo";
import VideoList from "./components/VideoList";
import {getSortedVideos} from "./helpers/getSortedVideos";

export const API_URL = 'https://video-recomendations-7q29.onrender.com';

function App() {
    const [videos, setVideos] = useState([]);
    const {Content} = Layout;

    useEffect(() => {
        fetch(API_URL).then(res => res.json()).then(({videos}) => setVideos(getSortedVideos(videos)));
    }, [])


    const handleDeleteVideo = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE", // или 'PUT'
                body: JSON.stringify({id}), // данные могут быть 'строкой' или {объектом}!
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then(() => setVideos(videos.filter(video => video.id !== id)));
        } catch (error) {
            console.error({error});
        }
    }

    const handleAddVideo = async ({title, url}) => {
        if (title && url) {
            try {
                await fetch(API_URL, {
                    method: "POST", // или 'PUT'
                    body: JSON.stringify({title, url}), // данные могут быть 'строкой' или {объектом}!
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then(({newVideo}) => setVideos([...videos, {...newVideo}]));
            } catch (error) {
                console.error({error});
            }
        }
    };
    return (
        <ConfigProvider theme={myTheme}>
            <Layout className="App">
                <AppHeader/>
                <Content>
                    <FormAddVideo handleAddVideo={handleAddVideo}/>
                    <VideoList videos={videos} handleDeleteVideo={handleDeleteVideo}/>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}

export default App;
