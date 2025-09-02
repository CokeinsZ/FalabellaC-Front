import Icon from "../atoms/Icon";

export default function UserActions() {
  return (
    <div className="flex items-center gap-6 text-sm">
      <span className="cursor-pointer">Hola, Inicia sesión</span>
      <span className="cursor-pointer">Mis compras</span>
      <Icon src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/blt9911f33ab05c2d1b/6571a9a2fb0c65496522b68f/heart_desktop_grey.svg" alt="Favoritos" />
      <Icon src="https://images.falabella.com/v3/assets/blt088e6fffbba20f16/bltbabba471ade83a73/6571a9a270edafe10aed4c36/carritodesk.svg" alt="Carrito" />
    </div>
  );
}
