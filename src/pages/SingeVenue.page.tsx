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

function SingleVenuePage() {
  const { id } = useParams(); // Get the venue ID from URL parameter

  const [descriptionOpen, setDescriptionOpen] = useState<boolean>();
  const [facilitiesOpen, setFacilitiesOpen] = useState<boolean>();
  const [locationOpen, setLocationOpen] = useState<boolean>();

  const { data: venue, error, isLoading } = useGetSingleVenueQuery(String(id));
  console.log(venue, id);

  return (
    <article className="py-8 lg:py-16 lg:px-6 w-[100vw] lg:w-[900px] xl:max-w-lg mx-auto dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-5 text-3xl text-center tracking-tight font-extrabold text-gray-900 dark:text-white">
        {isLoading || !venue ? (
          <Skeleton width={200} height={20} />
        ) : (
          venue.name
        )}
      </h1>
      <div className="lg:p-0 px-[5vw] flex justify-between items-center mb-5 text-gray-500">
        {isLoading || !venue ? (
          <Skeleton width={50} height={20} />
        ) : (
          <span className=" bg-primary-light text-primary text-xs font-medium inline-flex items-center px-2.5 py-1 rounded dark:bg-primary-light dark:text-primary gap-2">
            <LocationIcon /> {venue.location.country}
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

      {venue?.media && venue?.media.length > 0 && (
        <ImageSlider
          images={[...venue?.media, ...venue?.media, ...venue?.media]}
        />
      )}
      <div className="px-[5vw] lg:p-0 mb-10">
        <h2>
          <button
            onClick={() => setDescriptionOpen((prev) => !prev)}
            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          >
            <span>Description</span>
            <motion.div animate={{ rotate: descriptionOpen ? 180 : 0 }}>
              <DropDownIcon />
            </motion.div>
          </button>
        </h2>
        <AnimatePresence initial={false}>
          {descriptionOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} // Add exit animation
              transition={{ duration: 0.3 }}
              className=" border-b border-gray-200 dark:border-gray-700"
            >
              <p className="mb-2 p-5 text-gray-500 dark:text-gray-400">
                {isLoading || !venue ? (
                  <Skeleton width={300} height={20} />
                ) : (
                  venue.description
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <div onClick={() => setFacilitiesOpen((prev) => !prev)}>
          <button
            type="button"
            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          >
            <h2>Facilities</h2>
            <motion.div animate={{ rotate: descriptionOpen ? 180 : 0 }}>
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
              className=" border-b border-gray-200 dark:border-gray-700"
            >
              <p className="mb-2 p-5 text-gray-500 dark:text-gray-400">
                {isLoading || !venue ? (
                  <Skeleton width={300} height={20} />
                ) : (
                  venue.description
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <div onClick={() => setLocationOpen((prev) => !prev)}>
          <button className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3">
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
              className=" border-b border-gray-200 dark:border-gray-700"
            >
              <p className="mb-2 p-5 text-gray-500 dark:text-gray-400">
                {isLoading || !venue ? (
                  <Skeleton width={300} height={20} />
                ) : (
                  venue.description
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/*  <p className="lg:p-0 px-[5vw] mb-5 font-light text-gray-500 dark:text-gray-400">
        {isLoading || !venue ? (
          <Skeleton width={300} height={20} />
        ) : (
          venue.description
        )}
      </p> */}

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
                venue.owner.name
              )}
            </span>
          </div>
        </Link>
      </div>
    </article>
  );
}

export default SingleVenuePage;
