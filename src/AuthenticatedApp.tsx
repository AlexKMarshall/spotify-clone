import React from 'react';
import { Link } from 'react-router-dom';

import ContentPane from './components/ContentPane';
import NowPlaying from './components/NowPlaying';
import PlayerControls from './components/PlayerControls';
import UserProfile from './components/UserProfile';

const AuthenticatedApp = () => {
  return (
    <div className="flex flex-col h-screen text-sm text-gray-400">
      <div className="flex flex-row flex-1 overflow-y-hidden top">
        <div className="flex flex-col justify-between w-48 font-semibold bg-spotify-gray-900">
          <Link to="/" className="pt-6 mx-5">
            <svg viewBox="0 0 1134 340" className="w-32 text-white">
              <title>Spotify</title>
              <path
                fill="currentColor"
                d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h3v-6h3l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h3z"
              ></path>
            </svg>
          </Link>
          {/* navigation */}
          <ul className="py-6 font-bold">
            <li>
              <Link to="/" className="flex items-center px-4 py-2 mx-2 mt-4 text-white rounded-sm bg-spotify-gray-600">
                <span className="mr-4">
                  {/* This is the active version <svg
                    viewBox="0 0 512 512"
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 256.274 60.84 L 84.324 166.237 L 84.324 443.063 L 193.27 443.063 L 193.27 293.73 L 320.228 293.73 L 320.228 443.063 L 428.222 443.063 L 428.222 165.476 L 256.274 60.84 Z M 256.274 35.95 L 448.452 149.145 L 448.452 464.395 L 300 464.395 L 300 315.062 L 213.499 315.062 L 213.499 464.395 L 64.095 464.395 L 64.095 150.161 L 256.274 35.95 Z"
                      fill="currentColor"
                    ></path>
                  </svg> */}
                  <svg viewBox="0 0 512 512" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z"></path>
                  </svg>
                </span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center px-4 py-2 mx-2 mt-4 transition duration-300 hover:text-white">
                <span className="mr-4">
                  <svg viewBox="0 0 512 512" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center px-4 py-2 mx-2 mt-4 transition duration-300 hover:text-white">
                <span className="mr-4">
                  <svg viewBox="0 0 512 512" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z"></path>
                  </svg>
                </span>
                <span>Your Library</span>
              </Link>
            </li>
          </ul>
          <div className="px-5 mt-2 font-bold">
            <h3 className="text-xs tracking-widest uppercase ">Playlists</h3>
            <button className="flex items-center mt-2 font-bold group">
              <span className="p-1 mr-4 text-black transition-colors duration-300 bg-spotify-gray-400 group-hover:bg-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </span>
              <span className="transition-colors duration-300 group-hover:text-white">Create Playlist</span>
            </button>
            {/* Liked song button needs a transition on the gradient background */}
            <button className="flex items-center mt-2 font-bold group">
              <span className="p-1 mr-4 transition-colors duration-300 bg-gradient-to-br from-indigo-900 to-gray-400 group-hover:text-white group-hover:from-indigo-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  ></path>
                </svg>
              </span>
              <span className="transition-colors duration-300 group-hover:text-white">Liked Songs</span>
            </button>
            <hr className="mt-3 border-spotify-gray-500" />
          </div>
          <div className="flex-1 px-5 mt-2 overflow-y-auto sidebar-spotify">
            <ul className="leading-extra-loose">
              <li className="truncate">
                <Link to="/" className="hover:text-white">
                  Discover Weekly
                </Link>
              </li>
              <li className="truncate">
                <Link to="/" className="hover:text-white">
                  New For You
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-4 bg-black">
            <Link to="/" className="flex items-center px-5 py-4 transition-colors duration-300 hover:text-white">
              <span>
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-4">
                  <title>Download icon</title>
                  <path
                    d="M12 11.657V6h-1v5.65L9.076 9.414l-.758.65 3.183 3.702 3.195-3.7-.758-.653L12 11.657zM11.5 2C7.358 2 4 5.358 4 9.5c0 4.142 3.358 7.5 7.5 7.5 4.142 0 7.5-3.358 7.5-7.5C19 5.358 15.642 2 11.5 2zm0 14C7.916 16 5 13.084 5 9.5S7.916 3 11.5 3 18 5.916 18 9.5 15.084 16 11.5 16z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>
              <span>Install App</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-spotify-gray-800">
          <div className="flex items-center justify-between px-6 py-2">
            <div className="flex items-center">
              <button className="bg-black rounded-full">
                <svg className="w-10 h-10 text-gray-400 fill-current hover:text-white" viewBox="0 0 24 24">
                  <title>Back</title>
                  <path d="M14.7 15.3a1 1 0 01-1.4 1.4l-4-4a1 1 0 010-1.4l4-4a1 1 0 011.4 1.4L11.42 12l3.3 3.3z" />
                </svg>
              </button>
              <button className="ml-4 bg-black rounded-full">
                <svg className="w-10 h-10 text-gray-400 fill-current hover:text-white" viewBox="0 0 24 24">
                  <title>Forward</title>
                  <path d="M9.3 8.7a1 1 0 011.4-1.4l4 4a1 1 0 010 1.4l-4 4a1 1 0 01-1.4-1.4l3.29-3.3-3.3-3.3z" />
                </svg>
              </button>
            </div>
            <UserProfile />
          </div>
          <ContentPane />
        </div>
      </div>
      <div className="flex items-center justify-between flex-none px-5 border-t border-black h-22 bg-spotify-gray-700">
        <NowPlaying />
        <PlayerControls />
        <div className="flex items-center">
          <button>
            <svg
              className="w-6 h-6 text-gray-400 fill-current hover:text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <title>Queue</title>
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
            </svg>
          </button>
          <button className="ml-4">
            <svg className="w-5 h-5 text-gray-400 fill-current hover:text-white" viewBox="0 0 24 24">
              <title>Devices</title>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 6h18V4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h3v-2H3V6zm10 6H9v1.78c-.61.55-1 1.33-1 2.22s.39 1.67 1 2.22V20h3v-1.78c.61-.55 1-1.34 1-2.22s-.39-1.67-1-2.22V12zm-2 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM22 8h-6c-.5 0-1 .5-1 1v10c0 .5.5 1 1 1h6c.5 0 1-.5 1-1V9c0-.5-.5-1-1-1zm-1 10h-4v-8h3v8z" />
            </svg>
          </button>
          <button className="ml-4">
            <svg className="w-5 h-5 text-gray-400 fill-current hover:text-white" viewBox="0 0 24 24">
              <title>Mute</title>
              <path d="M3 9v6h3l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button>
          <div className="w-20 h-1 ml-3 bg-gray-500 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
