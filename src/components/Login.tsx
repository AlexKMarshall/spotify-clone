import React from 'react';

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-library-read',
];

const Login = () => {
  return (
    <a
      href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        '%20',
      )}&response_type=token&show_dialog=true`}
    >
      Login to Spotify
    </a>
  );
};

export default Login;
