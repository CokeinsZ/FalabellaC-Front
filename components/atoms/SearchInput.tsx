import Icon from "./Icon";
import { SearchInputToken } from "../../utils/Token";

interface SearchInputProps {
  placeholder: string;
  iconSrc: string;
}

export default function SearchInput({ placeholder, iconSrc }: SearchInputProps) {
  return (
    <div className={SearchInputToken.container}>
      <input
        type="text"
        placeholder={placeholder}
        className={SearchInputToken.input}
      />
      <div className={SearchInputToken.icon}>
        <Icon src={iconSrc} alt="search" size={16} className="invert" />
      </div>
    </div>
  );
}
