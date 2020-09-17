import React from 'react';
import { useQuery } from 'react-query';
import { useClient } from '../context/auth-context';
import { AlbumListResponse } from '../types/Album';
import AlbumList from './AlbumList';

const ContentPane = () => {
  const client = useClient<AlbumListResponse>();
  const { isLoading, error, data } = useQuery('new-releases', () => client('browse/new-releases'));

  console.log({ isLoading, error, data });

  return (
    <div className="px-8 overflow-y-auto content-spotify">
      {data ? (
        <>
          <AlbumList heading="Shortcuts" albums={data.albums.items} />
          <AlbumList heading="Recently Played" albums={data.albums.items} />
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default ContentPane;
