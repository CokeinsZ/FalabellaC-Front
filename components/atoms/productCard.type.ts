export interface ProductCardDTO {
  id: number | string;
  name: string;
  brand?: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating?: number;
  img: string;
}
