// Fake player context store for testing purpose

import { Player } from '../../types/Player';

type PlayerStore = {
  player: Player | null;
};

const store: PlayerStore = {
  player: null,
};

const set = async (player: Player | null) => {
  store.player = player;
};

const read = async () => store.player;

const teardown = () => {
  store.player = null;
};

export { set, read, teardown };
