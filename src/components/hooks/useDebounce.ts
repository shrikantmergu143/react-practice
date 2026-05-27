import { useCallback, useEffect, useRef, useState } from 'react';

const useHookDebounce = <TValue>(value: TValue, delay = 500) => {
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

const useDebounce = <TArgs extends unknown[]>(callBack?: (...args: TArgs) => void, delay = 500) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const debounceFunction = useCallback(
    (...args: TArgs) => {
      if (timerRef.current) {
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

export { useHookDebounce, useDebounce };
