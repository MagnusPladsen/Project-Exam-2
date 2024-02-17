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

function VenueAccordion({
  venue,
  isLoading,
}: {
  venue: Venue;
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
    <>
      <div>
        <button
          onClick={() => setDescriptionOpen((prev) => !prev)}
          className="px-[5vw] lg:px-0 flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-900 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
        >
          <H2>Information</H2>
          <motion.div animate={{ rotate: descriptionOpen ? 180 : 0 }}>
            <DropDownIcon />
          </motion.div>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {descriptionOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} // Add exit animation
            transition={{ duration: 0.3 }}
            className="bg-gray-50 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="mb-2 p-5 flex flex-col gap-2 text-gray-900 dark:text-gray-400">
              {isLoading || !venue ? (
                <Skeleton width={300} height={20} />
              ) : (
                <>
                  <p className="mb-2">
                    {capitalizeFirstLetter(venue.description)}
                  </p>
                  <p className="text-sm">
                    {venue.bookings.length === 0
                      ? "Never rented before! Be the first one!"
                      : `Rented ${venue.bookings.length} times before`}
                  </p>
                  <p className="text-sm">Max guests: {venue.maxGuests}</p>
                  <p className="text-sm">
                    Created:{" "}
                    {new Date(venue.created).toISOString().split("T")[0]}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div onClick={() => setFacilitiesOpen((prev) => !prev)}>
        <button className="px-[5vw] lg:px-0 flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-900 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3">
          <H2>Facilities</H2>
          <motion.div animate={{ rotate: facilitiesOpen ? 180 : 0 }}>
            <DropDownIcon />
          </motion.div>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {facilitiesOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} // Add exit animation
            transition={{ duration: 0.3 }}
            className="bg-gray-50 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="mb-2 flex flex-col gap-2 p-5 text-gray-900 dark:text-gray-400">
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
      <div onClick={() => setLocationOpen((prev) => !prev)}>
        <button className="px-[5vw] lg:px-0 flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-900 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3">
          <H2>Location</H2>
          <motion.div animate={{ rotate: locationOpen ? 180 : 0 }}>
            <DropDownIcon />
          </motion.div>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {locationOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} // Add exit animation
            transition={{ duration: 0.3 }}
            className="bg-gray-50 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="mb-2 p-5 text-gray-900 dark:text-gray-400 flex flex-col gap-2">
              {isLoading || !venue ? (
                <Skeleton width={300} height={20} />
              ) : (
                <>
                  {!venueLocationEmpty ? (
                    <>
                      <p>
                        {capitalizeFirstLetter(venue.location.address)}
                        {capitalizeFirstLetter(venue.location.zip) &&
                          ", " + capitalizeFirstLetter(venue.location.zip)}
                      </p>
                      <p>
                        {capitalizeFirstLetter(venue.location.city)}
                        {capitalizeFirstLetter(venue.location.country) &&
                          ", " + capitalizeFirstLetter(venue.location.country)}
                        {capitalizeFirstLetter(venue.location.continent) &&
                          ", " +
                            capitalizeFirstLetter(venue.location.continent)}
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
    </>
  );
}

export default VenueAccordion;
