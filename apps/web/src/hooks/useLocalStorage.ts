import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Reads a value from localStorage on the client side without triggering
 * setState-in-effect lint warnings. Returns null during SSR.
 */
export function useLocalStorageValue(key: string): string | null {
  return useSyncExternalStore(
    emptySubscribe,
    () => localStorage.getItem(key),
    () => null,
  );
}

/**
 * Reads and parses a JSON value from localStorage.
 * Returns the parsed object on the client, null during SSR or on parse failure.
 */
export function useLocalStorageJSON<T>(key: string): T | null {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      try {
        return JSON.parse(stored) as T;
      } catch {
        return null;
      }
    },
    () => null,
  );
}
