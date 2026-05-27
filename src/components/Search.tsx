/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { ISearch } from './types';

const Search = ({
  name,
  value,
  onChange,
  onSearch,
  label,
  className,
  disabled,
  readonly,
}: ISearch) => {
  const idRef = useMemo(() => `${crypto.randomUUID()}_${name}`, []);
  const debounceSearch = useDebounce(onSearch, 500);
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    debounceSearch(event?.target?.value);
  };

  return (
    <div className={`${className} search-wrapper`}>
      {label && (
        <label htmlFor={idRef} className="search-label">
          {label}
        </label>
      )}
      <input
        name={name}
        className={`search-input`}
        value={value}
        id={idRef}
        onChange={onChangeInput}
        readOnly={readonly}
        disabled={disabled}
      />
    </div>
  );
};
export default Search;
