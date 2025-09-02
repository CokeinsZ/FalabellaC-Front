import SearchInput from "../atoms/SearchInput";

interface SearchBarProps {
  placeholder: string;
  iconSrc: string;
}

export default function SearchBar({ placeholder, iconSrc }: SearchBarProps) {
  return <SearchInput placeholder={placeholder} iconSrc={iconSrc} />;
}
