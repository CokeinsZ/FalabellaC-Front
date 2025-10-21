import Cookies from "js-cookie";

export type Address = {
  id: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  barrio?: string;
  adicional?: string;
  usuario_id?: string;
};

const COOKIE_KEY = "selectedAddress";

export function getSelectedAddressFromCookie(): Address | null {
  try {
    const cookie = Cookies.get(COOKIE_KEY);
    if (!cookie) return null;
    return JSON.parse(cookie) as Address;
  } catch {
    return null;
  }
}

export function setSelectedAddressCookie(addr: Address) {
  try {
    Cookies.set(COOKIE_KEY, JSON.stringify(addr), { expires: 7 });
  } catch {
    // noop
  }
}

export function removeSelectedAddressCookie() {
  try {
    Cookies.remove(COOKIE_KEY);
  } catch {
    // noop
  }
}
