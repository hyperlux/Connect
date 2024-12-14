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
    preventDefault(): void;
  }
  
  interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    readonly target: EventTarget & T;
  }

  interface MouseEvent<T = Element, E = NativeMouseEvent> extends SyntheticEvent<T, E> {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    metaKey: boolean;
    movementX: number;
    movementY: number;
    pageX: number;
    pageY: number;
    relatedTarget: EventTarget | null;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
    preventDefault(): void;
    stopPropagation(): void;
  }

  type ReactNode = 
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | boolean
    | null
    | undefined;
}

// Add react-router-dom types
declare module 'react-router-dom' {
  import { ComponentType } from 'react';

  export interface NavigateFunction {
    (to: string, options?: { replace?: boolean; state?: any }): void;
  }

  export interface NavLinkProps {
    className?: string | ((props: { isActive: boolean }) => string);
    style?: React.CSSProperties | ((props: { isActive: boolean }) => React.CSSProperties);
  }

  export const Link: ComponentType<{
    to: string;
    className?: string;
    children?: React.ReactNode;
  }>;

  export const NavLink: ComponentType<NavLinkProps & {
    to: string;
    children?: React.ReactNode;
  }>;

  export const Outlet: ComponentType;

  export function useNavigate(): NavigateFunction;
}
