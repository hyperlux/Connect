/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Declare module for various file types
declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.json' {
  const value: { [key: string]: any };
  export default value;
}

// React namespace augmentation
declare namespace React {
  // Add missing React types
  export import useState = React.useState;
  export import useEffect = React.useEffect;
  export import useCallback = React.useCallback;
  export import useMemo = React.useMemo;
  export import useRef = React.useRef;
  
  interface FormEvent<T = Element> extends SyntheticEvent<T> {
    readonly target: EventTarget & T;
  }
  
  interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    readonly target: EventTarget & T;
  }
  
  type ReactNode = 
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | boolean
    | null
    | undefined;
}

// Window interface augmentation
declare interface Window {
  __INITIAL_STATE__?: any;
}

// Vite environment variables
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
