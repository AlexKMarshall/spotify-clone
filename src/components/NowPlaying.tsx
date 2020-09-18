import React from 'react';
import { useQuery } from 'react-query';
import { useClient } from '../context/auth-context';
import { CurrentlyPlaying } from '../types/CurrentlyPlaying';
import { RecentlyPlayedReponse } from '../types/PlayHistory';
import { Track } from '../types/Track';
import ArtistLinkList from './ArtistLinkList';

const useCurrentOrLastPlaying = () => {
  const client = useClient();
  const currentlyPlayingQuery = useQuery('currently-playing', async () => {
    const currentlyPlaying = await client<CurrentlyPlaying | null>('me/player/currently-playing');
    if (currentlyPlaying) return currentlyPlaying.item;
    return null;
  });
  const lastPlayedQuery = useQuery('last-played', async () => {
    const recentlyPlayedResponse = (await client<RecentlyPlayedReponse>(
      'me/player/recently-played',
    )) as RecentlyPlayedReponse;
    const simplifiedTrack = recentlyPlayedResponse.items[0].track;
    const fullTrack = (await client<Track>(`tracks/${simplifiedTrack.id}`)) as Track;
    return fullTrack;
  });

  // TODO tidy up this logic and include error handling
  const isLoading = currentlyPlayingQuery.isLoading || (!currentlyPlayingQuery.data && lastPlayedQuery.isLoading);
  const data = currentlyPlayingQuery.data || lastPlayedQuery.data;

  return { ...currentlyPlayingQuery, isLoading, data };
};

const NowPlaying = () => {
  const { isLoading, data: track } = useCurrentOrLastPlaying();

  if (isLoading || !track) return <div></div>;

  return (
    <div className="flex items-center">
      <a href="/" className="flex-none">
        <img src={track.album.images[2].url} alt={`${track.album.name} Cover`} className="w-14 h-14" />
      </a>
      <div className="ml-3 truncate">
        <div className="text-white truncate hover:underline">
          <a href="/">{track.name}</a>
        </div>
        <div className="text-xs text-gray-500 truncate hover:underline hover:text-white">
          <ArtistLinkList artists={track.artists} />
        </div>
      </div>
      <button className="flex-none ml-3">
        <svg
          className="w-5 h-5 text-spotify-green"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Add to favorites</title>
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default NowPlaying;
