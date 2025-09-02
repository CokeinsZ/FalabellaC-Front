import Logo from "../atoms/Logo";

export default function NavIcons() {
  return (
    <div className="flex items-center gap-4">
      <Logo src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg" alt="Falabella" />
      <Logo src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltccc5a7e27f9cab2f/6418aba238ab2c1b60a4bc29/logo-homecenter-our-stores.svg" alt="Homecenter" width={100} />
      <Logo src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blta5a44443cc0e501c/63b6ff659233961262fbd64c/logo-linio.svg" alt="Linio" width={80} />
    </div>
  );
}
