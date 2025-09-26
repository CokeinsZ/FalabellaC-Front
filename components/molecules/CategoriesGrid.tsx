import { CategoryDTO } from "@/hooks/useCategories";
import { CategoriesGridToken } from "../../utils/Token";
import Image from "next/image";
interface CategoriesGridProps {
  title: string;
  categories: CategoryDTO[];
}

export default function CategoriesGrid({
  title,
  categories,
}: CategoriesGridProps) {
  return (
    <section className={CategoriesGridToken.section}>
      <h2 className={CategoriesGridToken.title}>{title}</h2>

      <div className={CategoriesGridToken.grid}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={CategoriesGridToken.card}
          >
            <Image
              src={cat.img}
              alt={cat.name}
              width={100}
              height={24}
              className={CategoriesGridToken.image}
            />
            <p className={CategoriesGridToken.name}>{cat.name.toUpperCase()}</p>
            <p className={CategoriesGridToken.name}>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
