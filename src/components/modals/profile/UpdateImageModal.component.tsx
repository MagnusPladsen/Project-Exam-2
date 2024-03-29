import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useUpdateProfileMediaStatusMutation } from "../../../services/api/holidazeApi";
import {
  UpdateProfileForm,
  UpdateProfileMediaRequest,
} from "../../../types/types";
import isImageValid from "../../../utils/isImageValid";
import PrimaryButton from "../../buttons/PrimaryButton.component";
import SecondaryButton from "../../buttons/SecondaryButton.component";
import Input from "../../forms/Input.component";
import schema from "./validations";
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
  const [updateProfileMedia, { error }] = useUpdateProfileMediaStatusMutation();
  const { user } = useAuth();

  const formMethods = useForm<UpdateProfileForm>({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = formMethods;

  const onSubmit: SubmitHandler<UpdateProfileForm> = (data) =>
    sendProfileMediaChange(data);

  const [imageIsUnchanged, setImageIsUnchanged] = useState(
    userImage === watch("avatar")
  );
  const [errorMessage, setErrorMessage] = useState<string>(
    "Something went wrong. Please try again!"
  );

  const sendProfileMediaChange = async (body: UpdateProfileForm) => {
    try {
      const imageIsValid = await isImageValid(body.avatar);
      if (imageIsValid) {
        const newBody: UpdateProfileMediaRequest = {
          name: user!.name,
          avatar: body.avatar,
        };
        await updateProfileMedia(newBody).unwrap();
        setUserImage(body.avatar);
        setOpen(false);
      }
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    setImageIsUnchanged(watch("avatar") === userImage);
    trigger("avatar");
  }, [watch("avatar")]);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className=" w-[100vw] lg:h-[600px] h-[100vh] lg:max-w-[600px] mx-auto fixed p-4 top-1/2 transform -translate-y-1/2 right-0 left-0 z-50 text-center bg-white sm:p-5 border border-gray-200 shadow-md"
        >
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full h-full flex flex-col gap-4">
                {imageIsUnchanged ? (
                  <img
                    src={userImage}
                    alt="Profile picture"
                    className="rounded-full mx-auto aspect-square h-[300px] w-[300px] object-cover"
                  />
                ) : (
                  <>
                    {!errors.avatar?.message ? (
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

                <Input
                  name="avatar"
                  label="Image url"
                  placeholder={userImage ?? "https://image.com"}
                />
                <div className="flex justify-between">
                  <SecondaryButton type="button" onClick={() => setOpen(false)}>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton type="submit" className="">
                    Update image
                  </PrimaryButton>
                </div>
                <ErrorMessage message={errorMessage} show={!!error} />
              </div>
            </form>
          </FormProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UpdateImageModal;
