import React from 'react';
import { useQuery } from 'react-query';
import { useClient } from '../context/auth-context';
import { CurrentlyPlaying } from '../types/CurrentlyPlaying';
import { RecentlyPlayedReponse } from '../types/PlayHistory';
import { Track } from '../types/Track';
import ArtistLinkList from './ArtistLinkList';
import LoadingIndictator from './LoadingIndicator';

const useCurrentOrLastPlaying = () => {
  const client = useClient();
  const query = useQuery('currentOrLastPlaying', async () => {
    const currentlyPlaying = await client<CurrentlyPlaying | null>('me/player/currently-playing');
    if (currentlyPlaying) {
      return currentlyPlaying.item;
    } else {
      const recentlyPlayedResponse = (await client<RecentlyPlayedReponse>(
        'me/player/recently-played',
      )) as RecentlyPlayedReponse;
      const simplifiedTrack = recentlyPlayedResponse.items[0].track;
      const fullTrack = (await client<Track>(`tracks/${simplifiedTrack.id}`)) as Track;
      return fullTrack;
    }
  });

  return query;
};

const NowPlaying = () => {
  const { isLoading, data: track } = useCurrentOrLastPlaying();
  const client = useClient();
  const { data: isSaved } = useQuery(
    ['tracks-contains', track?.id],
    async () => {
      const [isSaved] = (await client<boolean[]>(`me/tracks/contains?ids=${track?.id}`)) as boolean[];
      return isSaved;
    },
    { enabled: track },
  );

  if (isLoading || !track) return <LoadingIndictator />;

  return (
    <div className="flex items-center">
      <a href="/" className="flex-none">
        <img src={track.album.images[2].url} alt={`${track.album.name} Cover`} className="w-14 h-14" />
      </a>
      <div className="ml-3 truncate">
        <div className="text-white truncate hover:underline">
          <a href="/">{track.name}</a>
        </div>
        <div className="text-xs text-gray-500 truncate">
          <ArtistLinkList artists={track.artists} className="hover:underline hover:text-white" />
        </div>
      </div>
      <button className="flex-none ml-3">
        <FavoriteIcon isSaved={isSaved} />
      </button>
    </div>
  );
};

const FavoriteIcon = ({ isSaved = false }: { isSaved?: boolean }) => {
  return isSaved ? <SolidHeart title="Saved" /> : <OutlineHeart title="Not in your library" />;
};

const SolidHeart = ({ title }: { title: string }) => (
  <svg
    className="w-5 h-5 text-spotify-green"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const OutlineHeart = ({ title }: { title: string }) => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    ></path>
  </svg>
);

export default NowPlaying;
