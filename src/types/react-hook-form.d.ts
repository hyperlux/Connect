import { ReactNode } from 'react';

declare module 'react-hook-form' {
  export type SubmitHandler<TFieldValues> = (data: TFieldValues) => void | Promise<void>;
  export type FieldValues = Record<string, any>;

  export function useForm<TFieldValues extends FieldValues>(
    config?: {
      mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
      resolver?: any;
    }
  ): {
    register: (name: keyof TFieldValues, options?: any) => any;
    handleSubmit: (onSubmit: SubmitHandler<TFieldValues>) => (e: React.FormEvent) => void;
    formState: {
      errors: Partial<Record<keyof TFieldValues, { message?: string }>>;
    };
    reset: () => void;
    watch: (name?: keyof TFieldValues) => any;
  };
}
