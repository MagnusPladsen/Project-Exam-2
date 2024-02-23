import { ErrorMessage as HookFormErrorMessage } from "@hookform/error-message";
import ErrorMessage from "./ErrorMessage.component";
import { FieldErrors, FieldValues } from "react-hook-form";

function FormErrorMessage({
  name,
  errors,
}: {
  name: string;
  errors: FieldErrors<FieldValues>;
}) {
  return (
    <HookFormErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => <ErrorMessage show={!!errors[name]} message={message} />}
    />
  );
}

export default FormErrorMessage;
