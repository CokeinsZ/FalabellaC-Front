import Header from "@/components/organisms/Header";

export default function Home() {
  return (
    <div>
      <Header
        topLogos={[
          { src: "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg", alt: "Falabella" },
          { src: "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltccc5a7e27f9cab2f/6418aba238ab2c1b60a4bc29/logo-homecenter-our-stores.svg", alt: "Homecenter" },
          { src: "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blta5a44443cc0e501c/63b6ff659233961262fbd64c/logo-linio.svg", alt: "Linio" },
        ]}
        mainLogo={{ src: "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt4c474b53ecc2a0ac/65e93b7882d68f0bd6d20cf9/falabella.com_green_icon_mobile.svg", alt: "Falabella", width: 120 }}
        searchIcon="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt71d9874fe32f0ffa/63b733a51d6eeb10b65d828c/hr-3-search-desktop.svg"
        userMenu={[
          { label: "Hola, Inicia sesión" },
          { label: "Mis compras" },
          { iconSrc: "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt9911f33ab05c2d1b/6571a9a2fb0c65496522b68f/heart_desktop_grey.svg" },
          { iconSrc: "https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltbabba471ade83a73/6571a9a270edafe10aed4c36/carritodesk.svg" },
        ]}
        location={{
          iconSrc: "https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt12bfc7a09b55ab55/6538d0cfd31953c6b30dbd57/gray_geofinder.svg",
          text: "Ingresa tu ubicación",
          rightLinks: [
            { label: "Vende en falabella.com" },
            { label: "Tarjetas y cuentas" },
            { label: "Novios" },
            { label: "Ayuda" },
          ],
        }}
      />
      <main className="p-6">Contenido aquí</main>
    </div>
  );
}
