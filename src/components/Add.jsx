import { React, } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

export default function Add({ handleC, handleS, state }) {

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <Router>

        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
            Upload Video
          </h1>
          <form className="mt-6" onSubmit={handleS}>
            <div className="mb-2">
              <label
                for="title"
                className="block text-sm font-semibold text-gray-800"
              >
                Title
              </label>
              <input
                onChange={handleC} value={state.title}
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
                onChange={handleC} value={state.url}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Router>
    </div>
  );
}