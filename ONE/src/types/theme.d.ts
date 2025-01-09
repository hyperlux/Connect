// Theme System Types
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// Theme colors and variants
declare module 'tailwind-theme' {
  interface ThemeColors {
    // Base colors
    'dark-card': string;
    'dark-primary': string;
    'dark-secondary': string;
    'dark-lighter': string;
    'dark': string;
    'dark-hover': string;
    'auroville-primary': string;
    'auroville-primary-dark': string;
    
    // Gray scale
    'gray-50': string;
    'gray-100': string;
    'gray-200': string;
    'gray-300': string;
    'gray-400': string;
    'gray-500': string;
    'gray-600': string;
    'gray-700': string;
    'gray-800': string;
    'gray-900': string;
    
    // Colors
    'white': string;
    'black': string;
    'red-400': string;
    'red-500': string;
    'red-600': string;
    'yellow-400': string;
    'yellow-500': string;
    'blue-400': string;
    'blue-500': string;
  }

  type ThemeClass = keyof ThemeColors;
}

// Extend CSS Properties
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
    [key: string]: any;
  }
}

// Radix UI Types
declare module '@radix-ui/react-dropdown-menu' {
  interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<'div'> {
    sideOffset?: number;
    align?: 'start' | 'center' | 'end';
  }

  interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<'div'> {
    inset?: boolean;
  }

  const Root: React.FC<{ children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }>;
  const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'> & { asChild?: boolean }>;
  const Portal: React.FC<{ children: React.ReactNode }>;
  const Content: React.ForwardRefExoticComponent<DropdownMenuContentProps>;
  const Item: React.ForwardRefExoticComponent<DropdownMenuItemProps>;

  export { Root, Trigger, Portal, Content, Item };
}

// Tailwind Utility Types
declare module '@tailwind-types' {
  type TailwindModifier = 
    | 'hover'
    | 'dark'
    | 'disabled'
    | 'focus'
    | 'active'
    | 'group-hover'
    | 'focus-visible'
    | 'inset'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl';

  type TailwindProperty = 
    | 'bg'
    | 'text'
    | 'border'
    | 'ring'
    | 'shadow'
    | 'shadow-sm'
    | 'opacity'
    | 'rounded'
    | 'rounded-xl'
    | 'rounded-lg'
    | 'rounded-full'
    | 'p'
    | 'px'
    | 'py'
    | 'pl'
    | 'm'
    | 'mx'
    | 'my'
    | 'mb'
    | 'mt'
    | 'w'
    | 'h'
    | 'min-w'
    | 'max-w'
    | 'max-h'
    | 'flex'
    | 'grid'
    | 'grid-cols'
    | 'gap'
    | 'space'
    | 'items'
    | 'justify'
    | 'font'
    | 'font-bold'
    | 'font-semibold'
    | 'font-medium'
    | 'tracking'
    | 'leading'
    | 'z'
    | 'transition'
    | 'transition-colors'
    | 'transform'
    | 'cursor'
    | 'outline'
    | 'overflow'
    | 'overflow-y'
    | 'whitespace'
    | 'truncate'
    | 'animate'
    | 'animate-pulse'
    | 'animate-spin'
    | 'select'
    | 'relative'
    | 'text-center'
    | 'text-sm'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-opacity';

  type TailwindValue = 
    | 'none'
    | 'auto'
    | 'full'
    | 'screen'
    | '7xl'
    | string
    | number;
}

// Extend JSX to support Tailwind classes
declare namespace JSX {
  interface IntrinsicAttributes {
    className?: string;
  }
}

// Utility Types
type DarkMode<T> = T | `dark:${T}`;
type Hoverable<T> = T | `hover:${T}`;
type Responsive<T> = T | `sm:${T}` | `md:${T}` | `lg:${T}` | `xl:${T}` | `2xl:${T}`;

// Utility Functions
declare module 'class-variance-authority' {
  export function cva(...args: any[]): (...args: any[]) => string;
  export function cx(...args: any[]): string;
}

// Lucide React Icons
declare module 'lucide-react' {
  interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
  }

  // Basic Icons
  export const Moon: React.FC<IconProps>;
  export const Sun: React.FC<IconProps>;
  export const Bell: React.FC<IconProps>;
  export const X: React.FC<IconProps>;
  export const Loader2: React.FC<IconProps>;
  export const MessageSquare: React.FC<IconProps>;
  export const ChevronUp: React.FC<IconProps>;
  export const ChevronDown: React.FC<IconProps>;
  
  // Weather Icons
  export const Cloud: React.FC<IconProps>;
  export const CloudRain: React.FC<IconProps>;
  export const Wind: React.FC<IconProps>;
  export const Thermometer: React.FC<IconProps>;
  
  // Resource Icons
  export const Book: React.FC<IconProps>;
  export const FileText: React.FC<IconProps>;
  export const Building2: React.FC<IconProps>;
  export const Eye: React.FC<IconProps>;
  export const Globe: React.FC<IconProps>;
  export const ExternalLink: React.FC<IconProps>;
  export const Scale: React.FC<IconProps>;
  export const Shield: React.FC<IconProps>;
  export const Users: React.FC<IconProps>;
  export const Home: React.FC<IconProps>;
  export const School: React.FC<IconProps>;
  export const Zap: React.FC<IconProps>;
  export const Bus: React.FC<IconProps>;
  export const Heart: React.FC<IconProps>;
  export const Umbrella: React.FC<IconProps>;
  export const Info: React.FC<IconProps>;
}

export {};
