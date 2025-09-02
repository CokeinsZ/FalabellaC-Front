import Icon from "../atoms/Icon";

export default function LocationInput() {
  return (
    <div className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
      <Icon src="https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt12bfc7a09b55ab55/6538d0cfd31953c6b30dbd57/gray_geofinder.svg" alt="Ubicación" />
      <span>Ingresa tu ubicación</span>
    </div>
  );
}
