import { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/videos';

import VideoWidget from '../../components/Video/VideoWidget';

function VideosConstructor(props) {
  useEffect(() => {
    props.onInitVideos();
  }, [props.onInitVideos]);

  const videosWidgetArray = props.videos.map((item) => (
    <VideoWidget
      videoUpVote={() => props.videoUpVote(item.id)}
      videoDownVote={() => props.videoDownVote(item.id)}
      key={item.id}
      video={item}
    />
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
    videoUpVote: (id) => dispatch(actions.videoUpVote(id)),
    videoDownVote: (id) => dispatch(actions.videoDownVote(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosConstructor);
