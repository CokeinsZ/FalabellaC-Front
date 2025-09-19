import Icon from "./Icon";
<<<<<<< HEAD
import {SearchInputToken} from "./Token";
=======
import { SearchInputToken } from "./Token";

>>>>>>> 77f11344a11ea79e20b63bb5f6f541e914ac331e
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
<<<<<<< HEAD
        className= {SearchInputToken}
=======
        className={SearchInputToken.input}
>>>>>>> 77f11344a11ea79e20b63bb5f6f541e914ac331e
      />
      <div className={SearchInputToken.icon}>
        <Icon src={iconSrc} alt="search" size={16} className="invert" />
      </div>
    </div>
  );
}
