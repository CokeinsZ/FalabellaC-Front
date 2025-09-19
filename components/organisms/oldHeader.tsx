import LogoGroup from "../molecules/LogoGroup";
import SearchBar from "../molecules/SearchBar";
import UserMenu from "../molecules/UserMenu";
import LocationBar from "../molecules/LocationBar";
import { OldHeaderToken } from "../atoms/Token";

interface HeaderProps {
  topLogos: { src: string; alt: string; width?: number; height?: number }[];
  mainLogo: { src: string; alt: string; width?: number; height?: number };
  searchIcon: string;
  userMenu: { label?: string; iconSrc?: string; href?: string }[];
  location: { iconSrc: string; text: string; rightLinks?: { label: string; href?: string }[] };
}

export default function Header({ topLogos, mainLogo, searchIcon, userMenu, location }: HeaderProps) {
  return (
    <header className={OldHeaderToken.container}>
      {/* top logos */}
      <div className={OldHeaderToken.topLogos}>
        <LogoGroup logos={topLogos} />
      </div>

      {/* main bar */}
      <div className={OldHeaderToken.mainBar}>
        <LogoGroup logos={[mainLogo]} />
        <div className={OldHeaderToken.searchWrapper}>
          <SearchBar placeholder="Buscar en falabella.com" iconSrc={searchIcon} />
        </div>
        <UserMenu items={userMenu} />
      </div>

      {/* location bar */}
      <LocationBar {...location} />
    </header>
  );
}
