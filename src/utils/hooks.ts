import React from 'react';

// Need to make this more generic and take any number of arguments
const useSafeDispatch = <A>(dispatch: React.Dispatch<A>) => {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (value: A) => {
      if (mounted.current) dispatch(value);
    },
    [dispatch],
  );
};

type State = {
  status: string;
  data: any;
  error: any;
};

const defaultInitialState = { status: 'idle', data: null, error: null };

const useAsync = (initialState?: State) => {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = React.useReducer(
    (s: State, a: Partial<State>) => ({ ...s, ...a }),
    initialStateRef.current,
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback((data) => safeSetState({ data, status: 'resolved' }), [safeSetState]);
  const setError = React.useCallback((error) => safeSetState({ error, status: 'rejected' }), [safeSetState]);
  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [safeSetState]);

  const run = React.useCallback(
    (promise: Promise<any>) => {
      if (!promise || !promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        );
      }
      safeSetState({ status: 'pending' });
      return promise.then(
        (data) => {
          setData(data);
          return data;
        },
        (error) => {
          setError(error);
          return Promise.reject(error);
        },
      );
    },
    [safeSetState, setData, setError],
  );

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
};

export { useAsync };
