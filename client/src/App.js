import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/videos';
import Layout from './hoc/Layout/Layout';
import VideosConstructor from './containers/VideosConstructor/VideosConstructor';
import VideoUploader from './containers/VideoUploader/VideoUploader';

import './App.css';

function App(props) {
  let Routes = (
    <Switch>
      <Route path="/upload" component={VideoUploader} />
      <Route path="/" exact component={VideosConstructor} />
      <Redirect to="/" />
    </Switch>
  );

  return <Layout>{Routes}</Layout>;
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
