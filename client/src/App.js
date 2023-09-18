import {ConfigProvider, Divider, Spin, Typography} from "antd";
import {useEffect, useState} from "react";
import "./antd-overrides.css";
import {myTheme} from "./antd-theme-overrides";
import "./App.css";
import AppHeader from "./components/AppHeader";
import ContentContainer from "./components/ContentContainer";
import FormAddVideo from "./components/FormAddVideo";
import SortSelect from "./components/SortSelect";
import VideoList from "./components/VideoList";

export const API_URL = 'https://video-recomendations-7q29.onrender.com';
const getAllVideos = (order, setVideos, setLoading) => {
    setLoading(true);
    fetch(`${API_URL}?order=${order}`)
        .then(res => res.json())
        .then(({videos}) => setVideos(videos))
        .finally(() => setLoading(false));
}

function App() {
    const [videos, setVideos] = useState([]);
    const [order, setOrder] = useState('desc');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllVideos(order, setVideos, setLoading);
    }, [order])


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
                        getAllVideos(order, setVideos, setLoading);
                    });
            } catch (error) {
                console.error({error});
            }
        }
    };

    const handleOrderChange = (value) => {
        setOrder(value);
    }

    return (
        <ConfigProvider theme={myTheme}>
            <div className="App">
                <AppHeader/>
                <ContentContainer>
                    <FormAddVideo handleAddVideo={handleAddVideo}/>
                    <Divider/>
                    <div className='sort-select'>
                        <SortSelect handleOrderChange={handleOrderChange}/>
                    </div>
                    <Spin tip="Loading" size="large" spinning={loading}>
                        {!loading && !!videos.length &&
                            <VideoList videos={videos} handleDeleteVideo={handleDeleteVideo}/>
                        }
                        {!loading && !videos.length &&
                            <Typography.Paragraph italic style={{textAlign: 'center'}}>There are no videos to recommend
                                yet.<br/>Please add
                                yours</Typography.Paragraph>}
                    </Spin>
                </ContentContainer>

            </div>
        </ConfigProvider>
    );
}

export default App;
