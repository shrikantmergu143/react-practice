import type React from 'react';

export type SearchSize = 'sm' | 'md' | 'lg';

export interface SearchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'onChange'
> {
  name: string;
  value: string;
  label?: string;
  helperText?: string;
  error?: string;
  size?: SearchSize;
  debounceMs?: number;
  wrapperClassName?: string;
  inputClassName?: string;
  clearable?: boolean;
  loading?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
}
