import { UseFormRegisterReturn } from "react-hook-form";
import { standarinput } from "@/lib/Token";
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
          className={standarinput}
        />
      )}
    </>
  );
}