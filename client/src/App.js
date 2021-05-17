import "./App.css";
import videos from '../src/data';
import Header from '../src/components/Header';
import Card from '../src/components/Card';
import Footer from './components/Footer';

function createCard(video) {
  return (
    <Card
      key={video.id}
      name={video.title}
      url={video.url}
      rating={video.rating}
    />
  );
}


function App() {
  return (
    <div className="App">
      <Header />

      <div className="main-container">
        {videos.map(createCard)}
      </div>

      <div className='footer'>
        <Footer />
      </div>

    </div>
  );
}

export default App;
