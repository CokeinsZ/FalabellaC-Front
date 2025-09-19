import { CategoryDTO } from "@/hooks/useCategories";
import { CategoriesGridToken } from "../atoms/Token";

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
            <img
              src={cat.img}
              alt={cat.name}
              className={CategoriesGridToken.image}
            />
            <p className={CategoriesGridToken.name}>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
