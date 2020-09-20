// Fake saved tracks store for testing purposes
type SavedTracksStore = {
  trackIds: string[];
};

const store: SavedTracksStore = { trackIds: [] };

const set = async (ids: string[]) => {
  store.trackIds = ids;
};

const unset = async (ids: string[]) => {
  store.trackIds = store.trackIds.filter((trackId) => !ids.includes(trackId));
};

const checkIsSaved = async (ids: string[]) => {
  return ids.map((idToCheck) => store.trackIds.includes(idToCheck));
};

const teardown = () => {
  store.trackIds = [];
};

export { set, unset, checkIsSaved, teardown };
