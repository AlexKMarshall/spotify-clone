import React from 'react';
import { useQuery } from 'react-query';
import { useClient } from '../context/auth-context';
import { AlbumListResponse } from '../types/Album';
import AlbumList from './AlbumList';

const HomePane = () => {
  const client = useClient();
  const { data } = useQuery('new-releases', () => client<AlbumListResponse>('browse/new-releases'));

  return data ? <AlbumList heading="New Releases" albums={data.albums.items} /> : <div>'Loading...'</div>;
};

export default HomePane;
