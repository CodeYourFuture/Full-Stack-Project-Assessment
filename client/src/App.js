import "./App.css";
// import React from "react";
import addVideo from "./Componets/AddVideos/AddVidoes";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        </header>
        {/* <addVideo/> // This is the line that is causing the error */}

         <div className="container">
           <div className="row">
             <div className="col-md-4">
              <div className="card card-body">
                 <h4>Create a new video</h4>
               <div className="form-group">
                 <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    name="title"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="URL"
                    name="url"
                  />
                </div>
                <form action="/upload" method="post" enctype="multipart/form-data">
                  <input type="file" name="file" />
                  <input type="submit" />
                </form>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item list-group-item-action">
                  <a href="https://www.youtube.com/watch?v=7WwtzsSHdpI" target="_blank">
                    <h4>Video 1</h4>
                  </a>
                  <p>Description</p>
                  <button className="btn btn-secondary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </li>
                <li className="list-group-item list-group-item-action">
                  <a href="https://www.youtube.com/watch?v=7WwtzsSHdpI" target="_blank">
                    <h4>Video 2</h4>
                  </a>
                  <p>Description</p>
                  <button className="btn btn-secondary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </li>
                <li className="list-group-item list-group-item-action">
                  <a href="https://www.youtube.com/watch?v=7WwtzsSHdpI" target="_blank">
                    <h4>Video 3</h4>
                  </a>
                  <p>Description</p>
                  <button className="btn btn-secondary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
          
        
        
    </div>
  
    
  );
}

export default App;
