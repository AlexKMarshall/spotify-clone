import React from 'react';
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import { useClient } from '../../context/auth-context';
import { NullPlayer, Player } from '../../types/Player';
import { PauseIcon, PlayIcon, RepeatIcon, SkipNextIcon, SkipPrevIcon, SuffleIcon } from './icons';

const PlayerControls = () => {
  const client = useClient();
  const { data } = useQuery('player', () => client<Player | null>('me/player'), { refetchInterval: 1000 });

  const player = data || NullPlayer;

  return (
    <div className="flex flex-col justify-center flex-1 mx-6">
      <div className="flex justify-center">
        <ControlButton isDisabled={player.actions.disallows.toggling_shuffle}>
          <SuffleIcon />
        </ControlButton>
        <ControlButton isDisabled={player.actions.disallows.skipping_prev}>
          <SkipPrevIcon />
        </ControlButton>
        <PlayPauseButton isPlaying={player.is_playing} />
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

const PlayPauseButton = ({ isPlaying }: { isPlaying: boolean }) => (
  <button className="ml-8">{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
);

const ProgressBar = ({ max, value }: { max: number; value: number }) => (
  <progress max={max} value={value} className="w-full h-1 ml-3 rounded-lg xl:w-200"></progress>
);

const Duration = ({ durationMs, label }: { durationMs: number; label: string }) => {
  const formattedDuration = format(new Date(durationMs), 'm:ss');
  return <span aria-label={label}>{formattedDuration}</span>;
};

export default PlayerControls;
