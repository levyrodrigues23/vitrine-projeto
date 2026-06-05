export {};

declare global {
  interface Window {
    VLibras?: {
      Widget: new (rootPath?: string) => void;
    };
  }
}
