import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import sanitizeUrl from "../../../formatters/sanitizeUrl";
import useIsMobile from "../../../hooks/useIsMobile";
import {
  useCreateVenueMutation,
  useUpdateVenueMutation,
} from "../../../services/api/holidazeApi";
import { CreateVenue, CreateVenueRequest, Venue } from "../../../types/types";
import isImageValid from "../../../utils/isImageValid";
import PrimaryButton from "../../buttons/PrimaryButton.component";
import SecondaryButton from "../../buttons/SecondaryButton.component";
import H2 from "../../common/H2.component";
import Input from "../../forms/Input.component";
import TextArea from "../../forms/TextArea.component";
import Crossicon from "../../icons/CrossIcon.component";
import ErrorMessage from "../../messages/ErrorMessage.component";
import schema from "./validation";

function VenueModal({
  open,
  setOpen,
  venue,
  updateMode,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  venue?: Venue;
  updateMode?: boolean;
}) {
  const navigate = useNavigate();
  const { isMobile } = useIsMobile();
  const [createVenue, { error: createError }] = useCreateVenueMutation();
  const [updateVenue, { error: updateError }] = useUpdateVenueMutation();

  const formMethods = useForm<CreateVenue>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, setValue, watch, reset, setError } = formMethods;

  const onSubmit: SubmitHandler<CreateVenue> = (data) => submitForm(data);

  const submitForm = async (data: CreateVenue) => {
    try {
      const requestBody: CreateVenueRequest = {
        ...data,
        meta: {
          wifi: data.wifi ?? false,
          parking: data.parking ?? false,
          breakfast: data.breakfast ?? false,
          pets: data.pets ?? false,
        },
        location: {
          address: data.address,
          city: data.city,
          country: data.country,
          zip: data.zip,
        },
        media: data.media
          ? data.media.split(",").map((media) => media.trim())
          : undefined,
      };
      console.log("submit", requestBody);
      const res = updateMode
        ? await updateVenue({ body: requestBody, id: venue?.id ?? "" }).unwrap()
        : await createVenue(requestBody).unwrap();
      console.log(res);
      if (res) {
        setOpen(false);
        navigate(`/venues/${res.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (venue && updateMode) {
      reset({
        ...venue,
        media: venue.media.join(", "),
        wifi: venue.meta.wifi,
        parking: venue.meta.parking,
        breakfast: venue.meta.breakfast,
        pets: venue.meta.pets,
        address: venue.location.address,
        city: venue.location.city,
        zip: venue.location.zip,
        country: venue.location.country,
      });
    }
  }, [venue, updateMode]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

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
            className="absolute top-0 lg:top-[100px] left-0 lg:left-1/2 lg:-translate-x-1/2 lg:transform w-full lg:max-w-md z-40"
          >
            <div className="relative overflow-y-scroll lg:mt-0 bg-white lg:rounded-lg border border-gray-200 lg:shadow-md dark:bg-gray-700 h-[calc(100vh-64px)] lg:h-[80vh] ">
              <div className="fixed bg-white lg:shadow flex items-center justify-between p-4 border-b lg:rounded-t w-full border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 ">
                  {updateMode ? "Update booking" : "Create new booking"}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="hover:text-primary text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg hover:border hover:border-primary text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white transition-all"
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
                <div className="flex flex-col gap-4 lg:mb-10 ">
                  <Input
                    name="name"
                    label="Name"
                    className="!w-full"
                    placeholder="Hotel California"
                  />
                  <TextArea
                    name="description"
                    label="Description"
                    className="!w-full h-32"
                    placeholder="A lovely hotel with a great view."
                  />
                  <Input
                    name="price"
                    label="Price per night"
                    type="number"
                    min={0}
                    className="!w-full"
                    placeholder="100"
                  />
                  <div className="flex flex-col gap-2">
                    <TextArea
                      name="media"
                      label="Images *"
                      className="w-full appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 shadow-inner focus:ring-primary focus:shadow-lg h-32"
                      placeholder="https://www.example.com/image1.jpg"
                      onBlur={(e) => {
                        if (!e.target.value) return;
                        const urlArray = e.target.value
                          .split(",")
                          .map((media) => media.trim());
                        const sanitizedUrlArray = urlArray.map((url) =>
                          sanitizeUrl(url)
                        );
                        const validImageUrls = sanitizedUrlArray.filter(
                          async (url) => {
                            (await isImageValid(url))
                              ? true
                              : setError("media", {
                                  message: "Invalid image url removed",
                                });
                          }
                        );
                        const sanitizedUrls = validImageUrls.join(", ");
                        setValue("media", sanitizedUrls);
                      }}
                    />
                    <p className="text-xs pl-2 text-gray-400">
                      * Optional, separate url&apos;s with commas
                    </p>
                  </div>{" "}
                  <div className="flex gap-4 justify-between w-full items-start">
                    <Input
                      name="maxGuests"
                      label="Max guests"
                      type="number"
                      min={0}
                      className="!w-full"
                      placeholder="2"
                    />
                    <div className="w-full flex flex-col gap-2">
                      <Input
                        name="rating"
                        label="Rating out of 5 *"
                        type="number"
                        min={0}
                        max={5}
                        className="!w-full"
                        placeholder="5"
                      />
                      <p className="pl-2 text-xs text-gray-400">* Optional</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-6 pt-8 w-full border-t">
                    <H2 className="underline underline-offset-2 ">Included</H2>
                    <div className="flex justify-between w-full">
                      <Input
                        name="wifi"
                        label="Wifi"
                        type="checkbox"
                        className="!h-8 !w-8"
                        defaultChecked={watch("wifi")}
                      />
                      <Input
                        name="parking"
                        label="Parking"
                        type="checkbox"
                        className="!h-8 !w-8"
                        defaultChecked={watch("parking")}
                      />
                      <Input
                        name="breakfast"
                        label="Breakfast"
                        type="checkbox"
                        className="!h-8 !w-8"
                        defaultChecked={watch("breakfast")}
                      />
                      <Input
                        name="pets"
                        label="Pets"
                        type="checkbox"
                        className="!h-8 !w-8"
                        defaultChecked={watch("pets")}
                      />
                    </div>
                  </div>
                  <H2 className="underline underline-offset-2 mt-6 pt-8 w-full border-t">
                    Location
                  </H2>
                  <div className="w-full flex flex-col gap-2">
                    <Input
                      name="address"
                      label="Address"
                      className="!w-full"
                      placeholder="123 Main St."
                    />
                    <p className="pl-2 text-xs text-gray-400">* Optional</p>
                  </div>
                  <div className="flex gap-4 justify-between w-full">
                    <div className="w-full flex flex-col gap-2">
                      <Input
                        name="zip"
                        label="Zip"
                        type="number"
                        min={0}
                        className="!w-[100px]"
                        placeholder="12345"
                      />
                      <p className="pl-2 text-xs text-gray-400">* Optional</p>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <Input
                        name="city"
                        label="City *"
                        className=""
                        placeholder="Los Angeles"
                      />
                      <p className="pl-2 text-xs text-gray-400">* Optional</p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Input
                      name="country"
                      label="Country"
                      className="!w-full"
                      placeholder="United States"
                    />
                    <p className="pl-2 text-xs text-gray-400">* Optional</p>
                  </div>
                </div>
                <div className="fixed bottom-[64px] lg:bottom-0 bg-white lg:shadow flex justify-between border-t rounded-b p-4 w-full border-gray-200 left-0">
                  <SecondaryButton
                    onClick={() => setOpen(false)}
                    className="text-sm"
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton type="submit" className="text-sm">
                    {updateMode ? "Update booking" : "Create booking"}
                  </PrimaryButton>
                </div>

                <ErrorMessage
                  show={!!(createError ?? updateError)}
                  className="mt-4 fixed bottom-36 z-50 lg:left-1/2 lg:-translate-x-1/2 lg:transform lg:w-[80%]"
                  message="Something went wrong, please try again!"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormProvider>
  );
}

export default VenueModal;
