import Icon from "./Icon";
import {SearchInputToken} from "./Token";
interface SearchInputProps {
  placeholder: string;
  iconSrc: string;
}

export default function SearchInput({ placeholder, iconSrc }: SearchInputProps) {
  return (
    <div className="relative flex w-full items-center">
      <input
        type="text"
        placeholder={placeholder}
        className= {SearchInputToken}
      />
      <div className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-800">
        <Icon src={iconSrc} alt="search" size={16} className="invert" />
      </div>
    </div>
  );
}
