// components/atoms/CategoriesCard.tsx
import { CategoriesCardToken } from "../../utils/Token";
import Image from "next/image";
interface CategoriesCardDTO {
  id: number;
  name: string;
  img: string;
}

export default function CategoriesCard({ id, name, img }: CategoriesCardDTO) {
  return (
    <div className={CategoriesCardToken.container}>
      <Image
        src={img}
        alt={name}
        width={100}
        height={24}
        className={CategoriesCardToken.image}/>
      <h3 className={CategoriesCardToken.title}>{name}</h3>
    </div>
  );
}
