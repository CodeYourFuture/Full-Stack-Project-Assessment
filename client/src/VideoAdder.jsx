import React, { useState } from "react";

const VideoAdder = ({ isOpen, onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const videoId = url.split("v=")[1];
    const link = `https://www.youtube.com/embed/${videoId}`;
    console.log(link, "<--- Video");
    onAdd({ title, url: link });

    //    onAdd({ title, url });
    setTitle("");
    setUrl("");
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-900 opacity-100 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <form
        className="w-full max-w-md mx-auto p-4 bg-white"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="url"
            >
              URL
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="url"
              required
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Video
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoAdder;
