const apiURL = process.env.REACT_APP_API_URL;

// type Headers = {
//   [key: string]: string;
// }

type Headers = Record<string, string>;

type ClientNamedConfig = {
  data?: Object;
  token?: string;
  headers?: Headers;
};

export type ClientConfig = ClientNamedConfig & Record<string, string>;

const client = async <T>(
  endpoint: string,
  { data, token, headers: customHeaders, ...customConfig }: ClientConfig = {},
) => {
  const headers: Headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (data) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...headers,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      console.error('unauthorized request');
      // clear the query cache
      // logout the user
      // refresh the page
      return Promise.reject({ message: 'Please re-authenticate' });
    }
    if (response.status === 204) {
      return null;
    }
    try {
      const data = (await response.json()) as T;
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  });
};

export { client };
