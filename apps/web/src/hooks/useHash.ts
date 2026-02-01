import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Reads the current URL hash (without the # prefix) on the client side.
 * Returns empty string during SSR or when no hash is present.
 */
export function useHash(): string {
  return useSyncExternalStore(
    emptySubscribe,
    () => window.location.hash.slice(1),
    () => "",
  );
}
