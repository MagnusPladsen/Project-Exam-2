import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import LocationIcon from "../icons/LocationIcon";
import ProfileIcon from "../icons/Profileicon";

function VenueCard({
  venue,
  isLoading = false,
}: {
  venue?: Venue;
  isLoading?: boolean;
}) {
  return (
    <article className="p-6 w-[90vw] lg:w-full xl:max-w-lg xl:mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        {isLoading || !venue ? (
          <Skeleton width={50} height={20} />
        ) : (
          <span className="bg-primary-light text-primary text-xs font-medium inline-flex items-center px-2.5 py-1 rounded dark:bg-primary-light dark:text-primary gap-2">
            <LocationIcon /> {venue.location.country}
          </span>
        )}

        <span className="text-sm">
          <StarRatings
            rating={isLoading || !venue ? 5 : venue.rating}
            numberOfStars={5}
            starRatedColor={"gold"}
            starDimension={"20px"}
            starSpacing={"0px"}
          />
        </span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate text-ellipsis">
        {isLoading || !venue ? (
          <Skeleton width={200} height={20} />
        ) : (
          venue.name
        )}
      </h2>
      <p className="mb-5 h-[calc(1rem*3)] font-light text-gray-500 dark:text-gray-400 line-clamp-3">
        {isLoading || !venue ? (
          <Skeleton width={300} height={20} />
        ) : (
          venue.description
        )}
      </p>
      <div className="flex justify-between items-center">
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

            <span className="font-medium dark:text-white ">
              {isLoading || !venue ? (
                <Skeleton width={100} height={20} />
              ) : (
                venue.owner.name
              )}
            </span>
          </div>
        </Link>
        <Link
          to={`/venues/${venue?.id}`}
          className="inline-flex items-center font-medium text-primary hover:underline"
        >
          See venue
          <svg
            className="ml-2 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default VenueCard;
