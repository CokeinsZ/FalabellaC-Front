import { CategoryDTO } from "@/hooks/useCategories";

interface CategoriesGridProps {
  title: string;
  categories: CategoryDTO[];
}

export default function CategoriesGrid({
  title,
  categories,
}: CategoriesGridProps) {
  return (
    <section className="px-8 py-10">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-4"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <p className="text-center text-lg font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
