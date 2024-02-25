import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import capitalizeFirstLetter from "../../formatters/capitalizeFirstLetter";
import { Venue } from "../../types/types";
import H2 from "../common/H2.component";
import ArrowIcon from "../icons/ArrowIcon.component";
import Crossicon from "../icons/CrossIcon.component";
import EditIcon from "../icons/EditIcon.component";
import MoreIcon from "../icons/MoreIcon.component";
import ProfileIcon from "../icons/Profileicon.component";
import HolidazeTooltip from "../tooltip/HolidazeTooltip.component";

function VenueCard({
  venue,
  isLoading = false,
  className,
  profilePage = false,
  profileBookingPage = false,
  setVenueToUpdate,
  setVenueToDelete,
}: {
  venue?: Venue;
  isLoading?: boolean;
  className?: string;
  profilePage?: boolean;
  profileBookingPage?: boolean;
  setVenueToUpdate?: React.Dispatch<React.SetStateAction<Venue | undefined>>;
  setVenueToDelete?: React.Dispatch<React.SetStateAction<Venue | undefined>>;
}) {
  const refMenu = useRef<HTMLDivElement | null>(null);

  const [venueOptionsOpen, setVenueOptionsOpen] = useState(false);

  const closeOpenMenus = (e: MouseEvent) => {
    if (
      venueOptionsOpen &&
      refMenu.current &&
      !refMenu.current.contains(e.target as Node)
    ) {
      setVenueOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [open]);
  return (
    <article
      className={`${className} relative p-6 w-[90vw] lg:w-full xl:max-w-lg xl:mx-auto bg-white rounded-lg border border-gray-200 shadow-md`}
    >
      <HolidazeTooltip id="price-per-night" />
      <div className="flex justify-between items-center mb-5 text-gray-500">
        {isLoading || !venue ? (
          <Skeleton width={50} height={20} />
        ) : (
          <span
            data-tooltip-id="price-per-night"
            data-tooltip-content={`Price per night: $ ${venue.price}`}
            className="font-bold bg-green-200 text-green-600 text-xs inline-flex items-center px-2.5 py-1 rounded gap-2"
          >
            $ {venue.price}
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
      <H2 className="mb-2 text-xl tracking-tight text-gray-900  truncate text-ellipsis">
        {isLoading || !venue ? (
          <Skeleton width={200} height={20} />
        ) : (
          <span>{capitalizeFirstLetter(venue.name)}</span>
        )}
      </H2>
      <div className="mb-5 h-[calc(1rem*3)] font-light text-gray-500 line-clamp-3">
        {isLoading || !venue ? (
          <Skeleton width={300} height={20} />
        ) : (
          capitalizeFirstLetter(venue.description)
        )}
      </div>
      <div className="flex justify-between items-center flex-row-reverse">
        <Link
          to={`/venues/${venue?.id}`}
          className="flex gap-2 items-center font-medium text-primary hover:underline fe"
        >
          <p>See venue</p>
          <ArrowIcon />
        </Link>
        {profilePage && !profileBookingPage && (
          <div>
            <div
              className=" flex items-center text-primary cursor-pointer hover:underline underline-offset-2 transition-all gap-2 font-medium"
              onClick={() => setVenueOptionsOpen((prev) => !prev)}
            >
              <MoreIcon className="text-primary" /> <p>Options</p>
            </div>
            <AnimatePresence initial={false}>
              {venueOptionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  ref={refMenu}
                  className="absolute left-0 -bottom-14 shadow-md py-5 px-10 bg-white  rounded-b-lg border-b border-x border-gray-200 z-10"
                  onMouseLeave={() => setVenueOptionsOpen(false)}
                >
                  <ul className="flex flex-col gap-4">
                    <li
                      onClick={() =>
                        setVenueToUpdate ? setVenueToUpdate(venue) : {}
                      }
                      className="cursor-pointer flex gap-2 items-center hover:underline text-primary transition-all underline-offset-2 font-medium"
                    >
                      <EditIcon /> <p>Edit</p>
                    </li>
                    <li
                      className="cursor-pointer flex gap-2 items-center hover:underline text-primary transition-all underline-offset-2 font-medium"
                      onClick={() =>
                        setVenueToDelete ? setVenueToDelete(venue) : {}
                      }
                    >
                      <Crossicon />
                      <p>Delete</p>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        {!profilePage && !profileBookingPage && (
          <Link
            className="cursor-pointer hover:underline underline-offset-2 hover:text-primary group transition-all"
            to={`/profile/${venue?.owner.name}`}
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

              <span className="font-medium ">
                {isLoading || !venue ? (
                  <Skeleton width={100} height={20} />
                ) : (
                  capitalizeFirstLetter(venue.owner.name)
                )}
              </span>
            </div>
          </Link>
        )}
      </div>
    </article>
  );
}

export default VenueCard;
