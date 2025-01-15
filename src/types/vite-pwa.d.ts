/// <reference types="vite-plugin-pwa/client" />

interface Window {
  __SW_UPDATE: () => Promise<void> | undefined;
}
