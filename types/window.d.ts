export {};

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (eventName: string, handler: (...args: unknown[]) => void) => void;
      removeListener: (eventName: string, handler: (...args: unknown[]) => void) => void;
      selectedAddress: string | null;
      isMetaMask?: boolean;
    };
  }
} 