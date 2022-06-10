import React from 'react'
import VideoList from '../details/VideoList';
import '../../App.css'

function App() {
  // const [searchTest, setSearchText] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
        <VideoList />
    </div>
  )
  }

export default App
