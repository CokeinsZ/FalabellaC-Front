// components/atoms/CategoriesCard.tsx
interface CategoriesCardDTO {
  id: number;
  name: string;
  img: string;
}

export default function CategoriesCard({ id, name, img }: CategoriesCardDTO) {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition">
      <img
        src={img}
        alt={name}
        className="w-20 h-20 object-cover rounded-full mb-3"
      />
      <h3 className="text-sm font-medium text-gray-700">{name}</h3>
    </div>
  );
}
