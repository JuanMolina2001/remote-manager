/// <reference types="vite/client" />
import { ITerminalOptions } from '@xterm/xterm';

export {};

declare global {
  interface Window {
    pywebview: {
      api: {
        start_process: () => Promise<{
          status: boolean;
          settings: ITerminalOptions;
        }>;
        write(data: string): void;
        query(data: string): void;
        fit(cols,rows): void;
        getSettings(): Promise<ITerminalOptions>;
        getSuggestions(data: string): Promise<{
          value: string;
          description: string;
          suggestions: string[];
        }[]>;
      };
    };
  }
}
