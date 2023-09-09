import React, { Component } from "react";

class VideoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.title && this.state.url) {
      this.props.handleAddVideo({
        title: this.state.title,
        url: this.state.url,
      });
      this.setState({
        title: "",
        url: "",
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={(e) => this.setState({ title: e.target.value })}
        />
        <input
          type="url"
          placeholder="YouTube URL"
          value={this.state.url}
          onChange={(e) => this.setState({ url: e.target.value })}
        />
        <button type="submit">Add Video</button>
      </form>
    );
  }
}

export default VideoContainer;