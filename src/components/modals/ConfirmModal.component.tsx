import { AnimatePresence, motion } from "framer-motion";
import PrimaryButton from "../buttons/PrimaryButton.component";
import Crossicon from "../icons/CrossIcon.component";

function ConfirmModal({
  open,
  text,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className=" max-w-[600px] mx-auto absolute p-4 top-1/2 transform -translate-y-1/2 right-0 left-0 z-50 text-center bg-white rounded-lg sm:p-5 border border-gray-200 shadow-md"
        >
          <button
            onClick={onCancel}
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
          >
            <Crossicon />
            <span className="sr-only">Close modal</span>
          </button>

          <p className="mb-4 text-gray-500  py-4 px-2">{text}</p>
          <div className="flex justify-center items-center space-x-4 ">
            <PrimaryButton
              onClick={onCancel}
              className="!bg-white !border-red-500 !text-red-500 "
            >
              No, cancel
            </PrimaryButton>
            <PrimaryButton onClick={onConfirm}>
              Yes, I&apos;m sure
            </PrimaryButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmModal;
