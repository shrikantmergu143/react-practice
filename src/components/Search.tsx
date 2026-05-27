import { forwardRef, useId } from 'react';
import { useDebounce } from './hooks/useDebounce';
import type { SearchProps } from './types';
import './Search.css';

const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      id,
      name,
      value,
      label,
      helperText,
      error,
      size = 'md',
      debounceMs = 400,
      className,
      wrapperClassName,
      inputClassName,
      clearable = true,
      loading = false,
      disabled = false,
      readOnly = false,
      placeholder = 'Search',
      autoComplete = 'off',
      onChange,
      onValueChange,
      onSearch,
      onClear,
      ...inputProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? `${name}-${generatedId}`;
    const descriptionId = helperText || error ? `${inputId}-description` : undefined;
    const debouncedSearch = useDebounce<[string]>((nextValue) => onSearch?.(nextValue), debounceMs);
    const canClear = clearable && Boolean(value) && !disabled && !readOnly;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      onChange?.(event);
      onValueChange?.(nextValue);
      debouncedSearch(nextValue);
    };

    const handleClear = () => {
      onValueChange?.('');
      onSearch?.('');
      onClear?.();
    };

    return (
      <div
        className={[
          'search',
          `search--${size}`,
          error ? 'search--error' : '',
          disabled ? 'search--disabled' : '',
          wrapperClassName,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label && (
          <label className="search__label" htmlFor={inputId}>
            {label}
          </label>
        )}

        <div className="search__control">
          <span className="search__icon" aria-hidden="true">
            <svg viewBox="0 0 20 20" focusable="false">
              <path d="M8.5 3a5.5 5.5 0 0 1 4.383 8.823l3.147 3.147a.75.75 0 0 1-1.06 1.06l-3.147-3.147A5.5 5.5 0 1 1 8.5 3Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
            </svg>
          </span>

          <input
            {...inputProps}
            ref={ref}
            id={inputId}
            name={name}
            type="search"
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={Boolean(error)}
            aria-describedby={descriptionId}
            className={['search__input', inputClassName].filter(Boolean).join(' ')}
            onChange={handleChange}
          />

          {loading && <span className="search__spinner" aria-label="Searching" role="status" />}

          {canClear && (
            <button
              type="button"
              className="search__clear"
              aria-label="Clear search"
              title="Clear search"
              onClick={handleClear}
            >
              <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                <path d="M5.47 5.47a.75.75 0 0 1 1.06 0L10 8.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L11.06 10l3.47 3.47a.75.75 0 1 1-1.06 1.06L10 11.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L8.94 10 5.47 6.53a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </button>
          )}
        </div>

        {(error || helperText) && (
          <p id={descriptionId} className={error ? 'search__error' : 'search__helper'}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Search.displayName = 'Search';

export default Search;
export type { SearchProps };
