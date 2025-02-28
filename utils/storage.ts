import { SearchResults, Content, Domain, ContentData } from "@/types/walletAccount";

export const StorageKeys = {
  SELECTED_DOMAIN: "selectedDomain",
  SELECTED_FILE: "selectedFile",
} as const;

type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
type StorageValue<K extends StorageKey> =
  K extends typeof StorageKeys.SELECTED_DOMAIN
    ? SearchResults | Domain | null
    : K extends typeof StorageKeys.SELECTED_FILE
    ? Content | ContentData | null
    : never;

export const storage = {
  set: <K extends StorageKey>(key: K, value: StorageValue<K>) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  },

  get: <K extends StorageKey>(key: K): StorageValue<K> | null => {
    try {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
      return null;
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return null;
    }
  },

  remove: (key: StorageKey) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.error("Error removing from localStorage:", e);
    }
  },
};
