import {ConfigProvider, Layout, Spin} from "antd";
import {useEffect, useState} from "react";
import {myTheme} from "./antd-theme-overrides";
import "./App.css";
import AppHeader from "./components/AppHeader";
import FormAddVideo from "./components/FormAddVideo";
import VideoList from "./components/VideoList";

export const API_URL = 'https://video-recomendations-7q29.onrender.com/api';


function App() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const {Content} = Layout;

    useEffect(() => {
        setLoading(true);
        fetch(API_URL)
            .then(res => res.json())
            .then(({videos}) => setVideos(videos))
            .finally(() => setLoading(false));
    }, [])


    const handleDeleteVideo = (id) => {
        try {
            fetch(`${API_URL}/${id}`, {
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

    const handleAddVideo = ({title, url}) => {
        if (title && url) {
            try {
                fetch(API_URL, {
                    method: "POST", // или 'PUT'
                    body: JSON.stringify({title, url}), // данные могут быть 'строкой' или {объектом}!
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then(() => {
                        setLoading(true);
                        fetch(API_URL)
                            .then(res => res.json())
                            .then(({videos}) => setVideos(videos))
                            .finally(() => setLoading(false));
                    });
            } catch (error) {
                console.error({error});
            }
        }
    };
    return (
        <ConfigProvider theme={myTheme}>
            <div className="App">
                <AppHeader/>
                <Content>
                    <FormAddVideo handleAddVideo={handleAddVideo}/>
                    <Spin tip="Loading" size="large" spinning={loading}>
                        {!loading && !!videos.length &&
                            <VideoList videos={videos} handleDeleteVideo={handleDeleteVideo}/>}
                    </Spin>
                </Content>
            </div>
        </ConfigProvider>
    );
}

export default App;
