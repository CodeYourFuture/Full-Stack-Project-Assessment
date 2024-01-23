import React, { useState, useEffect } from "react";
import "./AllModulesPage.css";
import CardForTopic from "./Card_For_Topic/Card_for_topic";

export default function AllModulesPage({ refreshmodalData }) {
  const [modalData, setModalData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.DB_URL}/allModulesPage`);
      console.log("response", response);

      const data = await response.json();
      console.log("data", data);

      console.log("fetchData in modalData", data);
      setModalData(data);
    } catch (error) {
      console.log("The ERROR occured in fetchData in DisplaymodalData:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshmodalData]);

  const [openListIndex, setOpenListIndex] = useState(null);

  const handleListHeaderClick = (index) => {
    setOpenListIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [topicStates, setTopicStates] = useState(
    modalData.flatMap((element) => element.topics.map(() => false))
  );

  const toggleTopic = (moduleIndex, topicIndex) => {
    const flatIndex = moduleIndex * modalData[0].topics.length + topicIndex;
    const newTopicStates = [...topicStates];
    newTopicStates[flatIndex] = !newTopicStates[flatIndex];
    setTopicStates(newTopicStates);
  };

  return (
    <div className="modules-container">
      <h1 className="all-modules-header">All Modules</h1>
      <ul className="modules-list">
        {modalData.map((element, index) => (
          <li
            className={`list-item ${index === openListIndex ? "open" : ""}`}
            key={index}
          >
            <div
              className="module-name"
              onClick={() => handleListHeaderClick(index)}
            >
              <h2>{element.module}</h2>
              <p>{element.module.module_description}</p>
            </div>
            <div className="topics-container">
              <ul className="topics-list">
                {element.topics.map((element, subIndex) => (
                  <li
                    key={subIndex}
                    onClick={() => toggleTopic(index, subIndex)}
                    className="topics-container-inner"
                  >
                    <h2>{element.topic_name}</h2>
                    <CardForTopic
                      showTopic={
                        topicStates[
                          index * modalData[0].topics.length + subIndex
                        ]
                      }
                      toggleTopic={() => toggleTopic(index, subIndex)}
                      topic={element}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}





import React from "react";
import "./Card_for_topic.css";

export default function CardForTopic({ topic, showTopic, toggleTopic }) {
  const handleCloseClick = (e) => {
    // Stop the event propagation when the "close btn" is clicked
    e.stopPropagation();
    toggleTopic();
  };

  return (
    showTopic && (
      <div className="selected-topic-container" onClick={toggleTopic}>
        <div
          className="selected-topic-card"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="close-topic-card-button"
            onClick={handleCloseClick}
          >
            close btn
          </button>
          <h2>{topic.topic_name}</h2>
          <p>{topic.topic_description}</p>
          <h6>{topic.reference_link}</h6>
          <h6>{topic.test_link}</h6>
        </div>
      </div>
    )
  );
}





import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./components/home/Home";
import AllModulesPage from "./components/All_Modules_Page/AllModulesPage";
import Management from "./components/management/Management";
import SidePanel from "./components/navBar/SidePanel";

function App() {
  const [refreshModalData, setrefreshModalData] = useState(false);

  return (
    <div className="flex">
      <BrowserRouter>
        <SidePanel />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                refreshModalData={refreshModalData}
                setrefreshModalData={setrefreshModalData}
              />
            }
          />
          <Route
            path="/AllModulesPage"
            element={
              <AllModulesPage
                refreshModalData={refreshModalData}
                setrefreshModalData={setrefreshModalData}
              />
            }
          />
          <Route path="/management" element={<Management />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
