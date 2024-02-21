import { Controller, useFormContext } from "react-hook-form";
import { InputProps } from "../../types/types";
import FormErrorMessage from "../messages/FormErrorMessage.component";

function Input({ name, label, className, ...inputProps }: InputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <div className="flex flex-col w-full gap-2">
            {!!label && (
              <label
                htmlFor={name}
                className={` ${
                  errors[name] && "!text-red-500 "
                } text-left text-gray-500`}
              >
                {label}
              </label>
            )}
            <input
              {...field}
              {...inputProps}
              name={name}
              id={name}
              className={`${
                (errors[name] || fieldState.invalid) && "!border-red-500 "
              } ${className} appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 shadow-inner focus:ring-primary focus:shadow-lg checked:bg-primary checked:border-primary checked:text-white`}
            />
            <FormErrorMessage name={name} />
          </div>
        );
      }}
    />
  );
}

export default Input;
