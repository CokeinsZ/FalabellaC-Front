import { CategoryDTO } from "@/hooks/useCategories";
import { CategoriesGridToken } from "../../utils/Token";
import CategoriesCard from "../atoms/CategoriesCard";
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
          <CategoriesCard key={cat.id} id={cat.id} name={cat.name} img={cat.img} />
        ))}
      </div>
    </section>
  );
}
