declare module 'lucide-react';
declare module 'react-hook-form';
declare module 'recharts';

// Augment React types
declare module 'react' {
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
