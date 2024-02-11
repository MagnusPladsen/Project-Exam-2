import { useFormContext } from "react-hook-form";
import FormErrorMessage from "../messages/FormErrorMessage";

function Input({ name, label, className, ...inputProps }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col w-full my-5 gap-2">
      {!!label && (
        <label
          htmlFor={name}
          className={` ${errors[name] && "!text-red-500 "} text-left text-gray-500`}
        >
          {label}
        </label>
      )}
      <input
        {...register(name)}
        {...inputProps}
        name={name}
        id={name}
        className={`${
          errors[name] && "!border-red-500 "
        } ${className} appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg`}
      />
      <FormErrorMessage name={name} />
    </div>
  );
}

export default Input;
