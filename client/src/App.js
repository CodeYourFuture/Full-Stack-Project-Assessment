import './App.css';

import { useEffect } from 'react';
//!IMPORTANT - just test of redux and thunk
import { connect } from 'react-redux';
import * as actions from './store/actions/videos';

function App(props) {
  useEffect(() => {
    props.onInitVideos();
  }, [props.onInitVideos]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        {props.videos.map((item) => (
          <div>{item.title}</div>
        ))}
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    videos: state.videos.videos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitVideos: () => dispatch(actions.initVideos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
