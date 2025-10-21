// components/atoms/CategoriesCard.tsx
import { CategoriesCardToken } from "../../utils/Token";
import Image from "next/image";
import Link from "next/link";
interface CategoriesCardDTO {
  id: number;
  name: string;
  img: string;
}

export default function CategoriesCard({ id, name, img }: CategoriesCardDTO) {
  return (
    <div className={CategoriesCardToken.container}>
      <Link href={`/categories/${id}`}>
      <Image
        src={img}
        alt={name}
        width={100}
        height={29}
        className={CategoriesCardToken.image}/>
      <h1 className={CategoriesCardToken.title}>{name}</h1>
      </Link>
    </div>
  );
}
