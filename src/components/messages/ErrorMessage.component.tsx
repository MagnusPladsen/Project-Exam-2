import { AnimatePresence, motion } from "framer-motion";
import ErrorIcon from "../icons/ErrorIcon.component";

function ErrorMessage({
  message = "An unknown error occurred, please try again!",
  className =" ",
  show,
}: {
  message?: string;
  className?: string;
  show?: boolean;
}) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`${className} flex items-center p-4 mb-4 text-sm text-red-500 border border-red-500 rounded-lg bg-red-50 text-left`}
          role="alert"
        >
          <ErrorIcon className="" />
          <span className="sr-only">Info</span>
          <div className="">{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ErrorMessage;
