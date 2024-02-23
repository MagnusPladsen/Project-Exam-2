import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUpdateProfileMediaStatusMutation } from "../../../services/api/holidazeApi";
import {
  UpdateProfileForm,
  UpdateProfileMediaRequest,
} from "../../../types/types";
import Input from "../../forms/Input.component";
import { FormProvider, SubmitHandler, set, useForm } from "react-hook-form";
import schema from "./validations";
import { yupResolver } from "@hookform/resolvers/yup";
import PrimaryButton from "../../buttons/PrimaryButton.component";
import useAuth from "../../../hooks/useAuth";
import isImageValid from "../../../utils/isImageValid";
import Skeleton from "react-loading-skeleton";
import ErrorMessage from "../../messages/ErrorMessage.component";

function UpdateImageModal({
  open,
  setOpen,
  userImage,
  setUserImage,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  userImage: string | undefined;
  setUserImage: (userImage: string) => void;
}) {
  const [updateProfileMedia] = useUpdateProfileMediaStatusMutation();
  const { user } = useAuth();

  const formMethods = useForm<UpdateProfileForm>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, watch, reset } = formMethods;

  const onSubmit: SubmitHandler<UpdateProfileForm> = (data) =>
    sendProfileMediaChange(data);

  const [imageIsValid, setImageIsValid] = useState(false);
  const [imageIsUnchanged, setImageIsUnchanged] = useState(
    userImage === watch("avatar")
  );

  const sendProfileMediaChange = async (body: UpdateProfileForm) => {
    try {
      const newBody: UpdateProfileMediaRequest = {
        name: user!.name,
        avatar: body.avatar,
      };
      await updateProfileMedia(newBody).unwrap();
      setUserImage(body.avatar);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      reset({ avatar: userImage });
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    const fetchImageValidity = async () => {
      const newImageUrl = watch("avatar");
      const isValid = await isImageValid(newImageUrl);
      if (isValid) {
        setImageIsUnchanged(newImageUrl === userImage);
        setImageIsValid(true);
      }
    };
    fetchImageValidity();
  }, [watch("avatar")]);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className=" max-w-[600px] mx-auto fixed p-4 top-1/2 transform -translate-y-1/2 right-0 left-0 z-50 text-center bg-white rounded-lg sm:p-5 border border-gray-200 shadow-md"
        >
          <FormProvider {...formMethods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              {imageIsUnchanged ? (
                <img
                  src={userImage}
                  alt="Profile picture"
                  className="rounded-full mx-auto"
                />
              ) : (
                <>
                  {imageIsValid ? (
                    <img
                      src={watch("avatar")}
                      alt="Profile picture"
                      className="rounded-full mx-auto"
                    />
                  ) : (
                    <>
                      <img
                        src={userImage}
                        alt="Profile picture"
                        className="rounded-full mx-auto"
                      />
                    </>
                  )}
                </>
              )}
              <Input name="avatar" label="Image url" />
              <PrimaryButton type="submit" className="">
                Update image
              </PrimaryButton>
            </form>
          </FormProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UpdateImageModal;
