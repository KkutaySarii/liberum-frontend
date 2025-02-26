import { SearchResults, Content } from '@/types/walletAccount';

export const StorageKeys = {
  SELECTED_DOMAIN: 'selectedDomain',
  SELECTED_FILE: 'selectedFile',
} as const;

type StorageKey = typeof StorageKeys[keyof typeof StorageKeys];
type StorageValue<K extends StorageKey> = 
  K extends typeof StorageKeys.SELECTED_DOMAIN ? SearchResults | null :
  K extends typeof StorageKeys.SELECTED_FILE ? Content | null :
  never;

export const storage = {
  set: <K extends StorageKey>(key: K, value: StorageValue<K>) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  },
  
  get: <K extends StorageKey>(key: K): StorageValue<K> | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return null;
    }
  },

  remove: (key: StorageKey) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage:', e);
    }
  }
}; 