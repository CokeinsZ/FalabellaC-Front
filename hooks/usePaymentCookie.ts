import Cookies from "js-cookie";

export type CreditCard = {
  id: string
  nombre_titular: string
  numero_enc: string
  cvv_enc: string
  expiracion_month: string
  expiracion_year: string
  last4: string
  usuario_id: string
}

const COOKIE_KEY = "selectedPayment";

export function getSelectedPaymentFromCookie(): CreditCard | null {
  try {
    const cookie = Cookies.get(COOKIE_KEY);
    if (!cookie) return null;
    return JSON.parse(cookie) as CreditCard;
  } catch {
    return null;
  }
}

export function setSelectedPaymentCookie(card: CreditCard) {
  try {
    Cookies.set(COOKIE_KEY, JSON.stringify(card), { expires: 7 });
  } catch {
    // noop
  }
}

export function removeSelectedPaymentCookie() {
  try {
    Cookies.remove(COOKIE_KEY);
  } catch {
    // noop
  }
}
