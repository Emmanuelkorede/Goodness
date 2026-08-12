import { useState, useCallback } from "react";
import { getItem, setItem } from "../lib/storage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => getItem<T>(key) ?? initialValue);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        setItem(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, update] as const;
}