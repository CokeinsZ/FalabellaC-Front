import LogoGroup from "../molecules/LogoGroup";
import SearchBar from "../molecules/SearchBar";
import UserMenu from "../molecules/UserMenu";
import LocationBar from "../molecules/LocationBar";

interface HeaderProps {
  topLogos: { src: string; alt: string; width?: number; height?: number }[];
  mainLogo: { src: string; alt: string; width?: number; height?: number };
  searchIcon: string;
  userMenu: { label?: string; iconSrc?: string; href?: string }[];
  location: { iconSrc: string; text: string; rightLinks?: { label: string; href?: string }[] };
}

export default function Header({ topLogos, mainLogo, searchIcon, userMenu, location }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 shadow-sm">
      {/* top logos */}
      <div className="px-6 py-2 border-b flex justify-start">
        <LogoGroup logos={topLogos} />
      </div>

      {/* main bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <LogoGroup logos={[mainLogo]} />
        <div className="flex w-1/2 items-center">
          <SearchBar placeholder="Buscar en falabella.com" iconSrc={searchIcon} />
        </div>
        <UserMenu items={userMenu} />
      </div>

      {/* location bar */}
      <LocationBar {...location} />
    </header>
  );
}
