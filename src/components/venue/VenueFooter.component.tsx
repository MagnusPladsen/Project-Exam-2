import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import capitalizeFirstLetter from "../../formatters/capitalizeFirstLetter";
import ArrowIcon from "../icons/ArrowIcon.component";
import ProfileIcon from "../icons/Profileicon.component";
import { Venue } from "../../types/types";

function VenueFooter({
  venue,
  isLoading,
}: {
  venue: Venue | undefined;
  isLoading: boolean;
}) {
  return venue ? (
    <div className="lg:p-0 px-[5vw] flex justify-between items-center">
      <Link
        to={`/venues`}
        className="inline-flex  gap-2 items-center font-medium text-primary hover:underline"
      >
        <motion.div style={{ rotate: -180 }}>
          <ArrowIcon />
        </motion.div>
        All venues
      </Link>
      <div className="flex">
        <p className="mr-2 hidden lg:block">Posted by:</p>

        <Link
          className=" group flex items-center space-x-2"
          to={`/profile/${venue?.owner.name}`}
        >
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

          <p className="font-medium dark:text-white transition-all cursor-pointer group-hover:underline underline-offset-2 group-hover:text-primary">
            {isLoading || !venue ? (
              <Skeleton width={100} height={20} />
            ) : (
              capitalizeFirstLetter(venue.owner.name)
            )}
          </p>
        </Link>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default VenueFooter;
