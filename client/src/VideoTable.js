import React from 'react';

function VideoTable({ videos }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>URL</th>
          {}
        </tr>
      </thead>
      <tbody>
        {videos.map((video) => (
          <tr key={video.id}>
            <td>{video.title}</td>
            <td>{video.url}</td>
            {}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VideoTable;