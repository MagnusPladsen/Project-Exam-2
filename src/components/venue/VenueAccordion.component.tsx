import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import capitalizeFirstLetter from "../../formatters/capitalizeFirstLetter";
import BreakfastIcon from "../icons/BreakfastIcon.component";
import DropDownIcon from "../icons/DropDownIcon.component";
import ParkingIcon from "../icons/ParkingIcon.component";
import PetsIcon from "../icons/PetsIcon.component";
import WifiIcon from "../icons/WifiIcon.component";
import { useMemo, useState } from "react";
import { Venue } from "../../types/types";
import H2 from "../common/H2.component";
import formatDate from "../../formatters/formatToDate";

function VenueAccordion({
  venue,
  isLoading,
}: {
  venue: Venue | undefined;
  isLoading: boolean;
}) {
  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(true);
  const [facilitiesOpen, setFacilitiesOpen] = useState<boolean>(true);
  const [locationOpen, setLocationOpen] = useState<boolean>(true);

  const venueLocationEmpty = useMemo(
    () =>
      !venue ||
      Object.values(venue.location).every(
        (value) => value === "" || value === 0
      ),
    [venue]
  );

  return (
    <div>
      <div
        onClick={() => setDescriptionOpen((prev) => !prev)}
        className="px-[5vw] lg:px-0 flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-900 border-b border-gray-200 cursor-pointer group"
      >
        <H2 className="group-hover:!text-primary underline-offset-2 group-hover:underline transition-all !font-medium">Information</H2>
        <motion.div animate={{ rotate: descriptionOpen ? 180 : 0 }}>
          <DropDownIcon />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {descriptionOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 border-b border-gray-200 "
          >
            <div className="mb-2 p-5 flex flex-col gap-2 text-gray-900 ">
              {isLoading || !venue ? (
                <Skeleton width={300} height={20} />
              ) : (
                <>
                  <p className="mb-4">
                    {capitalizeFirstLetter(venue.description)}
                  </p>
                  <div className="flex justify-between items-end gap-1 text-xs">
                    <div className="flex flex-col lg:gap-1  gap-2">
                      <p>Max guests: {venue.maxGuests}</p>
                      <p>
                        {venue.bookings.length === 0
                          ? "Never booked before! Be the first one!"
                          : `Booked ${venue.bookings.length} times before`}
                      </p>
                    </div>
                    <div className="flex flex-col lg:gap-1 gap-2">
                      <div className="flex flex-col lg:flex-row lg:gap-1">
                        <p>Updated: </p>
                        <p>{formatDate(venue.updated)}</p>
                      </div>
                      <div className="flex flex-col lg:flex-row lg:gap-1">
                        <p>Created: </p>
                        <p>{formatDate(venue.created)}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onClick={() => setFacilitiesOpen((prev) => !prev)}
        className="px-[5vw] lg:px-0 flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-900 border-b border-gray-200  cursor-pointer hover:text-primary group"
      >
        <H2 className="group-hover:!text-primary underline-offset-2 group-hover:underline transition-all !font-medium">Facilities</H2>
        <motion.div animate={{ rotate: facilitiesOpen ? 180 : 0 }}>
          <DropDownIcon />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {facilitiesOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} // Add exit animation
            transition={{ duration: 0.3 }}
            className="bg-gray-50 border-b border-gray-200 0"
          >
            <div className="mb-2 flex flex-col gap-2 p-5 text-gray-900">
              {isLoading || !venue ? (
                <Skeleton width={300} height={20} />
              ) : (
                <>
                  <div className="flex items-center">
                    <BreakfastIcon className="!w-6 !h-6 mr-4" />
                    <p className="w-24">Breakfast:</p>
                    <p className="font-bold">
                      {venue.meta.breakfast ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <ParkingIcon className="!w-6 !h-6 mr-4" />
                    <p className="w-24">Parking:</p>{" "}
                    <p className="font-bold">
                      {venue.meta.parking ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <PetsIcon className="!w-6 !h-6 mr-4" />
                    <p className="w-24">Pets:</p>{" "}
                    <p className="font-bold">
                      {venue.meta.pets ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <WifiIcon className="!w-6 !h-6 mr-4" />
                    <p className="w-24">Wifi:</p>{" "}
                    <p className="font-bold">
                      {venue.meta.wifi ? "Yes" : "No"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onClick={() => setLocationOpen((prev) => !prev)}
        className="px-[5vw] lg:px-0 flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-900 border-b border-gray-200  cursor-pointer hover:text-primary group"
      >
        <H2 className="group-hover:!text-primary underline-offset-2 group-hover:underline transition-all !font-medium">Location</H2>
        <motion.div animate={{ rotate: locationOpen ? 180 : 0 }}>
          <DropDownIcon />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {locationOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} // Add exit animation
            transition={{ duration: 0.3 }}
            className="bg-gray-50 border-b border-gray-200 "
          >
            <div className="mb-2 p-5 text-gray-900  flex flex-col gap-2">
              {isLoading || !venue ? (
                <Skeleton width={300} height={20} />
              ) : (
                <>
                  {!venueLocationEmpty ? (
                    <>
                      <p>
                        {capitalizeFirstLetter(venue.location.address!)}
                        {capitalizeFirstLetter(venue.location.zip!) &&
                          ", " + capitalizeFirstLetter(venue.location.zip!)}
                      </p>
                      <p>
                        {capitalizeFirstLetter(venue.location.city!)}
                        {capitalizeFirstLetter(venue.location.country!) &&
                          ", " + capitalizeFirstLetter(venue.location.country!)}
                      </p>
                    </>
                  ) : (
                    <p>No location data available for this venue..</p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VenueAccordion;
