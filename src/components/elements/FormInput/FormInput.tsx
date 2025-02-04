import { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface BaseInputProps {
  name: string;
  label?: string;
  type: string;
  options?: { value: string; label: string }[];
}

type FormInputProps =
  | (BaseInputProps & InputHTMLAttributes<HTMLInputElement>)
  | (BaseInputProps & SelectHTMLAttributes<HTMLSelectElement>);

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type,
  options,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      {type === "select" ? (
        <select
          {...register(name)}
          {...(props as SelectHTMLAttributes<HTMLSelectElement>)}
          className="select select-bordered w-full"
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register(name)}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          type={type}
          className="input input-bordered w-full"
        />
      )}
      <div className="label">
        {errors[name] && (
          <span className="label-text-alt text-error">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    </label>
  );
};

export default FormInput;
