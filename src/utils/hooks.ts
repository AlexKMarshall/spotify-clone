import React, { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

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

type ContentRect = Pick<DOMRectReadOnly, 'width' | 'height' | 'top' | 'right' | 'bottom' | 'left'>;

const useResizeObserver = (resizeSubject: React.RefObject<HTMLDivElement>) => {
  const emptyRect = { width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 };
  const [contentRect, setContentRect] = useState<ContentRect>(emptyRect);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setContentRect(entries[0].contentRect);
    });

    if (resizeSubject.current) {
      resizeObserver.observe(resizeSubject.current);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [resizeSubject]);

  return contentRect;
};

export { useAsync, useResizeObserver };
