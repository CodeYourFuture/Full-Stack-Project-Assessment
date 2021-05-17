import { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/videos';

import VideoWidget from '../../components/Video/VideoWidget';

function VideosConstructor(props) {
  useEffect(() => {
    props.onInitVideos();
  }, [props.onInitVideos]);

  const videosWidgetArray = props.videos.map((item) => (
    <VideoWidget key={item.id} video={item} />
  ));

  return <div className="App">{videosWidgetArray}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(VideosConstructor);
