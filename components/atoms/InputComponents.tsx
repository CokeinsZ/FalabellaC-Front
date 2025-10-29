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
  register: UseFormRegisterReturn;
}

export default function InputComponents({
  label,
  typeElement,
  idElement,
  listValues,
  register,
}: InputComponentsProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={idElement}
        className="text-[#333] text-sm font-semibold"
      >
        {label}
      </label>

      {listValues?.length ? (
        <select
          id={idElement}
          {...register}
          className="border-b border-[#ccc] focus:border-[#333] outline-none bg-transparent text-[16px] py-1"
        >
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
          placeholder={`Ingresa tu ${label.toLowerCase()}`}
          className="border-b border-[#ccc] focus:border-[#333] outline-none bg-transparent text-[16px] py-1 placeholder:text-[#999] transition-all duration-150"
        />
      )}
    </div>
  );
}
