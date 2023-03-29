import React, {useState, useEffect} from "react";
import AddVid from "./AddVid";
import DeleteBtn from "./DeleteBtn";
import Vote from "./Vote";

const Videos = () => {
  const [state, setState] = useState([]);

  const dataEmb = state.map((obj) => ({...obj, url: obj.url.replace("watch?v=", "embed/")}));
  console.log(dataEmb)


// fetching data from Render
useEffect(() => {
fetch("http://localhost:5000/")
  .then((response) => response.json())
  .then((data) => setState(data));
}, [])
    
return(
        <div>
          <AddVid />
            {dataEmb.map((object) => (<span key={object.id} title={object.title} >
              <h3>{object.title}</h3>
              <iframe
                    width = "560"
                    height="315"
                    src={object.url}
                    title={object.title}
                    frameBorder="1"
                    alt={`video ${object.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                />
                <DeleteBtn dataEmb={dataEmb} videoId={object.id}  />
                <Vote videoId={object.id} count={object.rating} />
            </span>))}      
        </div>
    );
};

export default Videos