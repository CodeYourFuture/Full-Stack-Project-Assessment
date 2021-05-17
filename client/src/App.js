import './App.css';

// import { useEffect } from 'react';
//!IMPORTANT - just test of redux and thunk
import { connect } from 'react-redux';
import * as actions from './store/actions/videos';

import Layout from './hoc/Layout/Layout';
import VideosConstructor from './containers/VideosConstructor/VideosConstructor';

function App(props) {
  return (
    <Layout>
      <VideosConstructor></VideosConstructor>
    </Layout>
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
