import "./App.css";
import Header from "./components/Header";

function App() {
  const [videos, setVideos] = useState([]);
  const [search, setNewSearch] = useState("");

  useEffect(() => {
    fetch(`${baseUrl}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  const handleAddVideo = (newVideo) => {
    fetch(`${baseUrl}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Video added successfully with ID:", data.id);
        console.log("Server Response:", data); // Log the entire response
        //updating videos state with new video
        setVideos([...videos, { ...newVideo, id: data.id }]);
      })
      .catch((error) => console.error("Error adding video:", error));
  };

  const handleRemove = (id) => {
    fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Delete request failed with status ${response.status}`
          );
        }
        return response.json();
      })
      .then((result) => {
        if (result.result !== "failure") {
          // Video deleted successfully, update the videos state
          const updatedVideos = videos.filter((video) => video.id !== id); // Use id for comparison
          setVideos(updatedVideos);
        } else {
          console.log("Could not delete video");
        }
      })
      .catch((error) => console.error("Error deleting video:", error));
  };

  const handleSearch = (event) => {
    const newSearch = event.target.value;
    setNewSearch(newSearch);
  };

  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;
