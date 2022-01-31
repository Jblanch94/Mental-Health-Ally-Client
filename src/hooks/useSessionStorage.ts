import { useState } from "react";

function useSessionStorage(key: string) {
  const [value, setValue] = useState<string | null>(
    getValueFromSessionStorage(key)
  );

  function getValueFromSessionStorage(key: string): string | null {
    const item = sessionStorage.getItem(key);
    return item != null ? JSON.parse(item) : null;
  }

  function saveValueToSessionStorage(key: string, value: string): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  function removeFromSessionStorage(): void {
    const item = sessionStorage.getItem(key);
    if (item === null) {
      console.warn("Key not found");
    } else {
      sessionStorage.removeItem(key);
    }
  }

  function set(newValue: string): void {
    setValue(newValue);
    saveValueToSessionStorage(key, newValue);
  }

  function remove(): void {
    setValue(null);
    removeFromSessionStorage();
  }

  function get(): string | null {
    return value;
  }

  return { get, set, remove };
}

export default useSessionStorage;
