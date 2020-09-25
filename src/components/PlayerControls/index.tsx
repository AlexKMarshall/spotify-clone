import React from 'react';
import { format } from 'date-fns';
import { queryCache, useMutation, useQuery } from 'react-query';
import { useClient } from '../../context/auth-context';
import { NullPlayer, PlayerResponse } from '../../types/Player';
import { PauseIcon, PlayIcon, RepeatIcon, SkipNextIcon, SkipPrevIcon, SuffleIcon } from './icons';
import LoadingIndictator from '../LoadingIndicator';

const PlayerControls = () => {
  const pollingInterval = 1000;
  const client = useClient();
  const { isLoading, data } = useQuery('player', () => client<PlayerResponse>('me/player'), {
    refetchInterval: pollingInterval,
  });
  const [triggerPlay] = useMutation(() => client('me/player/play', { method: 'PUT' }), {
    onMutate: () => {
      queryCache.cancelQueries('player');
      const previousPlayer = queryCache.getQueryData<PlayerResponse>('player');
      queryCache.setQueryData('player', () => {
        if (previousPlayer) {
          return { ...previousPlayer, is_playing: true };
        }
      });
      return () => queryCache.setQueryData('player', previousPlayer);
    },
    onSettled: () => {
      queryCache.invalidateQueries('player');
    },
  });
  const [triggerPause] = useMutation(() => client('me/player/pause', { method: 'PUT' }), {
    onMutate: () => {
      queryCache.cancelQueries('player');
      const previousPlayer = queryCache.getQueryData<PlayerResponse>('player');
      queryCache.setQueryData('player', () => {
        if (previousPlayer) {
          return { ...previousPlayer, is_playing: false };
        }
      });
      return () => queryCache.setQueryData('player', previousPlayer);
    },
    onSettled: () => {
      queryCache.invalidateQueries('player');
    },
  });

  const togglePlaying = () => {
    if (player.is_playing) {
      triggerPause();
    } else {
      triggerPlay();
    }
  };

  const player = data || NullPlayer;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center flex-1 mx-6">
        <LoadingIndictator />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center flex-1 mx-6">
      <div className="flex justify-center">
        <ControlButton isDisabled={player.actions.disallows.toggling_shuffle}>
          <SuffleIcon />
        </ControlButton>
        <ControlButton isDisabled={player.actions.disallows.skipping_prev}>
          <SkipPrevIcon />
        </ControlButton>
        <PlayPauseButton isPlaying={player.is_playing} onClick={togglePlaying} />
        <ControlButton isDisabled={player.actions.disallows.skipping_next}>
          <SkipNextIcon />
        </ControlButton>
        <ControlButton isDisabled={player.actions.disallows.toggling_repeat_context}>
          <RepeatIcon />
        </ControlButton>
      </div>
      <div className="flex items-center justify-center max-w-full mt-3">
        <div className="text-xs text-gray-500">
          <Duration durationMs={player.progress_ms} label="Current position" />
        </div>
        <ProgressBar max={player.item.duration_ms} value={player.progress_ms} />
        <div className="ml-3 text-xs text-gray-500">
          <Duration durationMs={player.item.duration_ms} label="Total duration" />
        </div>
      </div>
    </div>
  );
};

type ControlButtonProps = {
  isDisabled?: boolean;
};

const ControlButton: React.FC<ControlButtonProps> = ({ isDisabled = false, children }) => (
  <button className={`ml-8 ${isDisabled ? 'text-gray-600' : 'text-gray-400 hover:text-white'}`} disabled={isDisabled}>
    {children}
  </button>
);

const PlayPauseButton = ({
  isPlaying,
  onClick,
}: {
  isPlaying: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => (
  <button className="ml-8 'text-gray-400 hover:text-white" onClick={onClick}>
    {isPlaying ? <PauseIcon /> : <PlayIcon />}
  </button>
);

const ProgressBar = ({ max, value }: { max: number; value: number }) => (
  <progress max={max} value={value} className="w-full h-1 ml-3 rounded-lg xl:w-200"></progress>
);

const Duration = ({ durationMs, label }: { durationMs: number; label: string }) => {
  const formattedDuration = format(new Date(durationMs), 'm:ss');
  return <span aria-label={label}>{formattedDuration}</span>;
};

export default PlayerControls;
