import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import sanitizeUrl from "../../../formatters/sanitizeUrl";
import useAuth from "../../../hooks/useAuth";
import { useCreateVenueMutation } from "../../../services/api/holidazeApi";
import { CreateVenue } from "../../../types/types";
import PrimaryButton from "../../buttons/PrimaryButton.component";
import SecondaryButton from "../../buttons/SecondaryButton.component";
import Input from "../../forms/Input.component";
import Crossicon from "../../icons/CrossIcon.component";
import schema from "./validation";
import H2 from "../../common/H2.component";
import useIsMobile from "../../../hooks/useIsMobile";

function CreateVenueModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const { saveUser } = useAuth();
  const { isMobile } = useIsMobile();

  const formMethods = useForm<CreateVenue>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue } = formMethods;

  const onSubmit: SubmitHandler<CreateVenue> = (data) => submitForm(data);

  const [createVenue, { error }] = useCreateVenueMutation();

  const submitForm = async (data: CreateVenue) => {
    try {
      const res = await createVenue(data).unwrap();
      // update profile bookings
      if (res) {
        navigate(`/venues/${res.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, top: "200%" }}
            animate={{
              opacity: 1,
              top: isMobile ? 0 : "100px",
            }}
            exit={{ opacity: 0, height: 0, top: "200%" }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
            className="absolute top-0 lg:top-[100px] left-0 lg:left-1/2 lg:-translate-x-1/2 lg:transform w-full lg:max-w-md z-20 "
          >
            <div className="relative overflow-y-scroll mt-[60px] lg:mt-0 bg-white lg:rounded-lg border border-gray-200 shadow-md dark:bg-gray-700 h-[calc(100vh-64px)] lg:h-[80vh] ">
              <div className="fixed bg-white shadow flex items-center justify-between p-4 border-b rounded-t w-full border-gray-200">
                <h3 className=" text-lg font-semibold text-gray-900 ">
                  Create new booking
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                >
                  <Crossicon />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full px-4 mt-20 lg:mt-4 pb-20 lg:pt-20"
              >
                <div className="flex flex-col gap-4 mb-20 lg:mb-10 ">
                  <Input name="name" label="Name" className="!w-full" />
                  <Input
                    name="description"
                    label="Description"
                    className="!w-full"
                  />
                  <Input
                    name="price"
                    label="Price"
                    type="number"
                    min={0}
                    className="!w-full"
                  />
                  <div className="flex flex-col gap-1">
                    <Input
                      name="media"
                      label="Images (optional)"
                      className="!w-full"
                      placeholder="https://www.example.com/image1.jpg"
                      onBlur={(e) => {
                        if (!e.target.value) return;
                        const urlArray = e.target.value
                          .split(",")
                          .map((media) => media.trim());
                        const sanitizedUrlArray = urlArray.map((url) =>
                          sanitizeUrl(url)
                        );
                        const sanitizedUrls = sanitizedUrlArray.join(", ");
                        setValue("media", sanitizedUrls);
                      }}
                    />
                    <p className="text-xs text-gray-400">
                      Hint: Separate url&apos;s with commas
                    </p>
                  </div>
                  <Input
                    name="maxGuests"
                    label="Max guests"
                    type="number"
                    min={0}
                    className="!w-full"
                  />
                  <Input
                    name="rating"
                    label="Rating out of 5 (optional)"
                    type="number"
                    min={0}
                    max={5}
                    className="!w-full"
                  />
                  <div className="flex flex-col gap-2 mt-6 pt-8 w-full border-t">
                    <H2 className="underline underline-offset-2 ">Included</H2>
                    <div className="flex justify-between w-full">
                      <Input
                        name="wifi"
                        label="Wifi"
                        type="checkbox"
                        className="!h-8 !w-8"
                      />
                      <Input
                        name="parking"
                        label="Parking"
                        type="checkbox"
                        className="!h-8 !w-8"
                      />
                      <Input
                        name="breakfast"
                        label="Breakfast"
                        type="checkbox"
                        className="!h-8 !w-8"
                      />
                      <Input
                        name="pets"
                        label="Pets"
                        type="checkbox"
                        className="!h-8 !w-8"
                      />
                    </div>
                  </div>
                  <H2 className="underline underline-offset-2 mt-6 pt-8 w-full border-t">
                    Location
                  </H2>
                  <Input name="address" label="Address" className="!w-full" />
                  <div className="flex gap-4 justify-between ">
                    <Input name="city" label="City" className="!w-full" />
                    <Input
                      name="Zip"
                      label="Description"
                      type="number"
                      min={0}
                    />
                  </div>
                  <Input name="contry" label="Country" className="!w-full" />
                </div>
                <div className="fixed bottom-[64px] lg:bottom-0 bg-white shadow flex justify-between border-t rounded-b p-4 w-full border-gray-200 left-0">
                  <SecondaryButton
                    onClick={() => setOpen(false)}
                    className="text-sm"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton type="submit" className="text-sm">
                    Create booking
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormProvider>
  );
}

export default CreateVenueModal;
