// components/atoms/CategoriesCard.tsx
import { CategoriesCardToken } from "./Token";
interface CategoriesCardDTO {
  id: number;
  name: string;
  img: string;
}

export default function CategoriesCard({ id, name, img }: CategoriesCardDTO) {
  return (
    <div className={CategoriesCardToken.container}>
      <img
        src={img}
        alt={name}
        className={CategoriesCardToken.image}
      />
      <h3 className={CategoriesCardToken.title}>{name}</h3>
    </div>
  );
}
