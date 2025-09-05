import { UseFormRegisterReturn } from "react-hook-form";

interface valuesSelect {
  value: string;
  label: string;
}

interface InputComponentsProps {
  label: string;
  typeElement: "text" | "password";
  idElement: string;
  listValues?: valuesSelect[];
  register: UseFormRegisterReturn; // 👈 se pasa desde el padre
}

export default function InputComponents({
  label,
  typeElement,
  idElement,
  listValues,
  register,
}: InputComponentsProps) {
  return (
    <>
      <label htmlFor={idElement} className="font-semibold">
        {label}
      </label>
      {listValues?.length ? (
        <select id={idElement} {...register}>
          {listValues.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register}
          type={typeElement}
          id={idElement}
          className="mt-1 w-full border border-gray-400 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      )}
    </>
  );
}
