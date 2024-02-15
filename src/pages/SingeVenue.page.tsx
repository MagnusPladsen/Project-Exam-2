import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ArrowIcon from "../components/icons/ArrowIcon.component";
import LocationIcon from "../components/icons/LocationIcon.component";
import ProfileIcon from "../components/icons/Profileicon.component";
import HolidazeTooltip from "../components/tooltip/HolidazeTooltip.component";
import { useGetSingleVenueQuery } from "../services/api/holidazeApi";
import { motion, AnimatePresence } from "framer-motion";
import ImageSlider from "../components/imageSlider/ImageSlider.component";
import { useState } from "react";
import DropDownIcon from "../components/icons/DropDownIcon.component";
import capitalizeFirstLetter from "../formatters/capitalizeFirstLetter";
import BreakfastIcon from "../components/icons/BreakfastIcon.component";
import ParkingIcon from "../components/icons/ParkingIcon.component";
import PetsIcon from "../components/icons/PetsIcon.component";
import WifiIcon from "../components/icons/WifiIcon.component";

function SingleVenuePage() {
  const { id } = useParams(); // Get the venue ID from URL parameter

  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(true);
  const [facilitiesOpen, setFacilitiesOpen] = useState<boolean>(true);
  const [locationOpen, setLocationOpen] = useState<boolean>(true);

  const { data: venue, error, isLoading } = useGetSingleVenueQuery(String(id));
  console.log(venue, id);

  return (
    <article className="py-8 lg:py-16 lg:px-6 w-[100vw] lg:w-[900px] mx-auto dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-5 text-3xl text-center tracking-tight font-extrabold text-gray-900 dark:text-white truncate text-ellipsis p-[5vw]">
        {isLoading || !venue ? (
          <Skeleton width={200} height={20} />
        ) : (
          capitalizeFirstLetter(venue.name)
        )}
      </h1>
      <div className="lg:p-0 px-[5vw] flex justify-between items-center mb-5 text-gray-500">
        {isLoading || !venue ? (
          <Skeleton width={50} height={20} />
        ) : (
          <span className="bg-green-200 text-green-600 font-medium inline-flex items-center px-2.5 py-1 rounded dark:bg-primary-light gap-2">
            Price: <span className="font-bold">$ {venue.price}</span>
          </span>
        )}
        <HolidazeTooltip id="venue-rating" />
        <span
          data-tooltip-id="venue-rating"
          data-tooltip-content={`This venue has gotten an average rating of ${venue?.rating} out of 5`}
          className="text-sm"
        >
          <StarRatings
            rating={isLoading || !venue ? 5 : venue.rating}
            numberOfStars={5}
            starRatedColor={"gold"}
            starDimension={"20px"}
            starSpacing={"0px"}
          />
        </span>
      </div>

      {isLoading || !venue ? (
        <Skeleton width={"100%"} height={600} />
      ) : venue.media.length > 0 ? (
        <ImageSlider
          images={venue.media}
          className="rounded"
          imageClassName="rounded"
        />
      ) : (
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1255/image-not-found.svg"
          alt="Venue"
          className="max-h-[600px] lg:max-h-[800px] w-full border bg-primary-light rounded"
        />
      )}

      <div className="mb-10">
        <div>
          <button
            onClick={() => setDescriptionOpen((prev) => !prev)}
            className="px-[5vw] lg:px-0 flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-900 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          >
            <h2>Information</h2>
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
                    <p className="mb-2">{capitalizeFirstLetter(venue.description)}</p>
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
          <button
            type="button"
            className="px-[5vw] lg:px-0 flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-900 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          >
            <h2>Facilities</h2>
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
            <h2>Location</h2>
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
                        ", " + capitalizeFirstLetter(venue.location.continent)}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:p-0 px-[5vw] flex justify-between items-center">
        <Link
          to={`/venues`}
          className="inline-flex items-center font-medium text-primary hover:underline"
        >
          <motion.div style={{ rotate: -180 }}>
            <ArrowIcon />
          </motion.div>
          All venues
        </Link>
        <Link
          className="cursor-pointer hover:underline underline-offset-2 hover:text-primary group transition-all"
          to={`/profile?name=${venue?.owner.name}`}
        >
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <Skeleton circle width={28} height={28} />
            ) : (
              <>
                <p className="mr-2">Posted by:</p>
                {venue?.owner?.avatar ? (
                  <img
                    className="w-7 h-7 rounded-full group-hover:opacity-80 transition-all border-2 group-hover:border-primary border-white"
                    src={venue.owner.avatar}
                    alt={`${venue.owner.name}'s avatar`}
                  />
                ) : (
                  <ProfileIcon className="!mb-0 !w-7 !h-7" />
                )}
              </>
            )}

            <span className="font-medium dark:text-white ">
              {isLoading || !venue ? (
                <Skeleton width={100} height={20} />
              ) : (
                capitalizeFirstLetter(venue.owner.name)
              )}
            </span>
          </div>
        </Link>
      </div>
    </article>
  );
}

export default SingleVenuePage;
