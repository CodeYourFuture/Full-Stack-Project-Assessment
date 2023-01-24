import { React, useState } from 'react';

export default function FormDisabled(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() && url.trim()) {
      props.addVideo(title, url);
      setTitle("");
      setUrl("");
    }
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const urlHandler = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Upload <span className='text-red'>Video</span>
        </h1>
        <form className="mt-6" onSubmit={submitHandler}>
          <div className="mb-2">
            <label
              for="title"
              className="block text-sm font-semibold text-gray-800"
            >
              Title
            </label>
            <input
              value={title}
              onChange={titleHandler}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label
              for="url"
              className="block text-sm font-semibold text-gray-800"
            >
              url
            </label>
            <input
              value={url}
              onChange={urlHandler}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button type="submit" onClick={submitHandler} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Add...
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}