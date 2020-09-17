type HashObject = {
  [key: string]: string;
};

// Get the hash of the url
const getHash = () => {
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {} as HashObject);

  return hash;
};

const defaultClearHash = () => {
  window.location.hash = '';
};

const createExtractHash = (clearHash = defaultClearHash) => () => {
  const hash = getHash();
  clearHash();
  return hash;
};

const extractHash = createExtractHash();

export { createExtractHash, extractHash };
