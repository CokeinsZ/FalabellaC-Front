import LogoGroup from "../molecules/LogoGroup";
import SearchBar from "../molecules/SearchBar";
import UserMenu from "../molecules/UserMenu";
import LocationBar from "../molecules/LocationBar";
<<<<<<< HEAD
=======
import Login from "./Login";
import { HeaderToken } from "../atoms/Token";
>>>>>>> 77f11344a11ea79e20b63bb5f6f541e914ac331e

interface HeaderProps {
  topLogos: { src: string; alt: string; width?: number; height?: number }[];
  mainLogo: { src: string; alt: string; width?: number; height?: number };
  searchIcon: string;
  userMenu: { label?: string; iconSrc?: string; href?: string }[];
  location: { iconSrc: string; text: string; rightLinks?: { label: string; href?: string }[] };
}

export default function Header({ topLogos, mainLogo, searchIcon, userMenu, location }: HeaderProps) {
  return (
<<<<<<< HEAD
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
=======
    <header className={HeaderToken.container}>
      {/* Barra superior con logos */}
      <div className={HeaderToken.topBar}>
        <a
          href="https://www.falabella.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src= "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
            alt="Falabella"
            width={100}
            height={24}
          />
        </a>

        <a
          href="https://www.homecenter.com.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src = "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltccc5a7e27f9cab2f/6418aba238ab2c1b60a4bc29/logo-homecenter-our-stores.svg"
            alt="Homecenter"
            width={100}
            height={24}
          />
        </a>

        <a
          href="https://www.linio.com.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src= "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blta5a44443cc0e501c/63b6ff659233961262fbd64c/logo-linio.svg"
            alt="Linio"
            width={100}
            height={24}
          />
        </a>
      </div>

      {/* Barra principal */}
      <div className={HeaderToken.mainBar}>
        {/* Logo Falabella principal */}
        <div className={HeaderToken.logoWrapper}>
          <Image
            src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg"
            alt="Falabellla"
            width={120}
            height={40}
          />
        </div>

        {/* Menú y buscador */}
        <div className={HeaderToken.menuWrapper}>
          <button
              aria-label="Abrir menú"
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              <Menu size={20} />
              Menu
            </button>
          <div className={HeaderToken.searchWrapper}>
            <input
              type="text"
              placeholder="Buscar en falabella.com"
              className={HeaderToken.searchInput}
            />
            <button className={HeaderToken.searchButton}>
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Acciones */}
          <div className={HeaderToken.actionsWrapper}>
          <button
            className={HeaderToken.loginButton}
            onClick={() => setIsLoginOpen(true)}
          >
            Hola, Inicia sesión
          </button>
          <button className={HeaderToken.purchasesButton}>Mis compras</button>
          <Heart />
          <div className={HeaderToken.cartWrapper}>
            <ShoppingCart />
            <span className={HeaderToken.cartBadge}>
              0
            </span>
          </div>
>>>>>>> 77f11344a11ea79e20b63bb5f6f541e914ac331e
        </div>
        <UserMenu items={userMenu} />
      </div>

      {/* location bar */}
      <LocationBar {...location} />
    </header>
  );
}
