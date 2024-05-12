import { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';

export const useDebounce = (value: any, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useDebouncedState = (
  defaultValue: any,
  onDebounceChange: (debouncedValue: any) => void,
  delay: number = 500,
) => {
  const [inputVal, setInputVal] = useState(defaultValue);
  const debouncedValue = useDebounce(inputVal, delay);
  const refValue = useRef(debouncedValue);

  useEffect(() => {
    if (!isEqual(refValue.current, debouncedValue)) {
      refValue.current = debouncedValue;
      onDebounceChange(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const state: [typeof defaultValue, (val: any) => void] = [inputVal, setInputVal];

  return state;
};
