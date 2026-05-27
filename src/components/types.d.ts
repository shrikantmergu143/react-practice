export interface ISearch {
  name: string;
  value: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  onSearch?: (value: string) => void;
  readonly?: boolean;
  disabled?: boolean;
}
