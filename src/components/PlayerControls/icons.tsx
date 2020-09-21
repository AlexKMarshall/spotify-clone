import React from 'react';

export const SkipPrevIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
    <title>Skip Previous</title>
    <path d="M4 5h3v10h3V5zm12 0v10l-9-5 9-5z" />
  </svg>
);

export const SkipNextIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
    <title>Skip Next</title>
    <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
  </svg>
);

export const PlayIcon = () => (
  <svg
    className="w-8 h-8 text-gray-400 hover:text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Play</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    ></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

export const PauseIcon = () => (
  <svg
    className="w-8 h-8 text-gray-400 hover:text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Pause</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export const RepeatIcon = () => (
  <svg className="w-4 h-4 fill-current stroke-current" viewBox="0 0 24 24">
    <title>Repeat</title>
    <path d="M5.41 16H18a2 2 0 002-2 1 1 0 012 0 4 4 0 01-4 4H5.41l2.3 2.3a1 1 0 01-1.42 1.4l-4-4a1 1 0 010-1.4l4-4a1 1 0 111.42 1.4L5.4 16zM6 8a2 2 0 00-2 2 1 1 0 01-2 0 4 4 0 014-4h12.59l-2.3-2.3a1 1 0 111.42-1.4l4 4a1 1 0 010 1.4l-4 4a1 1 0 01-1.42-1.4L18.6 8H6z" />
  </svg>
);

export const SuffleIcon = () => (
  <svg className="w-4 h-4 fill-current stroke-current" viewBox="0 0 20 20">
    <title>Shuffle</title>
    <path d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z" />
  </svg>
);
