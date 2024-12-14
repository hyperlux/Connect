declare module '@tanstack/react-query' {
  export interface QueryClient {
    setQueryData: <T>(key: any[], updater: (oldData: T | undefined) => T) => void
  }
  
  export function QueryClient(options?: any): QueryClient
  export function QueryClientProvider(props: { client: QueryClient; children: React.ReactNode }): JSX.Element
  export function useQuery<T>(key: any[], fn: () => Promise<T>, options?: any): { data: T; isLoading: boolean; error: any }
  export function useMutation<T, V>(fn: (variables: V) => Promise<T>, options?: any): {
    mutate: (variables: V) => void
    isLoading: boolean
    error: any
  }
  export function useQueryClient(): QueryClient
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
  ) => (selector?: (state: U) => any) => any & { getState: () => U }
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
  const Root: React.FC<{ children: React.ReactNode }>
  const Trigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>
  const Portal: React.FC<{ children: React.ReactNode }>
  const Content: React.FC<{
    className?: string
    sideOffset?: number
    children: React.ReactNode
    align?: 'start' | 'center' | 'end'
  }>
  const Item: React.FC<{
    className?: string
    onSelect?: () => void
    children: React.ReactNode
  }>

  export { Root, Trigger, Portal, Content, Item }
}

declare module 'tailwind-merge' {
  export function twMerge(...classLists: string[]): string
}

declare module 'lucide-react' {
  interface LucideProps extends React.SVGAttributes<SVGElement> {
    size?: string | number
    absoluteStrokeWidth?: boolean
  }
  
  export const Calendar: React.FC<LucideProps>
  export const Building2: React.FC<LucideProps>
  export const MessageSquare: React.FC<LucideProps>
  export const FileText: React.FC<LucideProps>
  export const ShoppingBag: React.FC<LucideProps>
  export const Settings: React.FC<LucideProps>
  export const Bell: React.FC<LucideProps>
  export const Shield: React.FC<LucideProps>
  export const Key: React.FC<LucideProps>
  export const Camera: React.FC<LucideProps>
  export const Users: React.FC<LucideProps>
  export const TrendingUp: React.FC<LucideProps>
  export const Activity: React.FC<LucideProps>
  export const ArrowRight: React.FC<LucideProps>
  export const Search: React.FC<LucideProps>
  export const Menu: React.FC<LucideProps>
  export const X: React.FC<LucideProps>
  export const MapPin: React.FC<LucideProps>
  export const Clock: React.FC<LucideProps>
  export const Tag: React.FC<LucideProps>
  export const ArrowLeft: React.FC<LucideProps>
  export const Edit2: React.FC<LucideProps>
  export const LayoutGrid: React.FC<LucideProps>
  export const ExternalLink: React.FC<LucideProps>
  export const Share2: React.FC<LucideProps>
  export const Trash2: React.FC<LucideProps>
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
    future?: { v7_startTransition: boolean }
  }

  export interface NavigateOptions {
    replace?: boolean
    state?: any
  }

  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string
    state?: any
    replace?: boolean
    children: React.ReactNode
    className?: string | ((props: { isActive: boolean }) => string)
    onClick?: (event: React.MouseEvent) => void
  }
  
  export function RouterProvider(props: RouterProviderProps): JSX.Element
  export function createBrowserRouter(routes: any[], opts?: any): any
  export function Navigate(props: { to: string; state?: any; replace?: boolean }): JSX.Element
  export function useLocation(): { pathname: string; search: string; state: any }
  export function useNavigate(): (to: string, options?: NavigateOptions) => void
  export function useParams<T extends Record<string, string | undefined>>(): T
  export function useSearchParams(): [URLSearchParams, (params: URLSearchParams) => void]
  export function Link(props: LinkProps): JSX.Element
  export function NavLink(props: LinkProps): JSX.Element
  export function Outlet(): JSX.Element
}
