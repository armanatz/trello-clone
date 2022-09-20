import { useCallback, useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetLocalStorageValue<T>] {
  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(
        `Error reading localStorage key "${key}":`,
        error,
      );
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] =
    useState<T>(readValue);

  const setValue: SetLocalStorageValue<T> = value => {
    try {
      const newValue =
        value instanceof Function
          ? value(storedValue)
          : value;

      window.localStorage.setItem(
        key,
        JSON.stringify(newValue),
      );

      setStoredValue(newValue);
    } catch (error) {
      console.warn(
        `Error setting localStorage key "${key}":`,
        error,
      );
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
}
