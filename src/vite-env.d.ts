/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

import { SVGProps, MouseEvent, ChangeEvent } from 'react'

declare module 'react' {
  export import useState = React.useState
  export import useEffect = React.useEffect
  export import useRef = React.useRef
  export import useCallback = React.useCallback
  export import useMemo = React.useMemo
  
  export interface MouseEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean
    button: number
    buttons: number
    clientX: number
    clientY: number
    ctrlKey: boolean
    metaKey: boolean
    movementX: number
    movementY: number
    pageX: number
    pageY: number
    screenX: number
    screenY: number
    shiftKey: boolean
  }
  
  export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T
  }

  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react'
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    absoluteStrokeWidth?: boolean
    color?: string
  }

  export const Activity: FC<IconProps>
  export const AlertTriangle: FC<IconProps>
  export const AlertCircle: FC<IconProps>
  export const ArrowRight: FC<IconProps>
  export const Award: FC<IconProps>
  export const Bell: FC<IconProps>
  export const Bike: FC<IconProps>
  export const Book: FC<IconProps>
  export const Building2: FC<IconProps>
  export const Bus: FC<IconProps>
  export const Calendar: FC<IconProps>
  export const Camera: FC<IconProps>
  export const Check: FC<IconProps>
  export const CheckCircle: FC<IconProps>
  export const ChevronLeft: FC<IconProps>
  export const ChevronRight: FC<IconProps>
  export const Clock: FC<IconProps>
  export const Compass: FC<IconProps>
  export const Download: FC<IconProps>
  export const Droplet: FC<IconProps>
  export const ExternalLink: FC<IconProps>
  export const FileText: FC<IconProps>
  export const Filter: FC<IconProps>
  export const Globe: FC<IconProps>
  export const Heart: FC<IconProps>
  export const Image: FC<IconProps>
  export const Info: FC<IconProps>
  export const Key: FC<IconProps>
  export const Layers: FC<IconProps>
  export const Leaf: FC<IconProps>
  export const ListChecks: FC<IconProps>
  export const LucideIcon: FC<IconProps>
  export const Mail: FC<IconProps>
  export const MapPin: FC<IconProps>
  export const MessageSquare: FC<IconProps>
  export const Navigation: FC<IconProps>
  export const Newspaper: FC<IconProps>
  export const Phone: FC<IconProps>
  export const Plus: FC<IconProps>
  export const Save: FC<IconProps>
  export const Search: FC<IconProps>
  export const Settings: FC<IconProps>
  export const Star: FC<IconProps>
  export const Sun: FC<IconProps>
  export const TrendingUp: FC<IconProps>
  export const Upload: FC<IconProps>
  export const Users: FC<IconProps>
  export const Vote: FC<IconProps>
  export const X: FC<IconProps>
  export const XCircle: FC<IconProps>
}

declare module '@tanstack/react-query' {
  import { ComponentType } from 'react'

  export interface InvalidateQueryFilters {
    queryKey?: unknown[]
    exact?: boolean
    refetchType?: 'active' | 'inactive' | 'all'
    type?: 'all' | 'active' | 'inactive'
  }

  export class QueryClient {
    constructor(config?: any)
    setQueryData<T>(queryKey: any[], updater: (oldData: T | undefined) => T): void
    invalidateQueries(filters: InvalidateQueryFilters): Promise<void>
  }

  export const QueryClientProvider: ComponentType<{
    client: QueryClient
    children: React.ReactNode
  }>

  export function useQueryClient(): QueryClient

  export interface MutationOptions<TData = unknown, TError = unknown, TVariables = unknown> {
    mutationFn: (variables: TVariables) => Promise<TData>
    onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>
    onError?: (error: TError, variables: TVariables) => void
    onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void
  }

  export interface MutationResult<TData = unknown, TError = unknown, TVariables = unknown> {
    mutate: (variables: TVariables) => void
    isLoading: boolean
    isPending: boolean
    error: TError | null
    data: TData | undefined
  }

  export function useMutation<TData = unknown, TError = unknown, TVariables = unknown>(
    options: MutationOptions<TData, TError, TVariables>
  ): MutationResult<TData, TError, TVariables>

  export interface UseQueryOptions<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  > {
    queryKey: TQueryKey
    queryFn: QueryFunction<TQueryFnData, TQueryKey>
    enabled?: boolean
    retry?: boolean | number | ((failureCount: number, error: TError) => boolean)
    retryDelay?: (retryAttempt: number) => number
    staleTime?: number
    cacheTime?: number
    refetchInterval?: number | false
    refetchIntervalInBackground?: boolean
    refetchOnWindowFocus?: boolean
    refetchOnReconnect?: boolean
    notifyOnChangeProps?: Array<keyof InfiniteQueryObserverResult>
    notifyOnChangePropsExclusions?: Array<keyof InfiniteQueryObserverResult>
  }

  export function useQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
  ): UseQueryResult<TData, TError>

  export interface UseQueryResult<TData = unknown, TError = unknown> {
    data: TData | undefined
    error: TError | null
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    status: 'idle' | 'loading' | 'error' | 'success'
  }

  export type QueryKey = readonly unknown[]
  export type QueryFunction<T = unknown, TQueryKey extends QueryKey = QueryKey> = (
    context: QueryFunctionContext<TQueryKey>
  ) => T | Promise<T>

  export interface QueryFunctionContext<TQueryKey extends QueryKey = QueryKey> {
    queryKey: TQueryKey
    signal: AbortSignal
  }

  export interface InfiniteQueryObserverResult<TData = unknown, TError = unknown>
    extends UseQueryResult<TData, TError> {
    hasNextPage?: boolean
    fetchNextPage: () => Promise<void>
    isFetchingNextPage: boolean
  }
}

declare module 'react-router-dom' {
  export interface RouterProviderProps {
    router: any
    future?: {
      v7_startTransition: boolean
    }
  }
}
