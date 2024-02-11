import { ErrorMessage as HookFormErrorMessage } from "@hookform/error-message";
import ErrorMessage from "./ErrorMessage";

function FormErrorMessage({ name }: { name: string }) {
  return (
    <HookFormErrorMessage
      name={name}
      render={({ message }) => <ErrorMessage message={message} />}
    />
  );
}

export default FormErrorMessage;
