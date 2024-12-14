declare module '@tanstack/react-query' {
  export * from '@tanstack/react-query'
}

declare module 'zustand' {
  export interface State {
    [key: string]: any
  }

  export interface SetState<T extends State> {
    (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean): void
  }

  export interface GetState<T extends State> {
    (): T
  }

  export type StateCreator<T extends State> = (
    set: SetState<T>,
    get: GetState<T>,
    api: any
  ) => T

  export function create<T extends State = any>(): <U>(
    f: (set: SetState<T>, get: GetState<T>, api: any) => U
  ) => (selector?: (state: U) => any) => any
}

declare module 'zustand/middleware' {
  import { State, StateCreator } from 'zustand'
  
  export interface PersistOptions<T> {
    name: string
    storage?: any
    partialize?: (state: T) => Partial<T>
    onRehydrateStorage?: (state: T) => ((state?: T) => void) | void
    version?: number
    migrate?: (persistedState: any, version: number) => T | Promise<T>
  }

  export function persist<T extends State, U>(
    f: (set: any, get: any, api: any) => U,
    options: PersistOptions<T>
  ): (set: any, get: any, api: any) => U
}

declare module '@radix-ui/react-dropdown-menu' {
  export * from '@radix-ui/react-dropdown-menu'
}

declare module 'tailwind-merge' {
  export function twMerge(...classLists: string[]): string
}

// Add missing React types
declare namespace React {
  interface PropsWithChildren<P = unknown> {
    children?: React.ReactNode
    [key: string]: any
  }
  
  type FC<P = {}> = React.FunctionComponent<P>
  
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): React.ReactElement<any, any> | null
  }

  type DragEvent<T = Element> = React.DragEvent<T>
  type ElementRef<T> = T
  type ComponentPropsWithoutRef<T> = any
}

// Add missing react-router-dom types
declare module 'react-router-dom' {
  export interface RouterProviderProps {
    router: any
    fallbackElement?: React.ReactNode
  }

  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string
    children: React.ReactNode
    className?: string
    onClick?: (event: React.MouseEvent) => void
  }
  
  export function RouterProvider(props: RouterProviderProps): JSX.Element
  export function createBrowserRouter(routes: any[], opts?: any): any
  export function Navigate(props: { to: string; replace?: boolean }): JSX.Element
  export function useLocation(): any
  export function useNavigate(): (to: string) => void
  export function useParams<T extends Record<string, string | undefined>>(): T
  export function useSearchParams(): [URLSearchParams, (params: URLSearchParams) => void]
  export function Link(props: LinkProps): JSX.Element
  export function NavLink(props: { to: string; children: React.ReactNode; className?: string | ((props: { isActive: boolean }) => string) }): JSX.Element
  export function Outlet(): JSX.Element
}
