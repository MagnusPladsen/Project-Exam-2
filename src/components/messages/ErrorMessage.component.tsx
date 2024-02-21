import ErrorIcon from "../icons/ErrorIcon.component";

function ErrorMessage({
  message = "An unknown error occurred, please try again!",
}: {
  message?: string;
}) {
  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-red-500 border border-red-500 rounded-lg bg-red-50 dark:bg-gray-800 text-left"
      role="alert"
      >
      <ErrorIcon  className=""/>
      <span className="sr-only">Info</span>
      <div className="">{message}</div>
    </div>
  );
}

export default ErrorMessage;
