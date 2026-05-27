/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useRef, useState } from 'react';

const useHookDebounce = (value: any, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useDebounce = (callBack?: (...args: any[]) => void, delay = 500) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const debounceFunction = useCallback(
    (...args: any[]) => {
      if (timerRef?.current) {
        clearInterval(timerRef?.current);
      }
      timerRef.current = setTimeout(() => {
        callBack?.(...args);
      }, delay);
    },
    [callBack, delay],
  );
  return debounceFunction;
};

const useDebounceFin = (callBack?: (...args: any[]) => void, delay = 500) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const debounceFunction = useCallback(
    (...args: any[]) => {
      if (timerRef?.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callBack?.(...args);
      }, delay);
    },
    [callBack, delay],
  );
  return debounceFunction;
};

export { useHookDebounce, useDebounceFin, useDebounce };
