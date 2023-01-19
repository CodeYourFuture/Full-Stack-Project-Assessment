import videos from "./exampleresponse.json";

function Cards() {
    return (
      <div className="Cards">
        {videos.map((item, index) => (
          <div key={index} className="card">
            <div className="card-body">
              <h4>{item.title}</h4>
              <h4>{item.rating}</h4>
              <h5>{item.id}</h5>
              <a
                href={item.url}
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Watch Now
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Cards;